class UserRepository {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }

    async getUsers() {
        return await this.UserModel.find();
    }

    async getUserByID(refId) {
        return await this.UserModel.findOne({ _id: refId });
    }

    async create(user) {
        return await this.UserModel.create(user);
    }

    async updateUser(refId, user) {
        const filter = { _id: refId };
        const update = user;
        return await this.UserModel.findOneAndUpdate(filter, update, { new: true });
    }

    async deleteUser(refId) {
        return await this.UserModel.deleteOne({ _id: refId });
    }
}

module.exports = UserRepository;