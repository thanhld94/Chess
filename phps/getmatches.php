<?php
$folder = "matches/game*";
foreach(glob($folder) as $folder_name) {
    $name = basename($folder_name);
    print "<a href=\"matches/$name/$name.php\">$name</a><br>";
}
?>
