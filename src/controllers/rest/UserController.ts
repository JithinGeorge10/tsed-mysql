import {Controller, Inject} from "@tsed/di";
import {Post} from "@tsed/schema";
import {BodyParams} from "@tsed/platform-params";
import {UserService} from "../../services/UserService.js";

@Controller("/users")
export class UserController {
  constructor(@Inject() private userService: UserService) {}
  
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
      
      const savedUser = await this.userService.create(userData);
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