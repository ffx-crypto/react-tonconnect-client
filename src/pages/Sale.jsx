import React, { useState } from "react";
import { useTonWallet, useTonConnectUI } from "@tonconnect/ui-react";
import JSalesInput from "../components/JSalesInput/JSaleseInput";
import {
  Address,
  beginCell,
  Cell,
  loadMessage,
  storeMessage,
  Transaction,
} from "@ton/core";
import { useTonClient } from "../hooks/useTonClient";

const waitForTransaction = async (options, client) => {
  const { hash, refetchInterval = 1000, refetchLimit, address } = options;

  return new Promise((resolve) => {
    let refetches = 0;
    const walletAddress = Address.parse(address);
    const interval = setInterval(async () => {
      refetches += 1;

      console.log("waiting transaction...");
      const state = await client.getContractState(walletAddress);
      if (!state || !state.lastTransaction) {
        clearInterval(interval);
        resolve(null);
        return;
      }
      const lastLt = state.lastTransaction.lt;
      const lastHash = state.lastTransaction.hash;
      const lastTx = await client.getTransaction(
        walletAddress,
        lastLt,
        lastHash
      );

      if (lastTx && lastTx.inMessage) {
        const msgCell = beginCell()
          .store(storeMessage(lastTx.inMessage))
          .endCell();

        const inMsgHash = msgCell.hash().toString("base64");
        console.log("InMsgHash", inMsgHash);
        if (inMsgHash === hash) {
          clearInterval(interval);
          resolve(lastTx);
        }
      }
      if (refetchLimit && refetches >= refetchLimit) {
        clearInterval(interval);
        resolve(null);
      }
    }, refetchInterval);
  });
};

const Sale = () => {
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();
  const [msgHash, setMsgHash] = useState("");
  const [loading, setLoading] = useState(false);
  const { client } = useTonClient();
  const [finalizedTx, setFinalizedTx] = useState(null);

  const handleSendTon = async (tonAmount) => {
    tonAmount = tonAmount.toString();
    try {
      const tx = {
        // The transaction is valid for 10 minutes from now, in unix epoch seconds.
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
          {
            // The receiver's address.
            address: process.env.REACT_APP_MINTER_ADMIN_ADDRESS,
            // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
            amount: tonAmount, // 0.0005 TON
          },
        ],
      };
      console.log('tx ',tx);
      const result = await tonConnectUi.sendTransaction(tx);
      
      setLoading(true);
      const hash = Cell.fromBase64(result.boc).hash().toString("base64");

      const message = loadMessage(Cell.fromBase64(result.boc).asSlice());
      console.log("Message:", message.body.hash().toString("hex"));
      setMsgHash(hash);
      console.log('address ', tonConnectUi.account?.address);

      if (client) {
        const txFinalized = await waitForTransaction(
          {
            address: tonConnectUi.account?.address ?? "",
            hash: hash,
          },
          client
        );
        setFinalizedTx(txFinalized);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    } 
  };

  return (
    <div>
      <h1 className="text-center mt-8 text-3xl font-semibold h-24 ">
        Welcome to the Sales Page
      </h1>

      {wallet ? (
        <JSalesInput loading={loading} onClick={handleSendTon} />
      ) : (
        <div className=" flex flex-col h-32 justify-center">
          <button
            onClick={() => tonConnectUi.openModal()}
            className="p-4 bg-sky-500 w-content rounded-full text-white font-semibold mx-auto"
          >
            Connect wallet to send the transaction
          </button>
          {/* <h2 className="text-lg text-center text-2xl font-semibold">
            You should connect your wallet first to be able to buy jettons.
          </h2> */}
          {/* <button
            onClick={() => tonConnectUI.openModal()}
            className="p-4 bg-sky-500 w-[12em] rounded-full text-white font-semibold mx-auto"
          >
            Connect Wallet
          </button> */}
        </div>
      )}
    </div>
  );
};

export default Sale;
