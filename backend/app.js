//External Module
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");
require("dotenv").config();

//local Module
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRouter = require("./routes/userRoute");
const candidateRouter = require("./routes/candidateRoute");
const authRouter = require("./routes/authRoute");

const app = express();
// app.use(cors());

const allowedOrigins = [
  "https://classy-sunburst-fa4b6a.netlify.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://admirable-e-voting-61fab8.netlify.app/",
//     ], // ✅ your frontend URL
//     credentials: true, // ✅ required for cookies
//   })
// );

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

const MONGO_DB_URL = process.env.MONGO_URI;

const store = new MongoDBStore({
  uri: MONGO_DB_URL,
  collection: "sessions",
});

const randomString = (length) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder to save images
  },
  filename: (req, file, cb) => {
    const fileName = randomString(10) + "-" + file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(null, false); // Reject the file
  }
};

const upload = multer({ storage, fileFilter });

// const multerOptions = {
//   storage,
//   fileFilter,
// };

// app.use(multer(multerOptions).single("image")); // 'image' is the name of the file input in the form

app.use("/uploads", express.static("uploads"));
// app.use("/upload", express.static(path.join(rootDir, "uploads")));

app.use(
  session({
    //Secret key used to sign the session ID cookie and encrypt session data
    secret: "Complete Coding Secret",
    // Forces session to be saved back to the session store,even if not modified
    resave: false,
    //Forces a session that is "uninitialized" to be saved to the store
    saveUninitialized: false,
    store,
    cookie: {
      httpOnly: true,
      secure: true, // Set to true in production (HTTPS required)
      sameSite: "none", // ✅ Allows cross-origin cookies (Netlify → Render)
    },
  })
);

app.use(authRouter);
app.use(userRouter);
app.use("/candidate", candidateRouter);

const Port = process.env.PORT || 3003;
mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(Port, () => {
      console.log(`server run on address http://localhost:${Port}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB", err);
  });
