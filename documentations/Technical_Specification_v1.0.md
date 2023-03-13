# Technical Specification Document

Author: Haopeng Zeng

Date: 3/12/2023 (Updated)

# User Management

The user management system of our project will allow users to sign up for an account, log in, and manage their account information. The system will include the following features:

User registration: Users can create a new account by providing their name, email address, and a password.

User login: Users can log in to their account using their email address and password.

Account management: Users can view and edit their account information, including their name, email address, password, and profile picture.

User roles: The system will support different user roles, such as customer, and admin, each with their own set of permissions.

# Product Management

The product management system of our project will allow us to add, edit, and delete products from the inventory. The system will include the following features:

Product creation: Admins can create a new product by providing the product name, description, category, price, and image.Product deletion: Admins can delete products from the inventory.

Product search: Users can search for products by name, category, and description.

Product filtering: Users can filter products by category, brand, price, and availability.

# Shopping Cart

The shopping cart system of our project will allow users to add products to their cart, view their cart, and complete their purchase. The system will include the following features:

Cart management: Users can add products to their cart, remove products from their cart, and change the quantity of products in their cart.

Checkout process: Users can complete their purchase by entering their shipping and payment information.

Payment processing: The system will process payments securely using a third-party payment gateway, such as Stripe.

Order management: Admins can view and manage orders, including marking orders as shipped and generating packing slips.

# Search and Filtering

The search and filtering system of our project will allow users to search for products and filter search results based on various criteria. The system will include the following features:

Search functionality: Users can search for products by name, category, brand, and description.

Filter functionality: Users can filter search results based on category, brand, price, and availability.

Search algorithms: The system will use advanced search algorithms to provide accurate and relevant search results.

# Reviews and Ratings

The reviews and ratings system of our project will allow users to leave reviews and ratings for products, and view reviews and ratings left by other users. The system will include the following features:

- Review submission: Users can submit reviews for products, including a rating and a written review.

- Review display: Users can view reviews left by other users, including the rating and written review.

- Review aggregation: The system will aggregate reviews and ratings to provide an overall rating for each product.

- Review filtering: Users can filter reviews based on various criteria, such as date, rating, and author.

# Performance and Scalability

The performance and scalability of our project will be optimized to handle high volumes of traffic and data. The system will include the following features:

- Laze loading images

- AWS Cloudfront for Asset Cache

# Security

the system will be designed to protect user data and prevent unauthorized access. The system will include the following features:

User authentication: Users will be required to log in to their account using their email address and password.

Password security: User passwords will be stored securely using encryption and hashing techniques to prevent unauthorized access.

Secure connections: All connections to the system, including API calls and user sessions, will be secured using SSL/TLS encryption.

Access control: The system will enforce strict access control policies to prevent unauthorized access to sensitive data.

# Responsive Design

The minimum screen width requirement: 320px.

The maximum screen size is 1980 pixels.

`$breakpoints-up: (
  "sm": 640px,
  "md": 768px,
  "lg": 1024px,
  "xl": 1280px,
  "2xl": 1536px
);`
