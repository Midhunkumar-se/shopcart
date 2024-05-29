<br />
<p align="center"><img src="src/assets/logo/pngegg.png" width='100px'></p>
  <h1 align="center">Shopcart</h1>
  <h3 align="center">Shop smart, shop easy, shop now.</h3>


  <p align="center">
    <a href="https://shopcart-midhun.vercel.app/" target="_blank">View Demo</a>
  </p>
</p>

<p align="center">Shopcart is an easy-to-use ecommerce platform where you can browse products, add items to your cart, and view detailed product information. You can also leave reviews to help others make informed purchasing decisions. As an admin, you have the ability to create, edit, and delete items, as well as you can see progress of orders shipment as user and manipulate it as admin.</p>

## ✨ Features

- <b>View products:</b> Users can browse all products available on the website.
- <b>Filter products:</b> Users can filter products by brand, category, price range, and sorting options.
- <b>Search for products:</b> Users can search for specific products by name.
- <b>View cart items:</b> Users can view the items they have added to their cart.
- <b>Checkout:</b> Users can proceed to checkout and add their payment method.
- <b>View orders:</b> After completing checkout, users can view their orders and order details.
- <b>Review products:</b> Users can leave reviews for products they have purchased.
- <b>Add products:</b> Admins can add new products to the website.
- <b>Edit products:</b> Admins can edit existing product details.
- <b>Delete products:</b> Admins can delete products from the website.
- <b>View orders:</b> Admins can view all orders that have been placed on the website.
- <b>Manipulate order progress:</b> Admins can update the status of orders and track their progress.
- <b>View order progress chart:</b> Admin can view a chart showing the progress of their order from processing to delivery.
- <b>Account management:</b> Admin can see their earings and view their order history.

## Tech Stack

| Stack    | -                                                                                                                                                                                 | -                                                                                                                                                                           | -                                                                                                | -                                                                                                                | -                                                                                                   |
| -------- | --------------------------------------------------------------------------------------------------                                                                                | -------------------------------------------------------------------------------------------------                                                                           | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| FrontEnd | <p align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" width="100" height="100"> <br />Javascript</p>  | <p align="center"><img src="https://tse3.mm.bing.net/th?id=OIP.J0JE-fKbFT4bxpp8ilPpEQHaHa&pid=Api&P=0" width="100" height="100"> <br />React Js</p>  | <p align="center"><img src="https://tse4.mm.bing.net/th?id=OIP.9U1toerFxB8aiFRreLxEUQHaHa&pid=Api&P=0" width="100" height="100"> <br />Sass</p>   | <p align="center"><img src="https://reactrouter.com/_brand/react-router-stacked-color.png" width="100" height="100"> <br />React Router</p>              | <p align="center"><img src="https://www.chartjs.org/docs/latest/favicon.ico" width="100" height="100"> <br />Chart.Js</p>
| BackEnd  | <p align="center"><img src="https://tse1.explicit.bing.net/th?id=OIP.HdzDRa1T389o2JpxaPJ6LAHaFj&pid=Api&P=0" width="110" height="100"> <br />Firebase</p>     | <p align="center"><img src="https://tse3.mm.bing.net/th?id=OIP.WJJvF32dGqu3VX7EdPo3vQHaFj&pid=Api&P=0" width="110" height="100"> <br />Cloud Firestore</p> | <p align="center"><img src="https://s3.amazonaws.com/cdn.hotglue.xyz/images/logos/firebase-auth.png" width="140" height="100"> <br />Firebase Authentication</p> | <p align="center"><img src="https://tse2.explicit.bing.net/th?id=OIP.c2DYch8OspsEAxoVViXuKwAAAA&pid=Api&P=0" width="100" height="100"> <br />Firebase Cloud Storage</p>               | <p align="center"><img src="https://tse3.mm.bing.net/th?id=OIP.ypz_d6GL7n2nXfQnbw_ARAHaFj&pid=Api&P=0" width="150" height="100"> <br />Vercel</p> |


## :rocket: Quick start

### Installation
 <i>General requirement</i> - <br/>
  In order for those projects to work, you'll need to have: <br/>
  <ul>
  <li>
    An IDE of your choice, but I'd really recommand Visual Studio code. If you do not own it yet, take a look
    <a href="https://code.visualstudio.com/"> here </a>.
  </li>
  </ul>

### Step 1: Clone the repo
- Either clone the repo or download the app and open the folder in the cli
- To clone the repo locally by doing -
```sh
git clone https://github.com/Midhunkumar-se/shopcart.git
```

### Step 2: Install dependencies
  - Install all dependencies using the `npm install` command
  - To do so, open your IDE, select the persistence Project and open the terminal, type `npm install` 

### Step 3: Setup firebase
- Go to firebase app, create a Firebase project and register your app
- Install the SDK and initialize Firebase, take a look at the documentation <a href="https://firebase.google.com/docs/web/setup"> here </a>.
- Don't use my `firebase.js` file, which is inside `src` folder, because my firebase configuration is different from yours, please read the documentation mentioned in 2nd point.
- Start the web server using the `npm start` command. The app will be served at http://localhost:3000/

#### And you are good to go



# Application presentation and flow:

## I - Home Page
When you visit the Shopcart application, the first page you will directed to the home page of the application.
<img src="readme-images/2-home/1-home.png">

- If you do not have an account, you will have access to the following pages:
   * Home page
   * Cart page
   * Account menu (with login and register page links)
   * Login page
   * Register page
   * Reset password page."
- On the home page header, you can see the app logo on the left side and three menus on the far right side - <b>home</b>,<b>cart </b>, and <b>account</b>.
- If you have an account and logged in to that account, the <b>myOrders</b> option will be displayed and in the account menu <b>login</b> and <b>register</b> will be replaced with <b>resetPassword</b> and <b>logout</b> options, which you will see later in this documentation.
-Below the menu header, there is a wide banner with text and an image. Below the banner, you will see a list of products. On the left side of the products, you will see filters, and at the top of the list of products, you will see a search input box.

### Filters
- On the left side of the list of products, you will find filters located below the banner image.
- When you click the 'Categories' button, you will see a list of categories. After selecting a category, you will be shown a corresponding list of products.
  <img src="readme-images/2-home/2-home-categories.png" height=60%>

- Below the 'Categories' button, you will find the 'Brand' button, which filters the product list by the specific brand that you select.
  <img src="readme-images/2-home/3-home-brand.png" height=60%>
  
- Below the 'Brand' button, you will find the 'price' range, which filters the product list by the price that you select.
  <img src="readme-images/2-home/4-home-price.png" height=60%>
  
- Below the 'Price' range, you will find the 'sort' button, which filters the product list by the specific sort method that you select.
  <img src="readme-images/2-home/5-home-sort.png" height=60%>
  
- Below the 'sort' button, you will find the 'clear filter' button, which resets all the filter options
  <img src="readme-images/2-home/6-home-clearFilter.png" height=60%>
  
- At the top of the product list, there is a search box where you can search for products by typing their name.
  <img src="readme-images/2-home/7-home-search.png" height=60%>
  
- When you click on the product image listed on the <b>home page</b>, you will be redirected to the corresponding <b>product details page</b>.
  <img src="readme-images/2-home/8-home-click-product-image.png" height=60%>

## II - Authentication

Since the core application is protected through authentication and authorization,If you click <b>Login</b> link in header menu, you will directed to <b>login</b> page. 
- If you do not have an account yet,go through registation process or you can use <b>Demo user email and password</b> or <b>Admin email and password</b> which is below "continue with Google" button.
- And also you can register with your Gmail account.
- You can reset your password in 'reset password' page
<kbd>
  <img alt="Home page" src="readme-images/1-authentication/login-1.png"/>
  <img alt="Home page" src="readme-images/1-authentication/2-register.png"/>
  <img alt="Home page" src="readme-images/1-authentication/3-reset-password.png"/>
</kbd>

## III - Product Details Page.
The product details page displays all the relevant information about the product, including its name, description, price, and images. You can also add the product to your cart from this page.
-You can increase and decrease the quantity of the product.
  
<img src="readme-images/3-product-details/1-product-details.png" height=60%>  
  
- Below the product image, you will find the general specifications of the product. Below that, you can read reviews of the product.
<img src="readme-images/3-product-details/2-product-details-spec-review.png" height=60%>

## IV - Cart Page. 
Clicking on the 'Cart' option in the header directs you to the cart page.
-You can adjust the quantity of a product by increasing or decreasing it. If you no longer want a specific product, you can delete it from your cart. To remove   all items from your cart, click the 'Clear Cart' button.
- The total cost of the items in your cart is displayed below the items.
- When you click the checkout button, you will be directed to the checkout page if you have registered and logged in. Otherwise, you will be directed to the login page.
<img src="readme-images/3-product-details/3-cart.png" height=60%>  
  
## V - Checkout Page.
On the checkout page, you will find three sections: Review Items and Shipping, Order Summary, and Delivery Information.
- In the 'Review Items and Shipping' section, you can review the items you have added.
<img src="readme-images/4-checkout-page/1-checkout-page.png" height=60%>

- In the 'Order Summary' section, below the heading, you will see the coupon code input field. The default coupon code is already applied, but you can apply any other code you want.
- Below the coupon code input field, you will find the 'Payment Details' section, which includes three payment options: Cash on Delivery, UPI, and Debit or Credit Card. You can select whichever option you prefer.
<img src="readme-images/4-checkout-page/2-checkout-cod.png" height=60%>
<img src="readme-images/4-checkout-page/3-checkout-upi.png" height=60%>
<img src="readme-images/4-checkout-page/4-checkout-debtCard.png" height=60%>

- In the 'Delivery Information' section, you will need to enter your delivery address information and save it by clicking the 'Save Information' button.
- After the address is saved, it will be displayed in a well-formatted manner in the 'Delivery Information' section. You can edit the address at any time by clicking the 'Edit' button.
<img src="readme-images/4-checkout-page/5-checkout-add-delivery-address.png" height=60%>
<img src="readme-images/4-checkout-page/6-checkout-delivery-address-Saved.png" height=60%>

- After adding payment details in the 'Payment Details' section, you will see the subtotal, tax amount, coupon discount, shipping cost, and the total amount displayed below.
- Click the 'pay' button you will be redirected to checkout success page.
<img src="readme-images/4-checkout-page/7-checkout-add-debt-details.png" height=60%>

- On the checkout success page, you will see a 'View Order Status' button. Clicking this button will redirect you to the 'Orders History' page
<img src="readme-images/4-checkout-page/8-checkout-success.png" height=60%>

## VI - Orders History Page. 
On the Order History page, you will see a list of all the orders you have ever made. Clicking on any of the orders will direct you to the details page for that order.
<img src="readme-images/5-orders/1-orders-history.png" height=60%>

## VII - Order Details Page. 
On this page, you will see the Order ID, Order Amount, and Order Status, which is updated by the admin to reflect whether the order has been placed, is being processed, has been shipped, or has been delivered. You will also see a list of the products you ordered.

- In the list of products table, each product row has a 'Review Product' button. Clicking this button will direct you to the corresponding product review page, where you can review the product.
<img src="readme-images/5-orders/2-order-details.png" height=60%>

## VIII - Review Product Page. 
On this page, you can write a review for the product you ordered and rate it based on your experience with it.

<img src="readme-images/5-orders/3-review-product.png" height=60%>

## IX - Admin Page.
Only users who are logged in as the admin with the email 'admin@gmail.com' will be able to access the admin pages. 

- When logged in as an admin, you will see an 'Admin' link button in addition to the 'Reset Password' and 'Logout' buttons when you click on the account menu in the header.
- When you click on Admin link button you will be directed to admin home page.    
 <img src="readme-images/6-admin/1-admin-account-menu.png" height=60%> 
 
### Admin Home Page
- On the Admin Home page, you will see the total earnings, total products, and total orders placed by users. Additionally, there is a chat feature for order status statistics.  
<img src="readme-images/6-admin/2-admin-home.png" height=60%>

### All Products Page
- On the Admin Home page, you will see all the products that have been added. You can also edit or delete these products.
<img src="readme-images/6-admin/3-admin-all-products.png" height=60%>
<img src="readme-images/6-admin/6-admin-edit-product.png" height=60%>
<img src="readme-images/6-admin/7-admin-delete-product.png" height=60%>

### Add Product Page
- On this page, the admin can add a new product using the same process as the edit page.
<img src="readme-images/6-admin/4-admin-add-product.png" height=60%> 
<img src="readme-images/6-admin/5-add-product-save-btn.png" height=60%>

### Orders Page
- On the Orders page, you can see all the orders that have been received. By clicking on an order, the admin will be directed to the corresponding order page where they can update the order status. Any changes made to the order status will be reflected on the corresponding user's order page  
<img src="readme-images/6-admin/8-Admin-orders.png" height=60%> 
<img src="readme-images/6-admin/9-admin-order-details.png" height=60%> 
<img src="readme-images/6-admin/10-admin-order-details-status.png" height=60%>
<img src="readme-images/6-admin/11-admin-order-updated.png" height=60%>

 ##### And that wraps it up ! 
  
  ## Author

👤 **Midhun Kumar**

- Linkedin: [@Midhun Kumar](https://www.linkedin.com/in/midhun-kumar-30b108273/)
- Github: [@Midhun Kumar](https://github.com/Midhunkumar-se)

## Show your support

Please ⭐️ this repository if you liked the project!
