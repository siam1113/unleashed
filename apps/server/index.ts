const express = require('express')
const cors = require('cors')
import { profileRouter } from "./routes/profile";
import { userRouter } from "./routes/users";

// App
const app = express();
app.use(express.json());
app.use(cors())

// Router
app.use("/", userRouter);
app.use("/profile", profileRouter);

// Server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});