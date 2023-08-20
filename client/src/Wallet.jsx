import { useState, useEffect } from "react";
import { Select } from "@chakra-ui/react";

function Wallet({ addresses }) {
  const [sender, selectSender] = useState(null);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    selectSender(addresses.find((a) => a.address == selectedValue));
  };

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Address
        <Select onChange={handleSelectChange} placeholder="Select an address">
          {addresses.map((address) => (
            <option value={address.address} key={address.address}>
              {address.address}
            </option>
          ))}
        </Select>
      </label>

      <div className="balance">Balance: {sender ? sender.balance : "..."}</div>
    </div>
  );
}

export default Wallet;
