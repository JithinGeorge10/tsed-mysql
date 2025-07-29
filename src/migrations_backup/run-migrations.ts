import {AppDataSource} from "../config/typeorm.config.js";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function runMigrations() {
  try {
    console.log("🔄 Initializing database connection...");
    await AppDataSource.initialize();
    
    console.log("🔄 Running migrations...");
    await AppDataSource.runMigrations();
    
    console.log("✅ Migrations completed successfully!");
    
    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigrations(); 