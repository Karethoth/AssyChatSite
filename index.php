<!doctype html>
<html>
<head>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script type="text/javascript" src="js/post.js"></script>
<link rel="stylesheet" type="text/css" media="screen,projection" href="css/post.css" />
</head>
<body>

<h1>Assychat!</h1>
<h2>Kirjoita viesti chattiin. Viestit ennakkomoderoidaan. Ehkä.</h2>
<form action="javascript:sendText();" id="inputForm" style="display: none;">
<fieldset>
	<input type="text" id="inputBox"></input>
	<input type="submit" value="Lähetä viesti" id="sendButton"></input>
	<p id="postInfo"></p>
</fieldset>
</form>

<div id="connectionInfo"><p>Yhdistetään palvelimeen...</p></div>

<p style="margin-top: 100px;">Vaatii tuoreen selaimen, joka tukee WebSocketteja.</p>
<p>Seuraa chattistriimiä <a href="http://ndirt.com/assychat/stream.php">täältä</a>.</p>

</body>
</html>
