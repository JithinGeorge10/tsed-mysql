import {DataSource} from "typeorm";
import {User} from "../entities/User.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "tsed_mysql_db",
  synchronize: true, // Temporarily enable synchronize to create email field
  logging: process.env.DB_LOGGING === "true",
  entities: [User],
  subscribers: [],
  migrations: [],
  migrationsRun: false, // Disable migrations temporarily
});

// Initialize the data source
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connection established successfully");
    
    // Ensure tables are created
    await AppDataSource.synchronize();
    console.log("✅ Database tables synchronized successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
}; 