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

if (isset($_POST['send'])) {

   $name = $_POST['name'];
   $name = filter_var($name, FILTER_SANITIZE_STRING);
   $email = $_POST['email'];
   $email = filter_var($email, FILTER_SANITIZE_STRING);
   $number = $_POST['number'];
   $number = filter_var($number, FILTER_SANITIZE_STRING);
   $msg = $_POST['msg'];
   $msg = filter_var($msg, FILTER_SANITIZE_STRING);

   $select_message = $conn->prepare("SELECT * FROM `messages` WHERE name = ? AND email = ? AND number = ? AND message = ?");
   $select_message->execute([$name, $email, $number, $msg]);

   if ($select_message->rowCount() > 0) {
      $response = [
         'icon' => 'error',
         'title' => 'Oops...',
         'text' => 'Already Send The Message!'
      ];
   } else {

      $insert_message = $conn->prepare("INSERT INTO `messages`(user_id, name, email, number, message) VALUES(?,?,?,?,?)");
      $insert_message->execute([$user_id, $name, $email, $number, $msg]);

      $response = [
         'icon' => 'success',
         'title' => 'Yay!',
         'text' => 'Message Send Successfully'
      ];
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
   <title>contact</title>

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
                     <h3>Message</h3>
                  </div>
                  <form action="" method="post">
                     <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input name="name" type="text" class="form-control">
                     </div>
                     <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input name="email" type="email" class="form-control">
                     </div>
                     <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Contact No</label>
                        <input name="number" type="number" class="form-control">
                     </div>
                     <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Message</label>
                        <input type="text" name="msg" class="form-control">
                     </div>
                     <div class="d-grid gap-2">
                        <button type="submit" name="send" class="btn btn-primary">Login</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
   <?php require_once 'components/footer.php'; ?>
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
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