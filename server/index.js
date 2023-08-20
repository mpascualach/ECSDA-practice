const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const generateAddress = require("./scripts/generate");

app.use(cors());
app.use(express.json());

const generatedAddresses = [];

for (let i = 0; i < 3; i++) {
  generatedAddresses.push(generateAddress());
}

const balances = {};

for (let i = 0; i < generatedAddresses.length; i++) {
  const address = generatedAddresses;
  if (i === 0) {
    balances[address] = 100;
  } else if (i === 1) {
    balances[address] = 80;
  } else {
    balances[address] = 60;
  }
}

console.log("Balances: ", balances);

app.get("/balances", (req, res) => {
  res.send(balances);
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
