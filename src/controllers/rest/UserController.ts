import {Controller} from "@tsed/di";
import {Post} from "@tsed/schema";
import {BodyParams} from "@tsed/platform-params";
import {User} from "../../entities/User.js";
import {AppDataSource} from "../../config/typeorm.config.js";

@Controller("/users")
export class UserController {
  @Post("/createUser")
  async createUser(@BodyParams() userData: any) {
    console.log("Received request body:", userData);
    try {
      
      // Validate request body
      if (!userData || !userData.name || !userData.age || !userData.email || !userData.address) {
        console.log("Validation failed. userData:", userData);
        return {
          success: false,
          message: "Missing required fields: name, age, email, address",
          error: "Invalid request body"
        };
      }
      
      // Initialize database connection if not already initialized
      if (!AppDataSource.isInitialized) {
        console.log("Initializing database connection...");
        await AppDataSource.initialize();
        console.log("Database connection initialized successfully");
      }
      
      const userRepository = AppDataSource.getRepository(User);
      console.log("User repository obtained");
      
      const newUser = new User();
      newUser.name = userData.name;
      newUser.age = userData.age;
      newUser.email = userData.email;
      newUser.address = userData.address;
      console.log("New user object created:", newUser);
      
      const savedUser = await userRepository.save(newUser);
      console.log("User saved successfully:", savedUser);
      
      return {
        success: true,
        message: "User created successfully",
        data: savedUser
      };
    } catch (error) {
      console.error("Error creating user:", error);
      return {
        success: false,
        message: "Failed to create user",
        error: error.message || "Unknown error occurred"
      };
    }
  }
} 