import { useState } from "react";
import server from "./server";
import { Select } from "@chakra-ui/react";

function Transfer({
  addresses,
  onAmountChange,
  onRecipientChange,
  onTransfer,
}) {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    onAmountChange(event.target.value);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedRecipient = addresses.find((a) => a.address == selectedValue);
    setRecipient(selectedRecipient);
    onRecipientChange(selectedRecipient);
  };

  async function transfer(evt) {
    evt.preventDefault();

    onTransfer();
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
