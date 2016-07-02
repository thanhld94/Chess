<!DOCTYPE html>
<html>
<head>
	<title>Logout</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="css-hw2.css" title="default style">
</head>
<body id="logoutPage">

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
	            <li id="loginPageLink"><a href="login.php">Login</a></li>
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
	    	<?php 
	    		session_start();
	    		$_SESSION['login'] = "";
	    	?>
	    	<p>You are logged out! Comeback soon!</p>
	    </div>

	    
	</div>

</body>
</html>