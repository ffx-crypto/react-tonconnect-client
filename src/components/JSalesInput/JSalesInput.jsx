import { useCallback, useEffect, useState } from "react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import {
  Address,
  beginCell,
  Cell,
  loadMessage,
  storeMessage,
  toNano,
} from "@ton/core";
import { useTonClient } from "../../hooks/useTonClient";
import AddressDisplay from "./AddressDisplay";

// In this example, we are using a predefined smart contract state initialization (`stateInit`)
// to interact with an "EchoContract". This contract is designed to send the value back to the sender,
// serving as a testing tool to prevent users from accidentally spending money.

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
        resolve(null);
      }
    }, refetchInterval);
  });
};

export default function JSalesInput() {
  const [jettonAmount, setJettonAmount] = useState(0);
  const [jettonPrice, setJettonPrice] = useState(0);
  // const defaultTx = {
  //   // The transaction is valid for 10 minutes from now, in unix epoch seconds.
  //   validUntil: Math.floor(Date.now() / 1000) + 600,
  //   messages: [
  //     {
  //       // The receiver's address.
  //       address: "UQDrwH5ivaR3Vf6C7Grq_sbhcXZnrAo9ZZaz0jn6GEI3gziW",
  //       // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
  //       amount: jettonPrice, //
  //     },
  //   ],
  // };
  // const [tx, setTx] = useState(defaultTx);
  const [finalizedTx, setFinalizedTx] = useState(null);
  const [msgHash, setMsgHash] = useState("");
  const [loading, setLoading] = useState(false);
  const { client } = useTonClient();
  const oneJettonPrice = import.meta.env.VITE_JETTON_PRICE;
  const minterAdminAddr = import.meta.env.VITE_MINTER_ADMIN_ADDRESS;
  const wallet = useTonWallet();

  const [tonConnectUi] = useTonConnectUI();

  // const { waitForTransaction } = useWaitForTransaction(client!!);

  // const onChange = useCallback((value) => {
  //   setTx(value.updated_src);
  // }, []);

  useEffect(() => {
    const totalPrice = jettonAmount * oneJettonPrice;
    setJettonPrice(parseFloat(totalPrice.toFixed(3)).toString());
  }, [jettonAmount]);

  const handleSendTons = async () => {
    const tx = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          address: import.meta.env.VITE_MINTER_ADMIN_ADDRESS,
          amount: toNano(jettonPrice).toString(),
        },
      ],
    };
    console.log("tx ", tx);
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
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* Image and Address */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="token-ffx-logo.webp"
          alt="Jetton logo"
          className="w-24 h-24 rounded-full object-cover mb-2"
        />
        <div className="text-gray-700 text-lg font-semibold text-center">
          <AddressDisplay address={minterAdminAddr} />
        </div>
      </div>

      {/* Input for Jettons */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="amount"
        ></label>
        <input
          type="number"
          id="amount"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={jettonAmount}
          onChange={(e) => setJettonAmount(parseFloat(e.target.value))}
          placeholder="Enter amount"
          min="0"
        />
      </div>

      {wallet ? (
        <button
          disabled={loading}
          onClick={handleSendTons}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? (
            "Loading..."
          ) : (
            <>
              Send{" "}
              <span className="text-yellow-300 font-bold">{jettonPrice}</span>{" "}
              ton
            </>
          )}
        </button>
      ) : (
        <button
          onClick={() => tonConnectUi.openModal()}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Connect wallet to send the transaction
        </button>
      )}
      {msgHash ? (
        <>
          <div className="mt-4">
            <p className="text-gray-400 font-bold">Sending Tx Message Hash:</p>
            <p className="break-words">{msgHash}</p>
          </div>
          {finalizedTx ? (
            <>
              <div className="mt-2">
                <p className="text-gray-400 font-bold">Sending Tx Hash:</p>
                <p className="break-words">
                  {finalizedTx?.hash().toString("hex")}
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
