# Design Doc

# Stable (E-commerce Website)

Used Multer for Image uploading

# Database Schema

## Product

| Column       | Type   | Description                       |
| ------------ | ------ | --------------------------------- |
| \_id         | int    | pk                                |
| name         | String | Name of the product               |
| image        | String | Image of the product              |
| description  | String | Description of the product        |
| brand        | String | Brand of the product              |
| category     | String | Category of the product           |
| price        | int    | Price of the product              |
| countInStock | int    | Number of this product in stock   |
| rating       | int    | Rating of this product            |
| numReviews   | int    | Number of Reviews of this product |
