<?php

require_once 'components/header.php';
require_once 'components/connect.php';

session_start();

if (isset($_SESSION['user_id'])) {
   $user_id = $_SESSION['user_id'];
} else {
   $user_id = '';
}
;

require_once 'components/wishlist_cart.php';

?>

<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Agrifarm</title>
   <link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css" />
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
   <link rel="stylesheet" href="css/style.css">
</head>
<body>
   <?php require_once 'components/user_header.php'; ?>
   <div class="home-">
   <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                  <div class="carousel-item active">
                     <img src="images/caro1.png" class="d-block w-70 mx-auto" alt="main">
                  </div>
                  <div class="carousel-item">
                     <img src="images/caro2.png" class="d-block w-70 mx-auto" alt="secondary">
                  </div>
               </div>
               <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
               </button>
               <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
               </button>
          </div>
      <section class="category">
         <h1 class="heading">shop by category</h1>
         <div class="swiper category-slider swiper-no-swiping">
   <div class="swiper-wrapper">
      <a href="category.php?category=laptop" class="swiper-slide slide">
         <img src="images/utan.jpg" alt="">
         <h3 class="text-dark text-capitalize text-decoration-none">Veggies</h3>
      </a>
      <a href="category.php?category=tv" class="swiper-slide slide">
         <img src="images/lamas.jpg" alt="">
         <h3 class="text-dark text-capitalize text-decoration-none">Root crops</h3>
      </a>
      <a href="category.php?category=camera" class="swiper-slide slide">
         <img src="images/live.jpg" alt="">
         <h3 class="text-dark text-capitalize text-decoration-none">Live stock</h3>
      </a>
   </div>
</div>
      </section>
      <section class="home-products">
         <h1 class="heading">latest products</h1>
         <div class="swiper products-slider">
            <div class="swiper-wrapper">
               <?php
               $select_products = $conn->prepare("SELECT * FROM `products` LIMIT 6");
               $select_products->execute();
               if ($select_products->rowCount() > 0) {
                  while ($fetch_product = $select_products->fetch(PDO::FETCH_ASSOC)) {
                     ?>
                     <form action="" method="post" class="swiper-slide slide">
                        <input type="hidden" name="pid" value="<?= $fetch_product['id']; ?>">
                        <input type="hidden" name="name" value="<?= $fetch_product['name']; ?>">
                        <input type="hidden" name="price" value="<?= $fetch_product['price']; ?>">
                        <input type="hidden" name="image" value="<?= $fetch_product['image_01']; ?>">
                        <button class="bi bi-heart-fill" type="submit" name="add_to_wishlist"></button>
                        <a href="quick_view.php?pid=<?= $fetch_product['id']; ?>" class="bi bi-eye-fill"></a>
                        <img src="uploaded_img/<?= $fetch_product['image_01']; ?>" alt="">
                        <h3 class="text-dark name">
                           <?= $fetch_product['name']; ?>
                        </h3>
                        <div class="flex">
                           <h5 class="text-primary price"><span>₱</span>
                              <?= $fetch_product['price']; ?><span></span>
                           </h5>
                           <input type="number" name="qty" class="form-control" style="width: 60px;" min="1" max="99"
                              onkeypress="if(this.value.length == 2) return false;" value="1">
                        </div>
                        <button type="submit" class="btn btn-primary mt-3" name="add_to_cart">Add to Cart</button>
                     </form>
                     <?php
                  }
               } else {
                  echo '<p class="empty">no products added yet!</p>';
               }
               ?>

            </div>

            <div class="swiper-pagination"></div>

         </div>

      </section>

      <?php require_once 'components/footer.php'; ?>

      <script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>

      <script src="js/script.js"></script>

      <script>

         var swiper = new Swiper(".home-slider", {
            loop: true,
            spaceBetween: 20,
            pagination: {
               el: ".swiper-pagination",
               clickable: true,
            },
         });

         var swiper = new Swiper(".category-slider", {
            loop: true,
            spaceBetween: 20,
            pagination: {
               el: ".swiper-pagination",
               clickable: true,
            },
            breakpoints: {
               0: {
                  slidesPerView: 2,
               },
               650: {
                  slidesPerView: 3,
               },
               768: {
                  slidesPerView: 4,
               },
               1024: {
                  slidesPerView: 5,
               },
            },
         });

         var swiper = new Swiper(".products-slider", {
            loop: true,
            spaceBetween: 20,
            pagination: {
               el: ".swiper-pagination",
               clickable: true,
            },
            breakpoints: {
               550: {
                  slidesPerView: 2,
               },
               768: {
                  slidesPerView: 2,
               },
               1024: {
                  slidesPerView: 3,
               },
            },
         });

      </script>

</body>

</html>