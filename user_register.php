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
   $number = $_POST['number'];
   $number = filter_var($number, FILTER_SANITIZE_STRING);
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
            $insert_user->execute([$name, $email, $address, $number, $pass]);
   
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
         <div class="col-md-6">
            <div class="card">
               <div class="card-body">
                  <div class="text-center mb-4">
                     <h3>Sign In</h3>
                  </div>
                  <form action="" method="post">

                  <div class="row">
                     <div class="col">
                        <div class="mb-3">
                           <label for="exampleInputEmail1" class="form-label">Name</label>
                           <input type="text" class="form-control" name="name" placeholder="Name" class="form-control">
                        </div>
                     </div>
                        <div class="col">
                           <div class="mb-3">
                              <label for="exampleInputPassword1" class="form-label">Email</label>
                              <input type="email" class="form-control" name="email" placeholder="Email"  class="form-control" oninput="this.value = this.value.replace(/\s/g, '')" required>
                           </div>
                        </div>
                     </div>
                     <div class="row">
                     <div class="col">
                        <div class="mb-3">
                           <label for="exampleInputEmail1" class="form-label">Address</label>
                           <input type="text" class="form-control" name="address" placeholder="Address" class="form-control" required>
                        </div>
                     </div>
                        <div class="col">
                           <div class="mb-3">
                              <label for="exampleInputPassword1" class="form-label">Contact No</label>
                              <input type="number" name="number" placeholder="09*********" class="form-control" required>
                           </div>
                        </div>
                     </div>
                     <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Password</label>
                        <input type="password" name="pass" placeholder="Password" maxlength="20"  class="form-control" oninput="this.value = this.value.replace(/\s/g, '')" required>
                     </div>
                     <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Retype-password</label>
                        <input type="password" name="cpass" placeholder="Retype-password" maxlength="20"  class="form-control" oninput="this.value = this.value.replace(/\s/g, '')" required>
                     </div>
                     <div class="d-grid gap-2">
                        <button type="submit" name="submit" class="btn btn-primary">Register</button>
                     </div>
                     <div class="text-center mt-3">
                        <h6>Have an account? <a class="text-decoration-none" href="user_login.php">Login now</a></h6>
                     </div>
               </div>
            </div>
            </form>
         </div>
      </div>
   </div>
   </div>
<?php require_once 'components/footer.php'; ?>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
      crossorigin="anonymous"></script>
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