const AuthService = require("../../src/services/authService");

describe("getToken", () => {
  it("should return a token when given a valid payload", async () => {
    // Arrange
    const payload = { username: "testUser" };
    const expectedToken = "testToken";
    const AuthenticateJWT = {
      generateToken: jest.fn().mockResolvedValue(expectedToken),
    };
    const authService = new AuthService(AuthenticateJWT);

    // Act
    const result = await authService.getToken(payload);

    // Assert
    expect(result).toBe(expectedToken);
    expect(AuthenticateJWT.generateToken).toHaveBeenCalledWith(payload);
  });

  it("should throw an error when given an invalid payload", async () => {
    // Arrange
    const payload = { username: "testUser" };
    const expectedError = new Error("Error: Error: Error: Invalid payload");
    const AuthenticateJWT = {
      generateToken: jest.fn().mockRejectedValue(expectedError),
    };
    const authService = new AuthService(AuthenticateJWT);

    // Act and Assert
    await expect(authService.getToken(payload)).rejects.toThrowError(
      expectedError,
    );
    expect(AuthenticateJWT.generateToken).toHaveBeenCalledWith(payload);
  });
});
