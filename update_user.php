<?php

require_once 'components/connect.php';

session_start();

if (isset($_SESSION['user_id'])) {
   $user_id = $_SESSION['user_id'];
} else {
   $user_id = '';
}
;

if (isset($_POST['submit'])) {

   $name = $_POST['name'];
   $name = filter_var($name, FILTER_SANITIZE_STRING);
   $email = $_POST['email'];
   $email = filter_var($email, FILTER_SANITIZE_STRING);

   $update_profile = $conn->prepare("UPDATE `users` SET name = ?, email = ? WHERE id = ?");
   $update_profile->execute([$name, $email, $user_id]);

   $empty_pass = 'da39a3ee5e6b4b0d3255bfef95601890afd80709';
   $prev_pass = $_POST['prev_pass'];
   $old_pass = sha1($_POST['old_pass']);
   $old_pass = filter_var($old_pass, FILTER_SANITIZE_STRING);
   $new_pass = sha1($_POST['new_pass']);
   $new_pass = filter_var($new_pass, FILTER_SANITIZE_STRING);
   $cpass = sha1($_POST['cpass']);
   $cpass = filter_var($cpass, FILTER_SANITIZE_STRING);

   if ($old_pass == $empty_pass) {
      $message[] = 'please enter old password!';
   } elseif ($old_pass != $prev_pass) {
      $message[] = 'old password not matched!';
   } elseif ($new_pass != $cpass) {
      $message[] = 'confirm password not matched!';
   } else {
      if ($new_pass != $empty_pass) {
         $update_admin_pass = $conn->prepare("UPDATE `users` SET password = ? WHERE id = ?");
         $update_admin_pass->execute([$cpass, $user_id]);
         $message[] = 'password updated successfully!';
      } else {
         $message[] = 'please enter a new password!';
      }
   }

}

?>

<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>register</title>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

   <!-- custom css file link  -->
   <link rel="stylesheet" href="css/style.css">
</head>

<body>

   <?php require_once 'components/user_header.php'; ?>

   <section class="form-container">

      <form action="" method="post">
         <h3>update now</h3>
         <div class="mb-3">
               <input type="hidden" name="prev_pass" value="<?= $fetch_profile["password"]; ?>">
            </div>
            <div class="mb-3">
               <input type="text" name="name" required placeholder="Enter your username" maxlength="20" class="form-control"
                  value="<?= $fetch_profile["name"]; ?>">
            </div>
            <div class="mb-3">
               <input type="email" name="email" required placeholder="Enter your email" maxlength="50" class="form-control"
                  oninput="this.value = this.value.replace(/\s/g, '')" value="<?= $fetch_profile["email"]; ?>">
            </div>
            <div class="mb-3">
               <input type="password" name="old_pass" placeholder="Enter your old password" maxlength="20" class="form-control"
                  oninput="this.value = this.value.replace(/\s/g, '')">
            </div>
            <div class="mb-3">
               <input type="password" name="new_pass" placeholder="Enter your new password" maxlength="20" class="form-control"
                  oninput="this.value = this.value.replace(/\s/g, '')">
            </div>
            <div class="mb-3">
               <input type="password" name="cpass" placeholder="Confirm your new password" maxlength="20" class="form-control"
                  oninput="this.value = this.value.replace(/\s/g, '')">
            </div>
            <div class="mb-3">
               <input type="submit" value="Update now" class="btn btn-primary" name="submit">
            </div>
      </form>

   </section>
   <?php require_once 'components/footer.php'; ?>

   <script src="js/script.js"></script>

</body>

</html>