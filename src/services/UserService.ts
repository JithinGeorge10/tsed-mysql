import {Injectable} from "@tsed/di";
import {User} from "../entities/User.js";
import {AppDataSource} from "../config/typeorm.config.js";

@Injectable()
export class UserService {
  async create(userData: {
    name: string;
    age: number;
    email: string;
    address: string;
  }): Promise<User> {
    // Initialize database connection if not already initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    
    const userRepository = AppDataSource.getRepository(User);
    
    const newUser = new User();
    newUser.name = userData.name;
    newUser.age = userData.age;
    newUser.email = userData.email;
    newUser.address = userData.address;
    
    return await userRepository.save(newUser);
  }
} 