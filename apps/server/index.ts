const express = require('express')
import { userRouter } from "./routes/users";

// App
const app = express();
app.use(express.json());

// Router
app.use("/", userRouter);


// Server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});