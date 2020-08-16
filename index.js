import express from "express";
const app = express();

const PORT = 4000;

// function handleListening() {
//   console.log(`Listening on: http://localhost:${PORT}`);
// }

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

// function handleHome() {
//     console.log('Hi from home!!');
// }

// function handleHome(req, res) {
//     // console.log(req);
//     res.send("Hello from home");
// }

const handleHome = (req, res) => res.send("Hello from my ass");

function handleProfile(req, res) {
  res.send("You are on my profile");
}

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
