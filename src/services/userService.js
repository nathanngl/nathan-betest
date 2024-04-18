class UserService {
  constructor(UserRepository, RedisClient) {
    this.UserRepository = UserRepository;
    this.redis = RedisClient;
  }

  async getUsers() {
    try {
      const cachedData = await this.redis.get("users");
      if (cachedData !== null && cachedData.length > 0) {
        return cachedData;
      }

      const data = await this.UserRepository.getUsers();
      if (data) {
        await this.redis.store("users", JSON.stringify(data));
      }

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByID(refId) {
    try {
      const redisKey = `user_${refId}`;

      const cachedData = await this.redis.get(redisKey);
      if (cachedData !== null && cachedData.length > 0) {
        return cachedData;
      }

      const data = await this.UserRepository.getUserByID(refId);
      if (!data) {
        throw new Error("User not found");
      } else {
        await this.redis.store(redisKey, JSON.stringify(data));
      }

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(user) {
    try {
      const data = await this.UserRepository.createUser(user);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(refId, user) {
    try {
      const data = await this.UserRepository.updateUser(refId, user);
      if (!data) {
        throw new Error("User not found");
      }
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(refId) {
    try {
      const data = await this.UserRepository.deleteUser(refId);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UserService;
