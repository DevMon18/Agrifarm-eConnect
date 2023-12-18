<?php

require_once '../components/connect.php';

session_start();

$admin_id = $_SESSION['admin_id'];

if (!isset($admin_id)) {
    header('location:admin_login.php');
}

if (isset($_GET['delete'])) {
    $delete_id = $_GET['delete'];
    $delete_admins = $conn->prepare("DELETE FROM `admins` WHERE id = ?");
    $delete_admins->execute([$delete_id]);
    header('location:admin_accounts1.php');
}

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $name = filter_var($name, FILTER_SANITIZE_STRING);
    $pass = sha1($_POST['pass']);
    $pass = filter_var($pass, FILTER_SANITIZE_STRING);
    $cpass = sha1($_POST['cpass']);
    $cpass = filter_var($cpass, FILTER_SANITIZE_STRING);

    $select_admin = $conn->prepare("SELECT * FROM `admins` WHERE name = ?");
    $select_admin->execute([$name]);

    if ($select_admin->rowCount() > 0) {
        $response = [
            'icon' => 'error',
            'title' => 'error',
            'text' => 'Username Already Exist!',
        ];
    } else {
        if ($pass != $cpass) {
            $response = [
                'icon' => 'error',
                'title' => 'error',
                'text' => 'Password not matched!',
            ];
        } else {
            $insert_admin = $conn->prepare("INSERT INTO `admins`(name, password) VALUES(?,?)");
            $insert_admin->execute([$name, $cpass]);
            $response = [
                'icon' => 'success',
                'title' => 'Success',
                'text' => 'New Admin Registered!',
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Accounts</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../css/index.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <body class="hold-transition layout-fixed layout-navbar-fixed layout-footer-fixed antialiased">
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h3>Admin Accounts</h3>
            </div>
        </div>
    </div>
</section>

<section class="accounts">
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12 d-flex align-items-stretch flex-column">
            <div class="card shadow rounded-lg">
                <div class="card-body">
                    <form action="" method="post" autocomplete="off">
                        <!-- Username input -->
                        <div class="mb-2">
                            <label class="h6" for="username">Username</label>
                            <input type="text" class="form-control" name="name" id="username">
                        </div>
                        <!-- Password input -->
                        <div class="mb-2">
                            <label class="h6" for="password">Password</label>
                            <input type="password" class="form-control" name="pass" id="password">
                        </div>
                        <!-- Re-enter Password input -->
                        <div class="mb-2">
                            <label class="h6" for="password">Re-enter Password</label>
                            <input type="password" class="form-control" name="cpass" id="password">
                        </div>
                        <!-- Login button -->
                        <div class="text-center mt-4 mb-2 h6">
                            <button type="submit" name="submit" class="btn btn-block btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

        <div class="container-fluid">
            <div class="row ">
            <?php
                $select_accounts = $conn->prepare("SELECT * FROM `admins`");
                $select_accounts->execute();
                if ($select_accounts->rowCount() > 0) {
                    while ($fetch_accounts = $select_accounts->fetch(PDO::FETCH_ASSOC)) {
                ?>
                    <div class="col-md-3 d-flex align-items-stretch flex-column">
                        <div class="card-body card shadow rounded-lg">
                            <h6 class="mb-3 name">Admin ID: <?= $fetch_accounts['id']; ?></h6>
                                <h6 class="text-primary price">Name: <span><?= $fetch_accounts['name']; ?></span></h6>
                                <!-- Update button -->
                                <div class="text-center mt-2 mb-2">
                                    <a href="admin_accounts1.php?delete=<?= $fetch_accounts['id']; ?>" onclick="return confirm('delete this account?')" class="btn btn-block btn-danger">Delete</a>
                                    <?php
                                        if ($fetch_accounts['id'] == $admin_id) {
                                            echo '<a href="update_profile.php" class="btn btn-block btn-primary">update</a>';
                                        }
                                    ?>
                                </div>
                            </div>
                        </div>
                    <?php
                    }
                } else {
                echo '<p class="text-center">No Accounts Available</p>';
                    }
                ?>
            </div>
        </div>
    </section>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../js/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.slim.min.js"></script>
    <script src="https://code.jquery.com/jquery-migrate-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bs-custom-file-input/dist/bs-custom-file-input.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js" integrity="sha384-+sLIOodYLS7CIrQpBjl+C7nPvqq+FbNUBDunl/OZv93DB7Ln/533i8e/mZXLi/P+" crossorigin="anonymous"></script>
    <script src="../js/index.js"></script>
    <script src="../js/admin_script.js"></script>
    <script src="../js/carousel.js"></script>
    <script src="../js/input.js"></script>
    <script src="../js/image.js"></script>
    <script src="../js/app.min.js"></script>
    <script src="../js/admin_script.js"></script>
    <script>
        const response = <?php echo $responseJSON; ?>;
        const showAlert = (response) => {
            switch (response.icon) {
                case 'success':
                    Swal.fire({
                        icon: response.icon,
                        title: response.title,
                        text: response.text
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