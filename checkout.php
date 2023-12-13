<?php

require_once 'components/connect.php';

session_start();


if (isset($_SESSION['user_id'])) {
   $user_id = $_SESSION['user_id'];
} else {
   $user_id = '';
   header('location:user_login.php');
}
;
// Fetch user information from the database based on $user_id
$select_user_info = $conn->prepare("SELECT * FROM `users` WHERE id = ?");
$select_user_info->execute([$user_id]);

if ($select_user_info->rowCount() > 0) {
   $user_data = $select_user_info->fetch(PDO::FETCH_ASSOC);
   // Assign user data to variables
   $name = $user_data['name'];
   $email = $user_data['email'];
   $contact = $user_data['contact'];
   $address = $user_data['address'];
} else {
   // Set default values if user information is not found
   $name = '';
   $email = '';
   $contact = '';
   $address = '';
}

if (isset($_POST['order'])) {

   $name = $_POST['name'];
   $email = $_POST['email'];
   $address = $_POST['address'];
   $contact = $_POST['contact'];
   $total_products = $_POST['total_products'];
   $total_price = $_POST['total_price'];

   $check_cart = $conn->prepare("SELECT * FROM `cart` WHERE user_id = ?");
   $check_cart->execute([$user_id]);

   if ($check_cart->rowCount() > 0) {

      $insert_order = $conn->prepare("INSERT INTO `orders`(id, name, number, email, method, address, total_products, total_price) VALUES(?,?,?,?,?,?,?,?)");
      $insert_order->execute([$user_id, $name, $number, $email, $method, $address, $total_products, $total_price]);

      $delete_cart = $conn->prepare("DELETE FROM `cart` WHERE user_id = ?");
      $delete_cart->execute([$user_id]);

      $message[] = 'order placed successfully!';
   } else {
      $message[] = 'your cart is empty';
   }

}


?>

<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>checkout</title>

   <!-- font awesome cdn link  -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">

   <!-- custom css file link  -->
   <link rel="stylesheet" href="css/style.css">

</head>

<body>

   <?php require_once 'components/user_header.php'; ?>

   <section class="checkout-orders">

      <form action="" method="POST">

         <h3>your orders</h3>

         <div class="display-orders">
            <?php
            $grand_total = 0;
            $cart_items[] = '';
            $select_cart = $conn->prepare("SELECT * FROM `cart` WHERE user_id = ?");
            $select_cart->execute([$user_id]);
            if ($select_cart->rowCount() > 0) {
               while ($fetch_cart = $select_cart->fetch(PDO::FETCH_ASSOC)) {
                  $cart_items[] = $fetch_cart['name'] . ' (' . $fetch_cart['price'] . ' x ' . $fetch_cart['quantity'] . ') - ';
                  $total_products = implode($cart_items);
                  $grand_total += ($fetch_cart['price'] * $fetch_cart['quantity']);
                  ?>
                  <p>
                     <?= $fetch_cart['name']; ?> <span>(
                        <?= '₱' . $fetch_cart['price'] . '/- x ' . $fetch_cart['quantity']; ?>)
                     </span>
                  </p>
                  <?php
               }
            } else {
               echo '<p class="empty">your cart is empty!</p>';
            }
            ?>
            <input type="hidden" name="total_products" value="<?= $total_products; ?>">
            <input type="hidden" name="total_price" value="<?= $grand_total; ?>" value="">
            <div class="grand-total">grand total : <span>₱
                  <?= $grand_total; ?>/-
               </span></div>
         </div>

         <h3>place your orders</h3>


         <div class="flex">
            <div class="inputBox">
               <span>Full Name</span>
               <input type="text" name="name" value="<?= isset($name) ? htmlspecialchars($name) : ''; ?>" class="form-chk" required>
            </div>
            <div class="inputBox">
               <span>Contact No.</span>
               <input type="number" name="number" value="<?= isset($contact) ? htmlspecialchars($contact) : ''; ?>" class="form-chk" required>
            </div>
            <div class="inputBox">
               <span>Email</span>
               <input type="email" name="email" value="<?= isset($email) ? htmlspecialchars($email) : ''; ?>" class="form-chk" required>
            </div>
            <div class="inputBox">
               <span>Payment method</span>
               <select name="method" class="form-chk" required>
                  <option value="cash on delivery">cash on delivery</option>
                  <option value="credit card">credit card</option>
                  <option value="paytm">paytm</option>
                  <option value="paypal">paypal</option>
               </select>
            </div>
            <div class="inputBox">
               <span>Address</span>
               <input type="text" name="flat" value="<?= isset($address) ? htmlspecialchars($address) : ''; ?>" class="form-chk" maxlength="50"
                  required>
            </div>
         </div>

         <input type="submit" name="order" class="btn <?= ($grand_total > 1) ? '' : 'disabled'; ?>" value="place order">

      </form>

   </section>













   <?php require_once 'components/footer.php'; ?>

   <script src="js/script.js"></script>

</body>

</html>