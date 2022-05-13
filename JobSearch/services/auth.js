const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("./users");
const User = require("../models/users");
const env = require("../Config/index");

/*
class Auth{

    async login(credentials){
        const {email, password} = credentials;
        const userService = new Users();

        const user = await userService.getByEmail(email);
        if(user && this.compare(password, user.email)){
            delete user.password;
            const token = this.createToken(user);
            return{
                logged: true,
                data: user,
                token
            }
        }

        return{
            logged: false,
            message: "Credenciales Incorrectas, Verificr"
        }
    }

    async signup(credentials){
        const userService = new Users();
        credentials.password = await this.encrypt(credentials.password)
        const user = await userService.create(credentials)

        if(user){
            const token = this.createToken(user)
            return{
                logged: true,
                data:user,
                token
            }
        }

        return{
            logged: false,
            message:"Credenciales incorrectas. Verificar"
        }
    }

    createToken(data){
        const token = jwt.sign(data, "12345")
        return token
    }

    async encrypt(text){
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(text, salt);
        return hash;
    }

    async compare(text, hash){
        const result = await bcrypt.compare(text, hash);
        return result;
    }
}

*/

/*class Auth {
  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async signup(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const hashedPassword = await hashPassword(password);
      const newUser = new User({
        email,
        password: hashedPassword,
        role: role || "basic",
      });
      const accessToken = jwt.sign(
        { userId: newUser._id },
        env.config.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      newUser.accessToken = accessToken;
      await newUser.save();
      res.json({
        data: newUser,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Auth;*/

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || "basic",
    });
    const accessToken = jwt.sign(
      { userId: newUser._id },
      env.config.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    newUser.accessToken = accessToken;
    await newUser.save();
    res.json({
      data: newUser,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new Error("Email does not exist"));
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return next(new Error("Password is not correct"));
    const accessToken = jwt.sign({ userId: user._id }, env.config.JWT_SECRET, {
      expiresIn: "1d",
    });
    await User.findByIdAndUpdate(user._id, { accessToken });
    res.status(200).json({
      data: { email: user.email, role: user.role },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
