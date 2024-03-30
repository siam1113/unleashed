const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
import { profileRouter } from "./routes/profile";
import { userRouter } from "./routes/users";
const dotenv = require('dotenv')
dotenv.config()

// App
const app = express();
app.use(express.json());
app.use(cors())
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles: true,
  tempFileDir: __dirname + '/tmp/',
  debug: true
}))

// Router
app.use("/", userRouter);
app.use("/profile", profileRouter);

// Server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});