<!DOCTYPE html>
<html>

<head>
	<title>Truman Chess</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="css-hw2.css" title="default style">
	<link rel="stylesheet" type="text/css" href="css/board.css">
	<script type="text/javascript" src="js/board.js"></script>
	<script type="text/javascript" src="js/cEngine.js"></script>
</head>

<body id="playPage">

	<div id="wrapper">
		<div id="wrapperHeader">
			<div id="header">
				<img src="images/header.jpg" alt="logo">
			</div>
		</div>

		<div id="masthead">
	      <div id="navContainer">
	        <div id="navigation">
	          <ul>
	            <li id="homePageLink"><a href="index.html">Home</a></li>
	            <li id="playPageLink"><a href="play.php">Play</a></li>
	            <li id="learnPageLink"><a href="learn.html">Learn</a></li>
	            <li id="matchesPageLink"><a href="matches.php">Game database</a></li>
	            <li id="aboutPageLink"><a href="about.html">About</a></li>
	            <li id="logoutPageLink"><a href="logout.php">Logout</a></li>
	          </ul>
	        </div>
	      </div>
	    </div>


	    <div id="content">
	    	<h2>Play Online!</h2>
	    	<em>Coming soon to a location near you!</em>
	    	<p>
	    		This page will later contains a chess engine that allows players to play against each other.
			</p>

			<?php include_once("phps/redirectToLogin.php");?>
			<div id="chessBoard">
	    	</div>
	    	

			<p>
				Since the second half of the 20th century, computers have been programmed to play chess with increasing success, to the point where the strongest home computers play chess at a higher level than the best human players. Since the 1990s, computer analysis has contributed significantly to chess theory, particularly in the endgame. The computer Deep Blue was the first machine to overcome a reigning World Chess Champion in a match when it defeated Garry Kasparov in 1997. The rise of strong computer programs (known as "engines") which can be run on a hand-held device has led to increasing concerns about cheating during tournaments.
			</p>
	    	
	    </div>

	    
	</div>

</body>


</html>
