<!DOCTYPE html>
<html>

<head>
	<title>Truman Chess</title>
	<meta charset="utf-8"/>
	<link rel="stylesheet" type="text/css" href="css-hw2.css" title="default style">
	<style type="text/css"></style>
</head>

<body id="matchesPage">

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
	    	<h2>Database!</h2>
	    	<em>Coming soon to a location near you!</em>
	    	<p>
	    		This page will later contains a chess games that a player had played previously, famous chess games by grandmasters, etc.
	    	</p>

	    	<p>
	    		Upload chess games for sharing purposes. (File/game uploading coming soon!)
			</p>

            <h2>List of games</h2>
            <?php include_once("phps/redirectToLogin.php");?>
            <?php include_once("phps/getmatches.php");?>
	    	
	    </div>

	    
	</div>

</body>


</html>
