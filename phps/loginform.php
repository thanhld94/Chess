<?php

# main program

if (isset($_POST['stage']) && ('process' == $_POST['stage'])) {
    process_form();
} else {
    print_form();
}

function print_form() {
	echo <<<END
    <h2>Login</h2>
    <form action="$_SERVER[PHP_SELF]" method="post">
    <p>
    Email: <br>
    <input type="text" name="email" size="30" pattern="^[A-Za-z0-9]{3,20}@truman\.edu$" required="required"/>
    </p>
    <p>
    Password: <br>
    <input type="password" name="password" size="30" pattern="^[A-Za-z0-9]{6,20}$" required="required"/>
    </p>
    
    <input type="hidden" name="stage" value="process">
    <input type="submit" value="Submit">
    <input type="reset" value="Clear">
    </form>

    <h2>Registration</h2>
    <form action="http://sand.truman.edu/~dtl1325/Milestone4/register.php">
        <input type="submit" value="Register"/>
    </form>


END;
}

function process_form() {
    //connecting to database
	$db = new PDO("mysql:host=mysql.truman.edu;dbname=dtl1325CS315", "dtl1325", "***");
	if (!$db) {
	    print "Error - Could not connect to mysql";
	    exit;
	} else {
		//print "Connected to database! <br>";
	}

	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


	$email = $db->quote(htmlspecialchars($_POST['email']));
	$password = $db->quote(htmlspecialchars($_POST['password']));

    //getting data from database
	$sql = "SELECT firstname, lastname, email FROM UserLogin WHERE email=$email AND password=$password";
	$stmt = $db->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    session_start();
        
    if (!$result) {
        print "No user with email $email with that password found! <br>";
        $_SESSION['login'] = "";
        header ("Location: http://sand.truman.edu/~dtl1325/Milestone4/login.php");
    } else {
        print "<p> Welcome back {$result["firstname"]}! </p>";
        $_SESSION['login'] = "1";
    }
}



?>
