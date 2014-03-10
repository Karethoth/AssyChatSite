<html>
<head>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script type="text/javascript" src="js/mod.js"></script>
<link rel="stylesheet" type="text/css" media="screen,projection" href="css/mod.css" />
</head>
<body>
<div id="connectionInfo"><p>Yhdistetään palvelimeen...</p></div>

<div id="login">
	<form action="javascript:login();" id="loginForm">
	<fieldset>
		<input type="password" id="password"></input>
		<input type="submit" value="Kirjaudu" id="password"></input>
		<p id="loginInfo"></p>
	</fieldset>
	</form>
</div>

<div id="hiddenIfLoggedOut">
	<div id="logout">
		<a href="javascript:logout();">Kirjaudu ulos</a>
	</div>
	
	<div id="modBox">
		<h2>Viestien moderointi</h2>
	</div>
	
	<div id="motdBox">
		<h2>MOTD</h2>
		<div id="motdInputBar">
			<form action="javascript:sendMotd();" id="motdForm">
			<textarea id="motdInput"></textarea><br />
			<input type="submit" value="Päivitä MOTD" id="motdSendButton"></input>
			</form>
		</div>
		<div id="motdPreview"></div>
	</div>

	<div id="chatWindow">
		<h2>Live-CHAT</h2>
		<div id="chatBox"></div>
		<div id="inputBar">
			<form action="javascript:sendText();" id="inputForm">
			<input type="text" id="inputBox"></input>
			<input type="submit" value="send" id="sendButton"></input>
			</form>
		</div>
	</div>
	
	<div id="rawInput">
		<form action="javascript:sendRawInput();" id="rawForm">
			<input type="text" size="50" id="rawBox"></input>
			<input type="submit" value="send raw data" id="sendRawButton"></input>
		</form>
	</div>
</div>

</body>
</html>
