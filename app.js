const express = require("express");

const app = express();

const port = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  if (res) {
    res.send("Welcome to online teaching platform");
  }
});

app.get("/about", async (req, res) => {
  if (res) {
    res.send("About us: ABC COMPANY, City!");
  }
});

app.get("/contact", async (req, res) => {
  if (res) {
    res.send("Contact us at: example@gmail.com!");
  }
});

app.get("/data", async (req, res) => {
  if (res) {
    res.send("Contact us at: example@gmail.com!");
  }
});

app.post('/additem', async (req, res) => {
  res.json({message:"Data added successfully!"})
})

app.delete("/deleteitem", async (req, res) => {
  res.json({ message: "Data deleted!" });
});


app.put("/updateitem", async (req, res) => {
  res.json({ message: "Data updated!" });
});


app.listen(port, () => {
    console.log(`server running on: http://localhost:${port}`)
})

