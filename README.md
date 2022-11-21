<h1  align="center">
<br>
<a  href="https://www.stable-store.com"><img  src="https://d2c0vv5h4nuw6w.cloudfront.net/icons/brand-logo-1.PNG"  alt="Markdownify"  width="200"></a>
<br>
Furniture eCommerce Web Apps
<br>
</h1>
<h4  align="left"><a  href="https://www.stable-store.com">Stable</a> is a React and Node.js based eCommerce web app built using React, Express, Node.js, and MongoDB
</h4>

## About

I have started this project with the purpose of learning how to develope a Web App that solves real-life problems and fills a need in the business/enterprise space.

I have decided to develop an eCommerce site because I love shopping online, and I am also very interested in learning how to build a website that integrates checkout.

Unlike eCommerce websites like Amazon, eBay, or Walmart, which sells almost everything, this eCommerce web app specializes in selling furniture because I want to focus on a particular industry and make the website one of the best in that industry.

Due to copyright, there aren't many good product images you can find online for free; however, I was able to find many high-quality furniture product images at pexels.com and unsplash.com.

I put a lot of effort into it and I hope that you could like it.

Feel free to try it out! Let me know if you enjoyed it with a ⭐️

## Demo

You can try the demo here

- <a href="https://www.stable-store.com">Demo</a>

## Documents

<a href="https://github.com/andyzhp234/stable-e-commerce-web/blob/main/design-doc/design-doc.md" >System Design Documents</a>

## Videos

## Some Screenshots

**Home**
![Desktop-Home](https://d2c0vv5h4nuw6w.cloudfront.net/screenshots/desktop-home-1.png)

<br/>

**All Product**
![Desktop-All Product](https://d2c0vv5h4nuw6w.cloudfront.net/screenshots/desktop-allProduct.png)

<br/>

**Shopping Cart**
![desktop-shoppingCart](https://d2c0vv5h4nuw6w.cloudfront.net/screenshots/desktop-shoppingCart.png)

<br/>

**Search**
![desktop-shoppingCart](https://d2c0vv5h4nuw6w.cloudfront.net/screenshots/desktop-search.png)

<br/>

**User Order List**
![desktop-shoppingCart](https://d2c0vv5h4nuw6w.cloudfront.net/screenshots/desktop-orderList.png)

<br/>

**Login**
![desktop-shoppingCart](https://d2c0vv5h4nuw6w.cloudfront.net/screenshots/desktop-login.png)

<br/>

**Admin Product Lists**
![desktop-shoppingCart](https://d2c0vv5h4nuw6w.cloudfront.net/screenshots/desktop-admin-productList.png)

## Features

- Responsive Layout
- User Sign up & User Authentication and Authorization
- Display Recommend Products on home page
- Display New Arrivals Products
- Display All Products
- Sort Products by Price and Rating
- Filter Products by Availability, Category, Brand, and Price
- Search Products by name, category, brand, and description
- Product Detail Page
  - Product image slider
  - Add product to shopping cart
  - Logged in User/Admin can leave comments with rating
  - Display all reviews
- Shopping Cart
  - User able to change product quantity within shopping cart page
  - User able to delete product
- Admin can view all registered users & admins
  - Admin is able to update users profile
  - Admin is able to promote a user to be admin
  - Admin is able to delete user
- Admin can view all products
  - Admin is able to create a new product
  - Admin is able to delete a product
  - Admin is able to update a product
- Admin can View All Orders
  - Admin can mark an order as delivered
- User/Admin can update their profile
- Frontend & Backend Paginations
- Loading backdrop to signal state change
- React-hemet to dynamically change head and meta tag
- Scroll animations for better user experiences
- Lazy Load Image to improve the page's loading time
- Loading skeletons
- All Product Images are store in AWS S3 Private Bucket
- AWS CloudFront CDN in front of AWS S3 to increase performance by delivering content (images) faster and HTTPs for S3 Images

## Technologies

### Frontend

| Technologies                                                                                                      | Description                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [React.js](https://reactjs.org/)                                                                                  | Javascript Library for building user interfaces                                                    |
| [React Hooks](https://reactjs.org/docs/hooks-intro.html)                                                          | New addition in React 16.8 that let you use state and other React features without writing a class |
| [React Router v6.4.2](https://reactrouter.com/en/main)                                                            | Javascript standard library for routing in React                                                   |
| [React-helmet](https://www.npmjs.com/package/react-helmet)                                                        | Node.js packages that Manage all of your changes to the document head                              |
| [React-lazy-load-image-component](https://www.npmjs.com/package/react-lazy-load-image-component)                  | Node.js packages that lazy load images and other React components/elements.                        |
| [Axios](https://www.npmjs.com/package/axios)                                                                      | Node.js packages that implements the Promise API and used to make HTTP Requests                    |
| [Redux.js](https://redux.js.org/)                                                                                 | An open-source JavaScript library for managing and centralizing application state.                 |
| [Redux toolkit](https://redux-toolkit.js.org/)                                                                    | Redux official, opinionated, batteries-included toolset for efficient Redux development            |
| [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) | Chrome extensions that helps for debugging Redux state                                             |
| [Sass](https://sass-lang.com/)                                                                                    | A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets.     |
| [Material UI](https://mui.com/)                                                                                   | A library of UI components that can use to build React applications                                |
| [Aos](https://www.npmjs.com/package/aos)                                                                          | Node.js packages that animate elements on your page as you scroll.                                 |

### Backend

| Technologies                                                   | Description                                                                                                                              |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [Node.js](https://nodejs.org/en/)                              | An open-source server environment                                                                                                        |
| [Express.js](https://expressjs.com/)                           | A back end web application framework for building RESTful APIs with Node.js                                                              |
| [Express-sslify](https://www.npmjs.com/package/express-sslify) | Node.js packages that enforces HTTPS connections on any incoming GET and HEAD requests                                                   |
| [Multer](https://www.npmjs.com/package/multer)                 | Node.js packages that handles multipart/form-data                                                                                        |
| [Dotenv](https://www.npmjs.com/package/dotenv)                 | Node.js packages that loads environment variables from .env file into process.env                                                        |
| [Cors](https://www.npmjs.com/package/cors)                     | Node.js packages that can be used to enable CORS with various options                                                                    |
| [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)            | Node.js packages that enables storing of passwords as hashed passwords instead of plaintext                                              |
| [Mongoose.js](https://mongoosejs.com/docs/)                    | A Node.js-based Object Data Modeling (ODM) library for MongoDB                                                                           |
| [MongoDB Atlas](https://www.mongodb.com/atlas/database)        | A free cloud service to store MongoDB collections                                                                                        |
| [Stripe](https://stripe.com/)                                  | A suite of APIs powering online payment processing                                                                                       |
| [AWS S3 Storage Bucket](https://aws.amazon.com/s3/)            | AWS services that provides an object storage service offering industry-leading scalability, data availability, security, and performance |
| [AWS CloudFront CDN](https://aws.amazon.com/cloudfront/)       | AWS services that provides content delivery network (CDN) service                                                                        |
| [Heroku](https://www.heroku.com/home)                          | A Cloud Platform (PaaS) to deploy my Full stack Application                                                                              |
| [Google Domain](https://domains.google/)                       | A domain name registrar operated by Google.                                                                                              |

### Dev Tools

| Technologies       | Description                                                               |
| ------------------ | ------------------------------------------------------------------------- |
| Visual Studio Code | Code Editor                                                               |
| Postman            | API platform for developers to design, build, test and iterate their APIs |
| Lucidchart         | Sketch System Design flowchart diagrams                                   |

## Potential Improvements

- Adding Refresh Token for Better User Experiences
- Use Redis for cache
- Use Elastic Search for product search
- Deploy to Aws
- Use Nginx and Docker
- Consider Load Balancer
- User Authentication using Google / Facebook / OAuth
- Cypress Test
- Jest Unit Test
- Improve SEO
- Track Visitors & Analytics

## What I Learned

- JWT vs Session (cookies)
- How to use Stripe as Payment Gateways
- AWS S3 and CloudFront CDN
- Sass
