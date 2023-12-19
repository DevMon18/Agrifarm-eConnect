<?php 
session_start();
?>
<!DOCTYPE html>

<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Register</title>
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>
<body>
   <div class="py-5">
      <div class="container mt-5 mb-5">
         <div class="row align-middle justify-content-center">
            <div class="col-md-6">
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
                        <h3>Register</h3>
                     </div>
                     <form action="register.php" method="post">

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
                           <input type="password" name="password" placeholder="Password" maxlength="20"  class="form-control" oninput="this.value = this.value.replace(/\s/g, '')" required>
                        </div>
                        <div class="d-grid gap-2">
                           <button type="submit" name="register_btn" class="btn btn-primary">Register</button>
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
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>