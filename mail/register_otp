<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception; 

//Load Composer's autoloader
require 'vendor/autoload.php';

$developmentMode = false;
$mail = new PHPMailer($developmentMode);

$mail->IsSMTP();
$mail->Host = 'smtp.gmail.com';             // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                     // Enable SMTP authentication
$mail->Username = 'Test@gmail.com';         // SMTP username
$mail->Password = 'test1234';               // SMTP password
$mail->SMTPDebug = 1;
                                            // Enable TLS encryption, ssl also accepted
                                            //SENDING OTP CODE WITH THIS PRESET INFORMATION
$mail->SMTPSecure = 'tls';
$mail->Port = 587;                          // TCP port to connect t					
$mail->setFrom('Test@gmail.com', 'Agrifarm');
$mail->From = 'Test@gmail.com';
$mail->FromName = 'EVSU - AGRIFAMRM TEAM';
$mail->addAddress('Test@gmail.com');        // Add a recipient
$mail->AddCC($email, $user);

$mail->isHTML(true);                        // Set email format to HTML

$bodyContent = "<!DOCTYPE html>";
$bodyContent .= "<html>";
$bodyContent .= "<head>";
$bodyContent .= "<meta charset='utf-8'>";
$bodyContent .= "</head>";
$bodyContent .= "<body>";
$bodyContent .= "<br>";
$bodyContent .= "<p>Dear user,</p>";
$bodyContent .= "Enter this OTP Code to verify your account!!";
$bodyContent .= "<p>Your OTP is: <b>$otp</b></p>";
$bodyContent .= "<b>Do not share this OTP with anyone.</b>";
$bodyContent .='<p>Thanks,</p>';
$bodyContent .='<p>Agrifarm Team</p>';
$bodyContent .= "</body>";
$bodyContent .= "</html>";

$mail->Subject = "Account Verification - Agrifarm Team";
$mail->Body    = $bodyContent;
$mail->AltBody = "This is the plain text version of the email content";



if (!$mail->send()) {
	header('location: index.php');
}