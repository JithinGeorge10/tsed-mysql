# MySQL Setup Guide

## 1. Create .env file

Create a `.env` file in the root directory with the following content:

```env
# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=tsed_mysql_db
DB_SYNCHRONIZE=true
DB_LOGGING=true

# Application Configuration
PORT=8083
NODE_ENV=development
```

## 2. MySQL Database Setup

1. Install MySQL if not already installed
2. Create the database:
   ```sql
   CREATE DATABASE tsed_mysql_db;
   ```
3. Make sure your MySQL user has proper permissions

## 3. Run the Application

```bash
npm run start
```

The application will:
- Connect to MySQL database
- Create the User table automatically (if DB_SYNCHRONIZE=true)
- Start the server on port 8083

## 4. Verify Connection

When you run `npm run start`, you should see:
- "✅ Database connection established successfully" message
- Server starting on port 8083

## 5. User Entity

The User entity includes:
- `id`: Primary key (auto-generated)
- `name`: String (varchar 255)
- `age`: Integer
- `address`: Text
- `createdAt`: Timestamp (auto-generated)
- `updatedAt`: Timestamp (auto-updated) 