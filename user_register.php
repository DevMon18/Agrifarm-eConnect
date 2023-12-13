<?php

require_once 'components/connect.php';

session_start();

if(isset($_SESSION['user_id'])){
   $user_id = $_SESSION['user_id'];
}else{
   $user_id = '';
};

if(isset($_POST['submit'])){

   $name = $_POST['name'];
   $name = filter_var($name, FILTER_SANITIZE_STRING);
   $email = $_POST['email'];
   $email = filter_var($email, FILTER_SANITIZE_STRING);
   $address = $_POST['address'];
   $address = filter_var($address, FILTER_SANITIZE_STRING);
   $contact = $_POST['contact'];
   $contact = filter_var($contact, FILTER_SANITIZE_STRING);
   $pass = sha1($_POST['pass']);
   $pass = filter_var($pass, FILTER_SANITIZE_STRING);
   $cpass = sha1($_POST['cpass']);
   $cpass = filter_var($cpass, FILTER_SANITIZE_STRING);

   $select_user = $conn->prepare("SELECT * FROM `users` WHERE email = ?");
   $select_user->execute([$email,]);
   $row = $select_user->fetch(PDO::FETCH_ASSOC);

      if ($select_user->rowCount() > 0) {
         $response = [
            'icon' => 'error',
            'title' => 'Oops...',
            'text' => 'Email already exists!'
         ];
   } else {
         if ($pass != $cpass) {
            $response = [
               'icon' => 'error',
               'title' => 'Oops...',
               'text' => 'Passwords do not match!'
            ];
         } else {
            $insert_user = $conn->prepare("INSERT INTO `users`(name, email, address, contact, password) VALUES(?,?,?,?,?)");
            $insert_user->execute([$name, $email, $address, $contact, $pass]);
   
            $response = [
               'icon' => 'success',
               'title' => 'Success',
               'text' => 'User added successfully!',
               'redirect' => 'user_login.php'
            ];
         }
   }
   
   $responseJSON = json_encode($response);

}

?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>register</title>
   
   <!-- font awesome cdn link  -->
   
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">

   <!-- custom css file link  -->
   <link rel="stylesheet" href="css/style.css">

</head>
<body>
   
<?php require_once 'components/user_header.php'; ?>

<section class="form-container">

   <form action="" method="post">
      <h3>register now</h3>
      <input type="Fullname" name="name" placeholder="Name" class="form-control" required>
      <input type="email" name="email" placeholder="Email"  class="form-control" oninput="this.value = this.value.replace(/\s/g, '')" required>
      <input type="text" name="address" placeholder="Address" class="form-control" required>
      <input type="number" name="contact" placeholder="09*********" class="form-control" required>
      <input type="password" name="pass" placeholder="Password" maxlength="20"  class="form-control" oninput="this.value = this.value.replace(/\s/g, '')" required>
      <input type="password" name="cpass" placeholder="Retype-password" maxlength="20"  class="form-control" oninput="this.value = this.value.replace(/\s/g, '')" required>
      <input type="submit" value="register now" class="btn" name="submit">
      <a href="user_login.php" class="option-btn">login now</a>
      <p>already have an account?</p>
   </form>

</section>
<?php require_once 'components/footer.php'; ?>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="js/script.js"></script>
<script>
   const response = <?php echo $responseJSON; ?>;
   const showAlert = (response) => {
      switch (response.icon) {
         case 'success':
               Swal.fire({
                  icon: response.icon,
                  title: response.title,
                  text: response.text
               }).then(() => {
                  if (response.redirect) {
                     window.location.href = response.redirect;
                  }
               });
               break;
         case 'error':
               Swal.fire({
                  icon: response.icon,
                  title: response.title,
                  text: response.text
               });
               break;
         default:
               alert(response.text);
               break;
            }
         };
   showAlert(response);
</script>

</body>
</html>