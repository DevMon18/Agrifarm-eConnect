<?php 
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>login</title>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

</head>

<body>
   <div class="py-5">
      <div class="container mt-5 mb-5">
         <div class="row align-middle justify-content-center">
            <div class="col-md-4">
               <?php 
                  if(isset($_SESSION['status']))
                  {
                     ?>
                     <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <h5><?= $_SESSION['status']; ?></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                     </div>
                        <?php
                     unset($_SESSION['status']);
                  }
               ?>
               <div class="card">
                  <div class="card-body">
                     <div class="text-center mb-4">
                        <h3>Sign In</h3>
                     </div>
                     <form action="login.php" method="post">
                        <div class="mb-3">
                           <label for="exampleInputEmail1" class="form-label">Email address</label>
                           <input type="email" class="form-control" name="email" required>
                        </div>
                        <div class="mb-3">
                           <label for="exampleInputPassword1" class="form-label">Password</label>
                           <input type="password" class="form-control" name="password" required>
                        </div>
                        <div class="d-grid gap-2">
                           <button type="submit" name="login_btn" class="btn btn-primary">Login</button>
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
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>

</html>