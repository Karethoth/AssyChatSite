<!doctype html>
<html>
<head>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script type="text/javascript" src="js/stream.js"></script>
<link rel="stylesheet" type="text/css" media="screen,projection" href="css/stream.css" />
</head>
<body>

<div id="infoBox">
	<object type="application/x-shockwave-flash" id="video"
			data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=assemblytv" bgcolor="#000000">
		<param name="allowFullScreen" value="true" />
		<param name="allowScriptAccess" value="always" />
		<param name="allowNetworking" value="all" />
		<param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" />
		<param name="flashvars" value="hostname=www.twitch.tv&channel=assemblytv&auto_play=true&start_volume=25" />
	</object>
	<div id="motd"></div>
</div>

<div id="chatBox"><p>Yhdistetään palvelimeen...</p></div>

</body>
</html>
