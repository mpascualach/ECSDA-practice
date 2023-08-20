const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  // convert last 20 bytes?
  "046356ebf4f27b217ac9811351fef6ae72453fcceac88f9eac86bae1ec7363a0c3793e176b6f7055d81761ec855ab625b9f2f3d03013dd257d5b657974fb0c3fd9": 100,
  "04cf6a1c3bcf68edad27c234c43a43fde16970ae1abd4cc8eb0ee7edb4cbe02d883df8897eb384f42c52f6bb31a53657ec7ac11c9e811298bb0abf4a90f6678064": 50,
  "04b40361a0c95c95e3b016819ca6e8d29b6ea9cb5e8cc07882d1a56e18a97f71342144abc815a24ef706ffcec4ae26ae5e0e958194d49cc28ec21be10e9b654853": 75,
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
