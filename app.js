import express from "express";
import router from "./courseRouter.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/course/courses/", router);

app.listen(port, () => {
  console.log(`server running on: http://localhost:${port}`);
});
