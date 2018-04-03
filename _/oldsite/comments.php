<?php
// get posted data into local variables
$EmailFrom ="info@bhcapitalgroup.com";
$EmailTo = "info@bhcapitalgroup.com";
$Subject = "Comments / message";

//Customer Information

$comments  = Trim(stripslashes($_POST['comments'])); 


 

$Body = "Comments / message \n";
$Body .= "==================\n\n\n";
$Body .= "Comments: ";
$Body .=  $comments ;
$Body .= "\n\n";
$Body .= "=======x=====x======x=======";

// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=thankyou.html\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.html\">";
}
?>