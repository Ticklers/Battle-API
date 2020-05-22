const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
var cors = require("cors");
const socketMain = require('./socket/socketMain');
const nsSocketMain = require('./socket/nsSocketMain');
const { namespaces, chatsData } = require('./socket/data/namespaces');
// let namespaces = require('./data/namespaces');
// const upload = multer({dest: 'uploads/'});

mongoose.Promise = global.Promise;

const app = express();
const socketio = require('socket.io');
const port = process.env.PORT || 5000;

const expressServer = app.listen(port, () => console.log("server is running on port: " + port));

const io = socketio(expressServer);
// default ns connection
io.on('connection', (socket) => {
  socketMain(io, socket);
  console.log(socket.rooms)
  console.log('New Socket has been connected to default ns ', socket.id);
});

// other ns connection
namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on('connection', (nsSocket) => {
    // console.log(namespace.endpoint);
    nsSocketMain(io, nsSocket, namespace);
    console.log('New nsSocket has been connected ', nsSocket.id);
  });
});

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET, OPTIONS"
    );
    return res.status(200).json({});
  }
  next();
});

// app.use(
//   cors({
//     allowedHeaders: ["sessionId", "Content-Type"],
//     exposedHeaders: ["sessionId"],
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//   })
// );

app.get("/", (req, res) => res.send("Root path of the app"));

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected Succesfully"))
  .catch((err) => console.log(err));

// app.use('/uploads', express.static('uploads'));

const users = require("./routes/users");
app.use("/api/users", users);

const userUpdates = require("./routes/userUpdate");
app.use("/api/userupdate", userUpdates);

const memes = require("./routes/memes");
app.use("/api/memes", memes);

const addons = require("./routes/memeAddons");
app.use("/api/addons", addons);

const battles = require("./routes/battles");
app.use("/api/battles", battles);

const feed = require("./routes/feed");
app.use("/api/feed", feed);

app.get("/search", function (req, res) {
  res.sendFile(path.join(__dirname + "/header.html"));
});

app.use(passport.initialize());
require("./config/passport")(passport);

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

