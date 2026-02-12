import express, { type Request, type Response } from "express";

const app = express();
const port = 5500;

const getRequest = (req: Request, res: Response) => {
  res.status(200).json({
    statusCode: `${res.statusCode}`,
    message: "Hello world!",
  });
};

const postRequest = (req: Request, res: Response) => {
  res.status(201).json({
    message: "success",
  });

  res.header(
    JSON.stringify({
      "Content-Type": "application/json",
    }),
  );
};

app.post("/", postRequest);

app.get("/", getRequest);

app.listen(port, "localhost", () => {
  console.log(`server is running on http://localhost:${port}`);
});
