# Alpha Store - E-Commerce Web Application

Alpha Store is a full-stack MERN e-commerce web application that provides a seamless online shopping experience. Users can browse products, add items to their cart, place orders, and make secure payments using Stripe.

## Features

### User Features

* User Authentication & Authorization
* Browse Products
* Search Products
* View Product Details
* Add to Cart
* Update Cart Quantity
* Remove Items from Cart
* Place Orders
* Cash on Delivery (COD)
* Stripe Payment Integration
* Order History
* Responsive Design

### Admin Features

* Product Management
* Order Management
* User Management
* Secure Admin Access

---

## Tech Stack

### Frontend

* React.js
* TypeScript
* Redux Toolkit
* React Hook Form
* Tailwind CSS
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Stripe Payment Gateway
* ImageKit

---

## Database Collections

### Users

Stores user information, authentication data, roles, and addresses.

### Cart

Stores user cart items and product quantities.

### Orders

Stores order information, shipping details, payment method, and order status.

### Payments

Stores payment records, transaction details, payment status, and Stripe session information.

---

## Payment Integration

The application supports:

* Cash On Delivery (COD)
* Stripe Online Payments

Stripe Checkout is used for secure online payment processing.

---

## Image Management

Product images are uploaded and managed using ImageKit for optimized image delivery and storage.

---

## Authentication & Authorization

* JWT Based Authentication
* Protected Routes
* Role-Based Access Control
* Admin and User Access Separation

---

## Installation

### Clone Repository

```bash
git clone https://github.com/munnadotin/CodeAlpha_E-Commerce
cd alpha-store
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

---

## Environment Variables

### Backend

```env
PORT=
MONGODB_URI=

JWT_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=

CLIENT_URL=
```

### Frontend

```env
VITE_SERVER_URL=
```

## Future Improvements

* Product Reviews & Ratings
* Wishlist Functionality
* Coupon System
* Inventory Management
* Email Notifications
* Order Tracking
* Multi-Address Support

---

## Author

Developed by Munna Kumar

Built using the MERN Stack with TypeScript, Redux Toolkit, Stripe, MongoDB, and ImageKit.
