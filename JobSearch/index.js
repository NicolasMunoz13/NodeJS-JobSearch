const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const env = require("./Config/index");
const db = require("./Config/db");
const port = env.config.port;
const connection = db.connection();

//Creacion de servidor
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//importando Rutas
const users = require("./routes/users");
const auth = require("./routes/auth");
const jobs = require("./routes/jobs")
const User = require("./models/users");


//Estableciendo la conexion
connection;

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const accesToken = req.headers["x-access-token"];
    const { userId, exp } = await jwt.verify(accesToken, env.config.JWT_SECRET);
    // Check if token has expired
    if (exp < Date.now().valueOf() / 1000) {
      return res
        .status(401)
        .json({
          error: "Token JWT se encuentra expirado. Inicia sesion para obtener uno nuevo",
        });
    }
    res.locals.loggedInUser = await User.findById(userId);
    next();
  }else{
      next();
  }
});

//usnado rutas
users(app);
auth(app);
jobs(app)

app.listen(port, () => {
  console.log("Escuchando: http://localhost:" + port);
});
