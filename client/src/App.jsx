import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState, useEffect } from "react";
import server from "./server";

import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [addresses, setAddresses] = useState([]); // [ { address: "0x123", balance: 100 }, ...

  async function getAddresses() {
    // get randomly generated addresses from server
    const { data } = await server.get("balances");

    const formattedBalances = Object.entries(data).map(
      ([address, balance]) => ({ address, balance })
    );
    setAddresses(formattedBalances);
  }

  useEffect(() => {
    // get these addresses when the app loads
    getAddresses();
  }, []);

  return (
    <ChakraProvider>
      <div className="app">
        <Wallet addresses={addresses} />
        <Transfer addresses={addresses} />
      </div>
    </ChakraProvider>
  );
}

export default App;
