import {AppDataSource} from "./config/typeorm.config.js";

async function testDatabaseConnection() {
  try {
    console.log("🔍 Testing database connection...");
    
    // Initialize the data source
    await AppDataSource.initialize();
    console.log("✅ Database connection successful!");
    
    // Test a simple query
    const result = await AppDataSource.query("SELECT 1 as test");
    console.log("✅ Database query test successful:", result);
    
    // Close the connection
    await AppDataSource.destroy();
    console.log("✅ Database connection closed successfully!");
    
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

// Run the test
testDatabaseConnection(); 