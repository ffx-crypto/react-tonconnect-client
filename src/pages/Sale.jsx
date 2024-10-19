import React, { useState } from "react";
import { useTonWallet, useTonConnectUI } from "@tonconnect/ui-react";
import JSalesInput from "../components/JSalesInput/JSalesInput";
import {
  Address,
  beginCell,
  Cell,
  loadMessage,
  storeMessage,
  Transaction,
} from "@ton/core";
import { useTonClient } from "../hooks/useTonClient";

// const waitForTransaction = async (options, client) => {
//   const { hash, refetchInterval = 5000, refetchLimit, address } = options;

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
//       // console.log('state, lastLt, lastHash ', state, lastLt, lastHash);
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

const Sale = () => {
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();
  const [msgHash, setMsgHash] = useState("");
  const [loading, setLoading] = useState(false);
  const { client } = useTonClient();
  const [finalizedTx, setFinalizedTx] = useState(null);

  

  return (
    <div>
      <h1 className="text-center mt-8 text-3xl font-semibold h-24 ">
        Welcome to the Sales Page
      </h1>

      <JSalesInput />
    </div>
  );
};

export default Sale;
