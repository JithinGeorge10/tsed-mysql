// @ts-ignore
import {describe, it, expect, vi, beforeEach} from "vitest";
import {UserController} from "../UserController.js";
import {UserService} from "../../../services/UserService.js";
import {User} from "../../../entities/User.js";

// Mock the UserService
vi.mock("../../../services/UserService.js");

describe("UserController", () => {
  let userController: UserController;
  let mockUserService: vi.Mocked<UserService>;

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    
    // Create a mock instance of UserService
    mockUserService = {
      create: vi.fn()
    } as vi.Mocked<UserService>;
    
    // Create UserController instance with mocked UserService
    userController = new UserController(mockUserService);
  });

  describe("createUser", () => {
    it("should create a user successfully with valid data", async () => {
      // Arrange
      const userData = {
        name: "John Doe",
        age: 25,
        email: "john@example.com",
        address: "123 Main Street, City"
      };

      const mockCreatedUser = {
        id: 1,
        name: "John Doe",
        age: 25,
        email: "john@example.com",
        address: "123 Main Street, City"
      } as User;

      mockUserService.create.mockResolvedValue(mockCreatedUser);

      // Act
      const result = await userController.createUser(userData);

      // Assert
      expect(mockUserService.create).toHaveBeenCalledWith(userData);
      expect(mockUserService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: true,
        message: "User created successfully",
        data: mockCreatedUser
      });
    });

    it("should return error when name is missing", async () => {
      // Arrange
      const userData = {
        age: 25,
        email: "john@example.com",
        address: "123 Main Street, City"
      };

      // Act
      const result = await userController.createUser(userData);

      // Assert
      expect(mockUserService.create).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: false,
        message: "Missing required fields: name, age, email, address",
        error: "Invalid request body"
      });
    });

    it("should return error when age is missing", async () => {
      // Arrange
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        address: "123 Main Street, City"
      };

      // Act
      const result = await userController.createUser(userData);

      // Assert
      expect(mockUserService.create).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: false,
        message: "Missing required fields: name, age, email, address",
        error: "Invalid request body"
      });
    });

    it("should return error when email is missing", async () => {
      // Arrange
      const userData = {
        name: "John Doe",
        age: 25,
        address: "123 Main Street, City"
      };

      // Act
      const result = await userController.createUser(userData);

      // Assert
      expect(mockUserService.create).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: false,
        message: "Missing required fields: name, age, email, address",
        error: "Invalid request body"
      });
    });

    it("should return error when address is missing", async () => {
      // Arrange
      const userData = {
        name: "John Doe",
        age: 25,
        email: "john@example.com"
      };

      // Act
      const result = await userController.createUser(userData);

      // Assert
      expect(mockUserService.create).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: false,
        message: "Missing required fields: name, age, email, address",
        error: "Invalid request body"
      });
    });

    it("should return error when userData is null", async () => {
      // Arrange
      const userData = null;

      // Act
      const result = await userController.createUser(userData);

      // Assert
      expect(mockUserService.create).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: false,
        message: "Missing required fields: name, age, email, address",
        error: "Invalid request body"
      });
    });

    it("should return error when userData is undefined", async () => {
      // Arrange
      const userData = undefined;

      // Act
      const result = await userController.createUser(userData);

      // Assert
      expect(mockUserService.create).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: false,
        message: "Missing required fields: name, age, email, address",
        error: "Invalid request body"
      });
    });

    it("should handle UserService errors", async () => {
      // Arrange
      const userData = {
        name: "John Doe",
        age: 25,
        email: "john@example.com",
        address: "123 Main Street, City"
      };

      const serviceError = new Error("Database connection failed");
      mockUserService.create.mockRejectedValue(serviceError);

      // Act
      const result = await userController.createUser(userData);

      // Assert
      expect(mockUserService.create).toHaveBeenCalledWith(userData);
      expect(mockUserService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: "Failed to create user",
        error: "Database connection failed"
      });
    });

    it("should handle UserService errors with unknown error message", async () => {
      // Arrange
      const userData = {
        name: "John Doe",
        age: 25,
        email: "john@example.com",
        address: "123 Main Street, City"
      };

      const serviceError = new Error();
      serviceError.message = undefined as any;
      mockUserService.create.mockRejectedValue(serviceError);

      // Act
      const result = await userController.createUser(userData);

      // Assert
      expect(mockUserService.create).toHaveBeenCalledWith(userData);
      expect(mockUserService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: "Failed to create user",
        error: "Unknown error occurred"
      });
    });
  });
}); 