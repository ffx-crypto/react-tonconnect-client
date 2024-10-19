import React, { useEffect, useState, useCallback } from "react";
import {
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
// import {
//   Address,
//   beginCell,
//   Cell,
//   loadMessage,
//   storeMessage,
//   Transaction,
// } from "@ton/core";
// import { useTonClient } from "../../hooks/useTonClient";
import { TonClient } from "@ton/ton";
import { toNano } from "@ton/core";

// const waitForTransaction = async (options, client) => {
//   const { hash, refetchInterval = 1000, refetchLimit, address } = options;

//   return new Promise((resolve) => {
//     let refetches = 0;
//     const walletAddress = Address.parse(address);
//     const interval = setInterval(async () => {
//       refetches += 1;

//       console.log("waiting transaction...");
//       const state = await client.getContractState(walletAddress);
//       if (!state || !state.lastTransaction) {
//         clearInterval(interval);
//         resolve(null);
//         return;
//       }
//       const lastLt = state.lastTransaction.lt;
//       const lastHash = state.lastTransaction.hash;
//       const lastTx = await client.getTransaction(
//         walletAddress,
//         lastLt,
//         lastHash
//       );

//       if (lastTx && lastTx.inMessage) {
//         const msgCell = beginCell()
//           .store(storeMessage(lastTx.inMessage))
//           .endCell();

//         const inMsgHash = msgCell.hash().toString("base64");
//         console.log("InMsgHash", inMsgHash);
//         if (inMsgHash === hash) {
//           clearInterval(interval);
//           resolve(lastTx);
//         }
//       }
//       if (refetchLimit && refetches >= refetchLimit) {
//         clearInterval(interval);
//         resolve(null);
//       }
//     }, refetchInterval);
//   });
// };

const JSalesInput = ({ onClick, loading }) => {
  const [amount, setAmount] = useState(0);
  // const defaultTx = {
  //   // The transaction is valid for 10 minutes from now, in unix epoch seconds.
  //   validUntil: Math.floor(Date.now() / 1000) + 600,
  //   messages: [
  //     {
  //       // The receiver's address.
  //       address: import.meta.env.REACT_APP_MINTER_ADMIN_ADDRESS,
  //       // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
  //       amount: amount, // 0.0005 TON
  //     },
  //   ],
  // };
  const [price, setPrice] = useState("");
  const minterAdminAddr = import.meta.env.VITE_MINTER_ADMIN_ADDRESS;
  const jettonPrice = import.meta.env.VITE_JETTON_PRICE;

  // const [tx, setTx] = useState(defaultTx);
  const [finalizedTx, setFinalizedTx] = useState(null);
  // const [msgHash, setMsgHash] = useState("");
  // const [loading, setLoading] = useState(false);
  // const { client } = useTonClient();

  const wallet = useTonWallet();

  const [tonConnectUi] = useTonConnectUI();

  // const onChange = useCallback((value) => {
  //   setTx(value.updated_src);
  // }, []);

  const handleSubmit = async () => {
    await onClick(toNano(price));
    console.log("handleSubmit amount", amount);
  };

  useEffect(() => {
    const totalPrice = amount * jettonPrice;
    setPrice(parseFloat(totalPrice.toFixed(3)));
    console.log('price ', price);
  }, [amount]);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* Image and Address */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="token-ffx-logo.webp"
          alt="Jetton logo"
          className="w-24 h-24 rounded-full object-cover mb-2"
        />
        <p className="text-gray-700 text-lg font-semibold text-center">
          {minterAdminAddr}
        </p>
      </div>

      {/* Input for Jettons */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="amount"
        >
          Amount of Jettons
        </label>
        <input
          type="number"
          id="amount"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Enter amount"
          min="0"
        />
      </div>

      {/* Send Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {loading ? (
          <>Loading ...</>
        ) : (
          <>
            Send <span className="text-bold text-yellow-400">{price}</span> Ton
          </>
        )}
      </button>
    </div>
  );
};

export default JSalesInput;
