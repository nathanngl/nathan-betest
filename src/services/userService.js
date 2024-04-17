class UserService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }

    async getUsers() {
        try {
            const data = this.UserRepository.getUsers();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserByID(refId) {
        try {
            const data = this.UserRepository.getUserByID(refId);
            if (!data) {
                throw new Error('User not found');
            }
        return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async createUser(user) {
        try {
            const data = await this.UserRepository.create(user);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateUser(refId, user) {
        try {
            const data = await this.UserRepository.updateUser(refId, user);
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