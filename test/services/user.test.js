const UserService = require("../../src/services/userService");

describe("getUsers", () => {
  it("should return a list of users", async () => {
    // Arrange
    const mockUsers = [
      {
        _id: "662028ef115d3aa9c6d68d45",
        userName: "nathan",
        accountNumber: "123456",
        emailAddress: "nathan@mail",
        identityNumber: "123456",
      },
      {
        _id: "662028ef115d3aa9c6d68d46",
        userName: "nainggolan",
        accountNumber: "78910",
        emailAddress: "nainggolan@mail",
        identityNumber: "78910",
      },
    ];
    const mockUserRepository = {
      getUsers: jest.fn().mockReturnValue(mockUsers),
    };
    const userService = new UserService(mockUserRepository);

    // Act
    const result = await userService.getUsers();

    // Assert
    expect(result).toEqual(mockUsers);
    expect(mockUserRepository.getUsers).toHaveBeenCalledTimes(1);
  });

  it("should return null when data null", async () => {
    // Arrange
    const mockUserRepository = {
      getUsers: jest.fn().mockReturnValue(null),
    };
    const userService = new UserService(mockUserRepository);

    // Act
    const result = await userService.getUsers();

    // Assert
    expect(result).toBeNull();
    expect(mockUserRepository.getUsers).toHaveBeenCalledTimes(1);
  });
});

describe("getUserByID", () => {
  it("should return the user", async () => {
    // Arrange
    const refId = "662028ef115d3aa9c6d68d46";
    const user = {
      _id: "662028ef115d3aa9c6d68d46",
      userName: "nainggolan",
      accountNumber: "78910",
      emailAddress: "nathan@mail",
      identityNumber: "78910",
    };
    const userRepositoryMock = {
      getUserByID: jest.fn().mockReturnValue(user),
    };
    const userService = new UserService(userRepositoryMock);

    // Act
    const result = await userService.getUserByID(refId);

    // Assert
    expect(result).toEqual(user);
    expect(userRepositoryMock.getUserByID).toHaveBeenCalledWith(refId);
  });

  it("should return user not found", async () => {
    // Arrange
    const refId = "invalid";
    const userRepositoryMock = {
      getUserByID: jest.fn().mockReturnValue(null),
    };
    const userService = new UserService(userRepositoryMock);

    // Act and Assert
    await expect(userService.getUserByID(refId)).rejects.toThrow(
      "User not found",
    );
    expect(userRepositoryMock.getUserByID).toHaveBeenCalledWith(refId);
  });
});

describe("createUser", () => {
  it("should create a new user successfully", async () => {
    // Arrange
    const userRepositoryMock = {
      createUser: jest.fn().mockResolvedValue("User created"),
    };
    const userService = new UserService(userRepositoryMock);
    const user = {
      _id: "662028ef115d3aa9c6d68d46",
      userName: "nainggolan",
      accountNumber: "78910",
      emailAddress: "nathan@mail",
      identityNumber: "78910",
    };

    // Act
    const result = await userService.createUser(user);

    // Assert
    expect(userRepositoryMock.createUser).toHaveBeenCalledWith(user);
    expect(result).toBe("User created");
  });

  it("should throw an error when invalid input data is provided", async () => {
    // Arrange
    const userRepositoryMock = {
      createUser: jest.fn().mockRejectedValue(new Error("Invalid input data")),
    };
    const userService = new UserService(userRepositoryMock);
    const user = {
      id: 12318798,
      user: "randomUser",
      accNumber: "78910",
      email: "random@user",
      idNumber: "78910",
    };

    // Act and Assert
    await expect(userService.createUser(user)).rejects.toThrowError(
      "Invalid input data",
    );
  });
});

describe("updateUser", () => {
  it("should update a user successfully", async () => {
    // Arrange
    const userRepositoryMock = {
      updateUser: jest.fn().mockResolvedValue("User updated"),
    };
    const userService = new UserService(userRepositoryMock);
    const user = {
      _id: "662028ef115d3aa9c6d68d46",
      userName: "nathanNgl",
      accountNumber: "78910",
      emailAddress: "nathan.ngl@mail",
      identityNumber: "78910",
    };
    const refId = "662028ef115d3aa9c6d68d46";

    // Act
    const result = await userService.updateUser(refId, user);

    // Assert
    expect(userRepositoryMock.updateUser).toHaveBeenCalledWith(refId, user);
    expect(result).toBe("User updated");
  });

  it("should throw an error when data not found", async () => {
    // Arrange
    const userRepositoryMock = {
      updateUser: jest.fn().mockResolvedValue(null),
    };
    const userService = new UserService(userRepositoryMock);
    const user = {
      _id: "662028ef115d3aa9c6d68d46",
      userName: "nathanNgl",
      accountNumber: "78910",
      emailAddress: "nathan.ngl@mail",
      identityNumber: "78910",
    };
    const refId = "662028ef115d3aa9c6d68d46";

    // Act & Assert
    await expect(userService.updateUser(refId, user)).rejects.toThrowError(
      "User not found",
    );
  });

  it("should throw an error when invalid user ID is provided", async () => {
    // Arrange
    const userRepositoryMock = {
      updateUser: jest.fn().mockRejectedValue(new Error("Invalid user ID")),
    };
    const user = {
      _id: "662028ef115d3aa9c6d68d46",
      userName: "nathanNgl",
      accountNumber: "78910",
      emailAddress: "nathan.ngl@mail",
      identityNumber: "78910",
    };

    // Act
    const userService = new UserService(userRepositoryMock);

    // Assert
    await expect(userService.updateUser("invalid-id", user)).rejects.toThrow(
      "Invalid user ID",
    );
  });
});

describe("deleteUser", () => {
  it("should delete a user succesfully", async () => {
    // Arrange
    const userRepositoryMock = {
      deleteUser: jest.fn().mockResolvedValue("User deleted"),
    };
    const userService = new UserService(userRepositoryMock);
    const refId = "valid-id";

    // Act
    const result = await userService.deleteUser(refId);

    // Assert
    expect(userRepositoryMock.deleteUser).toHaveBeenCalledWith(refId);
    expect(result).toBe("User deleted");
  });

  it("should throw an error when an invalid ID is provided", async () => {
    // Arrange
    const userRepositoryMock = {
      deleteUser: jest.fn().mockRejectedValue(new Error("Invalid user ID")),
    };
    const userService = new UserService(userRepositoryMock);
    const refId = "invalid-id";

    // Act
    await expect(userService.deleteUser(refId)).rejects.toThrow(
      "Invalid user ID",
    );

    // Assert
    expect(userRepositoryMock.deleteUser).toHaveBeenCalledWith(refId);
  });
});
