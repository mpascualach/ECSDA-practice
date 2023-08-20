import { useState } from "react";
import server from "./server";
import { Select } from "@chakra-ui/react";

function Transfer({ addresses }) {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setRecipient(addresses.find((a) => a.address == selectedValue));
  };

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(amount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={amount}
          onChange={handleAmountChange}
        ></input>
      </label>

      <label>
        Recipient
        <Select onChange={handleSelectChange} placeholder="Select an address">
          {addresses.map((address) => (
            <option value={address.address} key={address.address}>
              {address.address}
            </option>
          ))}
        </Select>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
