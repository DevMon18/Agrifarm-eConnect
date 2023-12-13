<?php

require_once 'components/connect.php';

session_start();

if (isset($_SESSION['user_id'])) {
   $user_id = $_SESSION['user_id'];
} else {
   $user_id = '';
}
;
$response = [];

if (isset($_POST['submit'])) {

   $email = $_POST['email'];
   $email = filter_var($email, FILTER_SANITIZE_STRING);
   $pass = sha1($_POST['pass']);
   $pass = filter_var($pass, FILTER_SANITIZE_STRING);

   $select_user = $conn->prepare("SELECT * FROM `users` WHERE email = ? AND password = ?");
   $select_user->execute([$email, $pass]);
   $row = $select_user->fetch(PDO::FETCH_ASSOC);

   if ($select_user->rowCount() > 0) {
      $_SESSION['user_id'] = $row['id'];
      header('location:index.php');
   } else {
      $response = [
         'icon' => 'error',
         'title' => 'Oops...',
         'text' => 'Wrong Password!'
      ];
   }
}


$responseJSON = json_encode($response);

?>

<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>login</title>

   <!-- font awesome cdn link  -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">

   <!-- custom css file link  -->
   <link rel="stylesheet" href="css/style.css">

</head>

<body>

   <?php require_once 'components/user_header.php'; ?>

   <section class="form-container">

      <form action="" method="post">
         <h3>login now</h3>
         <input type="email" name="email" required placeholder="Email" maxlength="50" class="form-control"
            oninput="this.value = this.value.replace(/\s/g, '')">
         <input type="password" name="pass" required placeholder="Password" maxlength="20" class="form-control"
            oninput="this.value = this.value.replace(/\s/g, '')">
         <input type="submit" value="login now" class="btn" name="submit">
         <p>Don't have an account? <a href="user_register.php" class=""> Register now</a></p>
      </form>

   </section>
   <?php require_once 'components/footer.php'; ?>

   <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
   <script src="js/script.js"></script>
   <script>
      const response = <?php echo $responseJSON; ?>;

      const showAlert = (response) => {
         switch (response.icon) {
            case 'error':
               Swal.fire({
                  icon: response.icon,
                  title: response.title,
                  text: response.text
               }).then(() => {
                  window.location.href = 'user_login.php';
               });
               break;
            default:
               break;
         }
      };
      showAlert(response);
   </script>

</body>

</html>