const userValidation = require('../validations/user');
const formatResponse = require('../library/formatResponse');

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async getUsers(req, res) {
        try {
            const data = await this.userService.getUsers();
            
            return formatResponse.ok({ res, message: 'Users fetched successfully', data: data });
        } catch (error) {
            return formatResponse.badRequest({ res, message: error.message });
        }
    }

    async getUserByID(req, res) {
        try {
            const refId = req.params.refId;
            const data = await this.userService.getUserByID(refId);
            return formatResponse.ok({ res, message: 'User fetched successfully', data: data });
        } catch (error) {
            return formatResponse.badRequest({ res, message: error.message });
        }
    }

    async createUser(req, res) {
        try {
            const user = req.body;

            const isValid = userValidation.create().validateAsync(user);
            if (!isValid) {
                return res.status(400).send(isValid.error);
            }

            const data = await this.userService.createUser(user);

            return formatResponse.created({ res, message: 'User created successfully', data: data });
        } catch (error) {
            return formatResponse.internalError({ res, message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const refId = req.params.refId;
            const user = req.body;

            const isValid = userValidation.update().validateAsync(user);
            if (!isValid) {
                return res.status(400).send(isValid.error);
            }

            const data = await this.userService.updateUser(refId, user);

            return formatResponse.ok({ res, message: 'User updated successfully', data: data });
        } catch (error) {
            return formatResponse.internalError({ res, message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const refId = req.params.refId;
            await this.userService.deleteUser(refId);
            
            return formatResponse.ok({ res, message: 'User deleted successfully'});
        } catch (error) {
            return formatResponse.internalError({ res, message: error.message });
        }
    }
}

module.exports = UserController;