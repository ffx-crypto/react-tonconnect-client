import { useState, useEffect } from "react";
import {
    Address,
    beginCell,
    Cell,
    loadMessage,
    storeMessage,
    toNano,
  } from "@ton/core";
  import { useTonConnectUI } from "@tonconnect/ui-react";

export const useTonTransaction = () => {
  const [finalizedTx, setFinalizedTx] = useState(null);
  const [msgHash, setMsgHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [tonConnectUi] = useTonConnectUI();

  const waitForTransaction = async (options, client) => {
    const { hash, refetchInterval = 1000, refetchLimit, address } = options;
    return new Promise((resolve) => {
      let refetches = 0;
      const walletAddress = Address.parse(address);
      const interval = setInterval(async () => {
        refetches += 1;

        console.log("waiting transaction...");
        const state = await client.getContractState(walletAddress);
        console.log("state ", state);
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
          console.log("InMsgHash hex", msgCell.hash().toString("hex"));
          if (inMsgHash === hash) {
            clearInterval(interval);
            resolve(lastTx);
          }
        }
        if (refetchLimit && refetches >= refetchLimit) {
          clearInterval(interval);
          resolve(lastTx);
        }
      }, refetchInterval);
    });
  };

  const sendTons = async (tonAmount, client) => {
    const tx = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          address: import.meta.env.VITE_MINTER_ADMIN_ADDRESS,
          amount: toNano(tonAmount).toString(),
        },
      ],
    };
    try {
      const result = await tonConnectUi.sendTransaction(tx);
      setLoading(true);
      const hash = Cell.fromBase64(result.boc).hash().toString("base64");

      const message = loadMessage(Cell.fromBase64(result.boc).asSlice());
      console.log("hash ", hash);
      console.log("Message:", message.body.hash().toString("hex"));
      setMsgHash(hash);
      console.log("address ", tonConnectUi.account?.address);
      if (client) {
        const txFinalized = await waitForTransaction(
          {
            address: tonConnectUi.account?.address ?? "",
            refetchInterval: 3000,
            refetchLimit: 10,
            hash: hash,
          },
          client
        );
        if (txFinalized) {
            setFinalizedTx(txFinalized);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    sendTons,
    loading,
    msgHash,
    finalizedTx,
  };
};
