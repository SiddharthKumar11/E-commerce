# E-Commerce MERN Stack

A production-ready e-commerce backend built with MongoDB, Express, React, and Node.js (MERN stack).

## Features

- 🔐 **Authentication**: JWT + Refresh Token with Redis
- 🛍️ **Products**: Catalog with Redis caching, search, and filtering
- 🛒 **Shopping Cart**: Real-time inventory validation
- 📦 **Orders**: ACID transactions for data integrity
- 📊 **Logging**: Winston with daily log rotation
- 🔒 **Security**: Helmet, CORS, bcrypt password hashing
- 🚀 **Performance**: Redis caching, compression
- 📝 **API Versioning**: `/api/v1/*` endpoints

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (Mongoose)
- **Cache**: Redis (ioredis)
- **Auth**: JWT, bcrypt
- **Logging**: Winston
- **Queue**: BullMQ (configured)

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB
- Redis

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp apps/server/.env.example apps/server/.env
   ```

4. Start MongoDB and Redis (using Docker):
   ```bash
   docker-compose up -d
   ```

5. Run the development server:
   ```bash
   npm run dev:server
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout

### Products
- `GET /api/v1/products` - List products (with filters)
- `GET /api/v1/products/:id` - Get product
- `POST /api/v1/products` - Create product (admin)
- `PUT /api/v1/products/:id` - Update product (admin)
- `DELETE /api/v1/products/:id` - Delete product (admin)

### Cart
- `GET /api/v1/cart` - Get cart
- `POST /api/v1/cart/items` - Add to cart
- `PUT /api/v1/cart/items/:productId` - Update quantity
- `DELETE /api/v1/cart/items/:productId` - Remove item
- `DELETE /api/v1/cart` - Clear cart

### Orders
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders` - Get user orders
- `GET /api/v1/orders/:id` - Get order details
- `PUT /api/v1/orders/:id/cancel` - Cancel order
- `PUT /api/v1/orders/:id/status` - Update status (admin)

## Project Structure

```
apps/
└── server/
    └── src/
        ├── config/       # DB & Redis connections
        ├── core/         # Logger, AppError
        ├── middleware/   # Auth, Error handling
        ├── modules/      # Feature modules
        │   ├── auth/
        │   ├── products/
        │   ├── cart/
        │   └── orders/
        └── utils/        # JWT utilities
```

## License

MIT