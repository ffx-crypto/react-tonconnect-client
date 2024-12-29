import { useState } from "react";
import {
  Address,
  beginCell,
  Cell,
  loadMessage,
  storeMessage,
  toNano,
} from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { UserRejectsError } from "@tonconnect/sdk";

export const useTonTransaction = () => {
  const [finalizedTx, setFinalizedTx] = useState(null);
  const [msgHash, setMsgHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [tonConnectUi] = useTonConnectUI();
  const [responseMsg, setResponseMessage] = useState("");
  const [responseError, setResponseError] = useState("");
  const fees = import.meta.env.VITE_FORWARD_FEE;

  const waitForTransaction = async (options, client) => {
    const { hash, refetchInterval = 1000, refetchLimit, address } = options;
    return new Promise((resolve) => {
      let refetches = 0;
      const walletAddress = Address.parse(address);
      const interval = setInterval(async () => {
        refetches += 1;

        console.log("waiting transaction...");
        const state = await client.getContractState(walletAddress);
        console.log("state ", state); // should i use state.lastTransaction.hash instead of finalizedTx ?
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
          console.log(
            "InMsgHash, InMsgHash hex",
            inMsgHash,
            msgCell.hash().toString("hex")
          );
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
    const msg_value = toNano(fees) + toNano(tonAmount); 
    const payload = beginCell()
                    .storeUint(0xea06185d, 32)
                    .storeUint(0, 64)
                    .storeCoins(1n)
                    .storeCoins(toNano(tonAmount))
                    .endCell();
    const tx = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          address: import.meta.env.VITE_JETTON_MINTER_ADDRESS,
          amount: msg_value.toString(),
          payload: payload.toBoc().toString('base64')
        },
      ],
    };
    try {
      const result = await tonConnectUi.sendTransaction(tx);
      setLoading(true);
      const hash = Cell.fromBase64(result.boc).hash().toString("base64");

      // const message = loadMessage(Cell.fromBase64(result.boc).asSlice());
      console.log("hash ", hash);
      // console.log("Message:", message.body.hash().toString("hex"));
      setMsgHash(hash);
      console.log("address ", tonConnectUi.account?.address);
      if (client) {
        const txFinalized = await waitForTransaction(
          {
            address: tonConnectUi.account?.address ?? "",
            refetchInterval: 5000,
            refetchLimit: 7,
            hash: hash,
          },
          client
        );
        if (txFinalized) {
          setFinalizedTx(txFinalized);
          // const txHash = txFinalized.hash().toString('base64');
          // console.log('txFinalized ', txFinalized);
          console.log('txHash.toString("hex") ', txFinalized.hash().toString('hex'));
          // await sendTxHash(hash, txHash, comment);
        }
      }
    } catch (e) {
      if (e instanceof UserRejectsError) {
        console.error(e);
      } else {
        setResponseError(`Error during sending transaction: ${e}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const sendTxHash = async (hash, txHash, comment) => {
    const api_url = import.meta.env.VITE_API_BASE_URL;

    try {
      const response = await fetch(`${api_url}/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msgHash: hash,
          txHash: txHash,
          comment: comment,
        }),
      });

      if (response.status === 404) {
        setResponseError("Transaction not cofirmed. Contact administrator.");
      } else if (response.status === 500) {
        setResponseError("Server error. Contact administrator.");
      } else if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message); // assuming { message: 'Transaction successful' }
      } else {
        setResponseError("Unexpected error occurred. Contact administrator.");
      }
    } catch (error) {
      setResponseError("Failed to connect to the server. Contact administrator.");
      console.error("Request error:", error);
    }
  };

  return {
    sendTons,
    loading,
    msgHash,
    finalizedTx,
    responseMsg,
    responseError,
    setResponseError,
    setResponseMessage,
  };
};
