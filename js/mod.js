var sock = false;
var connectedBefore = false;
var loggedIn = false;

$(document).ready(function() {
	connect();
	$('#password').focus();
});

function connect() {
	sock = new WebSocket('ws://ndirt.com:13337');
	
	sock.onopen = function() {
		$('#chatBox').html('');
		$('#connectionInfo').html('Yhteys muodostettu');
		connectedBefore = true;
	};

	sock.onmessage = function( msg ) {
		handleMessage( msg );
	};

	sock.onclose = function() {
		if( !connectedBefore ) {
			$('#connectionInfo').html('Yhdistäminen palvelimeen epäonnistui, yritetään uudelleen...');
		}
		else {
			$('#connectionInfo').html('Yhteys palvelimeen katkesi, yritetään yhdistää uudelleen...');
			setTimeout( function() { reloadPage(); }, 2000 );
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
	
	if( data.AcceptionTime != 0 ) {
		var tgtElm = '#chatBox';
		removeMessage( data.Id, '#modBox' );
	}
	else {
		var tgtElm = '#modBox';
	}
	
	// Remove deleted posts (= empty posts)
	if( data.Message.length <= 0 ) {
		removeMessage( data.Id, '#modBox' );
		removeMessage( data.Id, '#chatBox' );
		return;
	}
	
	if( data.AcceptionTime == 0 ) {
		data.Message = addButtons( data, 'check' );
	}
	else {
		data.Message = addButtons( data, 'delete' );
	}
	
	if( $(tgtElm + ' p').length > 100 ) {
		removeMessage( $(tgtElm + ' p').first().data('id') );
	}

	if( data.SenderClass == 2 ) {
		$(tgtElm).append( '<p class="modMessage" data-id="' + data.Id + '">' + data.Message + ' (ID: ' + data.Id + ')</p>' );
	}
	else {
		$(tgtElm).append( '<p data-id="' + data.Id + '">' + data.Message + ' (ID: ' + data.Id + ')</p>' );
	}
};

function handleCommand( cmd ) {
	if( cmd.Command === "reload" ) {
		reloadPage();
	}
	else if( cmd.Command === "motd" ) {
		$('#motdPreview').html( $("<div/>").html(cmd.Data).text() );
		
		var motdVal = $('#motdPreview').html().replace(/\<br\>/g,"\n");
		motdVal = motdVal.substring(0, motdVal.length - 1);
		$('#motdInput').val(motdVal);
	}
	else if( cmd.Command === 'info' ) {
		if( cmd.Data === 'bufferSent' ) {
			fitBottom();
		}
	}
	else if( cmd.Command === 'mod' ) {
		if( cmd.Data === 'true' ) {
			loggedIn = true;
			$('#loginInfo').html('Kirjautuminen onnistui');
			$('#login').remove();
			$('#hiddenIfLoggedOut').show(function() {
				fitBottom();
			});
		}
		else {
			$('#password').val('');
			$('#loginInfo').html('Väärä salasana!');
			$('#loginInfo').show();
			setTimeout(function() {
				$('#loginInfo').fadeOut(100, function() {
					$('#loginInfo').html('');
				});
			}, 2000);
			
		}
	}
};

function fitBottom() {
	$('#chatWindow').animate({scrollTop: $('#chatWindow').prop('scrollHeight')}, 100);
};

function addButtons( data, type ) {
	if( type == 'check' ) {
		data.Message = '<a href="javascript:acceptMessage(\'' + data.Id + '\')">[+]</a>' +
					' <a href="javascript:deleteMessage(\'' + data.Id + '\')">[-]</a> ' +
					data.Message;
	}
	else {
		data.Message += ' <a href="javascript:deleteMessage(\'' + data.Id + '\')">[X]</a>';
	}
	return data.Message;
};

function sendText() {
	sock.send( "MSG:"+$('#inputBox').val()+"\n" );
	$('#inputBox').val("");
};

function sendMotd() {
	sock.send( "motd:"+$('#motdInput').val().replace(/\r/g,'').replace(/\n/g,"<br />") + "\n" );
};

function sendRaw( data ) {
	sock.send( data + "\n" );
};

function login() {
	sendRaw( 'login:' + $('#password').val() );
}

function logout() {
	reloadPage();
}

function sendRawInput() {
	sendRaw( $('#rawBox').val() );
};

function acceptMessage( id ) {
	sendRaw( 'accept:'+id );
	removeMessage( id, '#modBox' );
};

function deleteMessage( id ) {
	sendRaw( 'delete:' + id );
	removeMessage( id, '#chatBox' );
	removeMessage( id, '#modBox' );
};

function reloadPage() {
	window.location = window.location;
}

// Yhteiset

function removeMessage( id, boxId ) {
	if( typeof boxId === 'undefined' ) {
		boxId = '#chatBox';
	}
	
	var message = $(boxId).find("[data-id='" + id + "']" );
	message.slideUp( 200, function() {
		message.remove();
	});
}