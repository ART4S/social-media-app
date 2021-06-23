import express from "express";

const app = express();
const port = 8000;

app.get("/", (req, res) => {});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
