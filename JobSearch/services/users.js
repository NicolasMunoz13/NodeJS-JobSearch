const User = require("../models/users");
const { roles } = require("../server/roles");

class Users {
  /*getAll(){

    }*/

  /*create(data){

    }*/

  /*async getAll(){
        const user = await client.users.findMany({
            include:{
                library:true
            }
        })
        return user
    }

    async getByEmail(){
        const user = await client.users.findFirst({
            where:{
                email
            }
        })

        return user
    }

    async create(userData){
        const data = {
            data:userData
        }
        console.log(data)
        const user = await client.users.create(data)
        return user;
    }

    async update(idUser, data){
        const id = Number.parseInt(idUser);
        const user = client.users.update({
            where:{
                id
            },
            data
        })
        return user;
    }

    async delete(idUser){
        const id = Number.parseInt(idUser)
        const user = await client.users.delete({
            where:{
                id
            }
        })

        return user
    }*/

  async getUsers(req, res, next) {
    const users = await User.find({});
    res.status(200).
      json({
        data: users,
      });
  }

  async getUserById(req, res, next) {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) {
        return next(new Error("User does not exist"));
      }
      res.status(200).json({
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const update = req.body;
      const userId = req.params.userId;
      await User.findByIdAndUpdate(userId, update);
      const user = await User.findById(userId);
      res.status(200).json({
        data: user,
        message: "User has been updated",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const userId = req.params.userId;
      await User.findByIdAndDelete(userId);
      res.status(200).json({
        data: null,
        message: "User has been deleted",
      });
    } catch (error) {
      next(error);
    }
  }

  grantAccess(action, resource) {
    return async (req, res, next) => {
      try {
        const permission = roles.can(req.user.role)[action](resource);
        if (!permission.granted) {
          return res.status(401).json({
            error: "You don't have enough permission to perform this action",
          });
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  async allowIfLoggedin(req, res, next) {
    try {
      const user = res.locals.loggedInUser;
      if (!user)
        return res.status(401).json({
          error: "You need to be logged in to access this route",
        });
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Users;
