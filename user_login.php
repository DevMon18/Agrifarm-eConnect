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

      $responseJSON = json_encode($response);
   }
}



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
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

   <!-- custom css file link  -->
   <link rel="stylesheet" href="css/style.css">

</head>

<body>

   <?php require_once 'components/user_header.php'; ?>

   <div class="container mt-5 mb-5">
      <div class="row justify-content-center">
         <div class="col-md-4">
            <div class="card">
               <div class="card-body">
                  <div class="text-center mb-4">
                     <h3>Sign In</h3>
                  </div>
                  <form action="" method="post">
                     <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" name="email"
                           oninput="this.value = this.value.replace(/\s/g, '')" required>
                     </div>
                     <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" name="pass"
                           oninput="this.value = this.value.replace(/\s/g, '')" required>
                     </div>
                     <div class="d-grid gap-2">
                        <button type="submit" name="submit" class="btn btn-primary">Login</button>
                     </div>
                     <div class="text-center mt-3">
                        <h6>Don't have an account? <a class="text-decoration-none" href="user_register.php">Register now</a></h6>
                     </div>
               </div>
            </div>
            </form>
         </div>
      </div>
   </div>
   </div>
   <?php require_once 'components/footer.php'; ?>
   <?php require_once 'components/scripts.php'; ?>
   
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