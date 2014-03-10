// Viestinlähetyssivu
function sendText() {
	sock.send( "MSG:"+$('#inputBox').val()+"\n" );
	$('#inputBox').val("");
};

var sock = false;
var connectedBefore = false;

$(document).ready(function() {
	connect();
});

function connect() {
	sock = new WebSocket('ws://ndirt.com:13337');
	
	sock.onopen = function() {
		$('#connectionInfo').html('');
		$('#inputForm').show();
		connectedBefore = true;
	};

	sock.onmessage = function( msg ) {
		var data = JSON.parse( msg.data, null );

		if( data.Command ) {
			handleCommand( data );
		}
	};

	sock.onclose = function() {
		if( !connectedBefore ) {
			$('#connectionInfo').html('<p class="error">Yhdistäminen palvelimeen epäonnistui, yritetään uudelleen...</p>');
		}
		else {
			$('#inputForm').hide();
			$('#connectionInfo').html('<p class="error">Yhteys palvelimeen katkesi, yritetään yhdistää uudelleen...</p>');
		}
		setTimeout( function() {
			connect();
		}, 3000 );
	};

};

function countdown() {
	var currentValue = $('#countdown').html();
	var timeout = setTimeout(function(){
		var newValue = currentValue - 1;
		$('#countdown').html( newValue );
		if( newValue == 0 ) {
			clearTimeout(timeout);
			return;
		}
		countdown();
	}, 1000);
}

function handleCommand( cmd ) {
	if( cmd.Command === "wait" ) {
		$('#inputBox').prop('disabled', true);
		$('#sendButton').prop('disabled', true);
		$('#postInfo').html('Viesti lähetetty. Odota <span id="countdown">'+ cmd.Data +'</span> sekuntia ennen seuraavan lähettämistä.');
		countdown();
		setTimeout( function() {
			$('#postInfo').html('');
			$('#inputBox').prop('disabled', false);
			$('#sendButton').prop('disabled', false);
		}, cmd.Data * 1000 );
	}
	else if( cmd.Command === 'error' ) {
		if( cmd.Data == 'notAllowed' ) {
			$('#postInfo').html('Et voi lähettää viestejä tähän chattiin. Pahoittelemme.');
		}
		else if( cmd.Data == 'tooLong' ) {
			$('#postInfo').html('Viestisi on liian pitkä (tai liian lyhyt)!');
		}
		else if( cmd.Data == 'tooFast' ) {
			$('#postInfo').html('Sinun täytyy odottaa vielä hetki, ennen kuin voit lähettää uuden viestin');
		}
		
		setTimeout( function() {
			$('#postInfo').html('');
		}, 3000 );
	}
	else if( cmd.Command === "reload" ) {
		window.location = window.location;
	}
};