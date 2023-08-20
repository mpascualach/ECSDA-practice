const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  // convert last 20 bytes?
  "3e3dc6be8442c8b6eff302c6eda02d84bc13e93c0e6d23d8cda3749a6257c5c2": 100,
  fbae39602162426cf13725bac03ac70dd13fa104cef147c55791901282d9a051: 50,
  "5bbe4307a6dfd6b21f079371077a7c0f853d4b4b525ec10c4310d2917e88d13d": 75,
};

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
