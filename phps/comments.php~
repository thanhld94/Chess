<?php

#printing the form including a name field and a textarea field
function print_comment_form() {
echo <<<END
    <form action="$_SERVER[PHP_SELF]" method="post" id="commentform">
        Enter your name:
        <input type="text" name="name" size="12" pattern="^[A-Za-z 0-9]+$" required="required"/>
        <br>
        <textarea name="comment" rows="5" cols="30" form="commentform"></textarea>
        <br>
        <input type="hidden" name="stage" value="process">
        <input type="submit" value="Send">
        <input type="reset" value="Clear">
    </form>
    
END;
}

#append new comment to the comment file
function send_new_comment() {
    $name = $_POST['name'];
    $comment = htmlspecialchars($_POST['comment']);
    $new_comment = "<p><strong>$name</strong>: $comment</p>\n";
    file_put_contents("comments.txt", $new_comment, FILE_APPEND);
}

#printing all previous comments
function print_comments() {
    $lines = file("comments.txt");
    if (sizeof($lines) == 0)
        print "<em>No comment yet!</em>";
    foreach( $lines as $line ) {
        print "$line";
    }
}

#main program
print "<h2>Comments</h2>";
if (isset($_POST['stage']) && ('process' == $_POST['stage'])) 
    send_new_comment();

print_comments();
print_comment_form();

?>
