var sock = false;
var connectedBefore = false;
var animateNewMessages = false; 

$(document).ready(function() {
	window.onresize = function() {
		fitBottom();
	};
	connect();
});

function wut(e) {
	if ((e.which || e.keyCode) == 116) {
		$('<img src="img/troll.png" id="troll" style="position: fixed; z-index: 9999; bottom: -1024px; left: -1258px" />').appendTo('body');
		$('#troll').animate({bottom: '100px', left: '400px'}, 2000, function() {
			$('#troll').animate({bottom: '-400px', left: '3000px'}, 500, function() {
				$('#troll').remove();
			});
		});
		e.preventDefault();
	}
};
$(document).bind("keydown", wut);

function connect() {
	sock = new WebSocket('ws://ndirt.com:13337');
	
	sock.onopen = function() {
		$('#chatBox').html('');
		connectedBefore = true;
	};

	sock.onmessage = function( msg ) {
		handleMessage( msg );
	};

	sock.onclose = function() {
		if( !connectedBefore ) {
			$('#chatBox').html('<p class="error">Yhdistäminen palvelimeen epäonnistui, yritetään uudelleen...</p>');
		}
		else {
			$('#chatBox').html('<p class="error">Yhteys palvelimeen katkesi, yritetään yhdistää uudelleen...</p>');
		}
		setTimeout( function() {
			connect();
		}, 3000 );
	};

};

function handleMessage( msg ) {
	var data = JSON.parse( msg.data, null );
 
	if( data.Command ) {
		handleCommand( data );
		return;
	}
	
	// Remove deleted posts (= empty posts)
	if( data.Message.length <= 0 ) {
		var tgt = $('#chatBox').find("[data-id='" + data.Id + "']" );
		if( tgt ) {
			removeMessage( tgt );
		}
		return;
	}
	
	if( $('#chatBox p').length > 30 ) {
		removeMessage( $('#chatBox p').first() );
		animateNewMessages = true;
	}

	if( data.SenderClass == 2 ) {
		$('#chatBox').append( '<p class="modMessage" data-id="' +data.Id + '">'+data.Message+'</p>' );
	}
	else {
		$('#chatBox').append( '<p data-id="' +data.Id + '">'+data.Message+'</p>' );
	}

	if( animateNewMessages )
        {
          fitBottom();
        }
};

function handleCommand( cmd ) {
	if( cmd.Command === "motd" ) {
		$('#motd').html( $("<div/>").html(cmd.Data).text() );
	}
	else if( cmd.Command === "reload" ) {
		window.location = window.location;
	}
};

function fitBottom() {
	$('#chatBox').animate({scrollTop: $('#chatBox').prop('scrollHeight')}, 100);
};

function removeMessage( elm ) {
	elm.slideUp( 200, function() {
		elm.remove();
	});
}
