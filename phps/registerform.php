<?php

#main
if (isset($_POST['stage']) && ('process' == $_POST['stage'])) {
    process_form();
} else {
    print_form();
}

function print_form() {
	echo <<< END
	<h2>Login</h2>
    <form action="$_SERVER[PHP_SELF]" method="post">
    <p>
        Firstname:
        <br>
        <input type="text" name="firstname" size="30" pattern="^[A-Za-z]{2,15}" required="required"/>
    </p>
    <p>
        Lastname:
        <br>
        <input type="text" name="lastname" size="30" pattern="^[A-Za-z]{2,15}" required="required"/>
    </p>
    <p>
        Email:
        <br>
        <input type="text" name="email" size="30" pattern="^[A-Za-z0-9]{3,20}@truman\.edu$" required="required"/>
    </p>
    <p>
        Password:
        <br>
        <input type="password" name="password" size="30" pattern="^[A-Za-z0-9]{6,20}$" required="required"/>
    </p>
    <p>
        Re-type password:
        <br>
        <input type="password" name="repwd" size="30" pattern="^[A-Za-z0-9]{6,20}$" required="required"/>
    </p>
    <input type="hidden" name="stage" value="process">
    <input type="submit" value="Submit">
    <input type="reset" value="Clear">

    </form>
    <br>
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


    $firstname = $db->quote(htmlspecialchars($_POST['firstname']));
    $lastname = $db->quote(htmlspecialchars($_POST['lastname']));
    $email = $db->quote(htmlspecialchars($_POST['email']));
    $password = $db->quote(htmlspecialchars($_POST['password']));
    $repwd = $db->quote(htmlspecialchars($_POST['repwd']));

    session_start();
    if ($password == $repwd) {
        //getting data from database to check if email is already used for registration before
        $sql = "SELECT email FROM UserLogin WHERE email=$email";
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$result) { // if the data is not in database then continue to register
            $_SESSION['login'] = "";
            // Adding data into database
            $sql = "INSERT INTO UserLogin (firstname, lastname, email, password) VALUES ($firstname, $lastname, $email, $password)";
            $db->exec($sql);
            print "<p> Account registered! Please go login with your new account! </p>";
        } else { //Existing email
            $_SESSION['login'] = "";
            print "<p class=\"warning\"> Exist user with same email </p>";
            print_form();
        }
    } else { // Different password
        $_SESSION['login'] = "";
        print "<p class=\"warning\"> Different re-type password </p>";
        print_form();
    }
}

?>
