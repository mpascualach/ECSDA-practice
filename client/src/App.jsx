import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState, useEffect } from "react";
import server from "./server";

import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [addresses, setAddresses] = useState([]); // [ { address: "0x123", balance: 100 }, ...

  const [sender, setSender] = useState(null);
  const [amount, setAmount] = useState(null);
  const [recipient, setRecipient] = useState(null);

  async function getAddresses() {
    // get randomly generated addresses from server
    const { data } = await server.get("balances");
    console.log("data", data);

    const formattedBalances = Object.entries(data).map(
      ([address, balance]) => ({ address, balance })
    );
    console.log(formattedBalances);
    setAddresses(formattedBalances);
  }

  useEffect(() => {
    // get these addresses when the app loads
    getAddresses();
  }, []);

  const handleSenderChange = (newSender) => {
    setSender(newSender);
  };

  const handleAmountChange = (newAmount) => {
    setAmount(newAmount);
  };

  const handleRecipientChange = (newRecipient) => {
    setRecipient(newRecipient);
  };

  const handleTransfer = async () => {
    console.log(sender, amount, recipient);
    try {
      await server.post(`send`, {
        sender: sender,
        amount: parseInt(amount),
        recipient: recipient,
      });
      // sender.balance -= parseInt(amount);
      // recipient.balance += parseInt(amount);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <ChakraProvider>
      <div className="app">
        <Wallet addresses={addresses} onSenderChange={handleSenderChange} />
        <Transfer
          addresses={addresses}
          onAmountChange={handleAmountChange}
          onRecipientChange={handleRecipientChange}
          onTransfer={handleTransfer}
        />
      </div>
    </ChakraProvider>
  );
}

export default App;
