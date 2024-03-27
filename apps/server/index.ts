const express = require('express')
const cors = require('cors')
import { userRouter } from "./routes/users";

// App
const app = express();
app.use(express.json());
app.use(cors())

// Router
app.use("/", userRouter);


// Server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});