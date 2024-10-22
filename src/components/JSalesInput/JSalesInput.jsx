import { useCallback, useState } from "react";
import {
  
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import {
  Address,
  beginCell,
  Cell,
  loadMessage,
  storeMessage,
} from "@ton/core";
import { useTonClient } from "../../hooks/useTonClient";


// In this example, we are using a predefined smart contract state initialization (`stateInit`)
// to interact with an "EchoContract". This contract is designed to send the value back to the sender,
// serving as a testing tool to prevent users from accidentally spending money.
const defaultTx= {
  // The transaction is valid for 10 minutes from now, in unix epoch seconds.
  validUntil: Math.floor(Date.now() / 1000) + 600,
  messages: [
    {
      // The receiver's address.
      address: "UQDrwH5ivaR3Vf6C7Grq_sbhcXZnrAo9ZZaz0jn6GEI3gziW",
      // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
      amount: "1555440", // 0.0005 TON
      // (optional) State initialization in boc base64 format.
      // stateInit:
      //   "te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==",
      // (optional) Payload in boc base64 format.
      // payload: "te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g==",
    },

    // Uncomment the following message to send two messages in one transaction.
    /*
    {
      // Note: Funds sent to this address will not be returned back to the sender.
      address: 'UQAuz15H1ZHrZ_psVrAra7HealMIVeFq0wguqlmFno1f3B-m',
      amount: toNano('0.01').toString(),
    }
    */
  ],
};



const waitForTransaction = async (
  options, client) => {
  const { hash, refetchInterval = 1000, refetchLimit, address } = options;

  return new Promise((resolve) => {
    let refetches = 0;
    const walletAddress = Address.parse(address);
    const interval = setInterval(async () => {
      refetches += 1;

      console.log("waiting transaction...");
      const state = await client.getContractState(walletAddress);
      console.log('state ', state);
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

export default function JSalesInput() {
  const [tx, setTx] = useState(defaultTx);
  const [finalizedTx, setFinalizedTx] = useState(null);
  const [msgHash, setMsgHash] = useState("");
  const [loading, setLoading] = useState(false);
  const { client } = useTonClient();

  const wallet = useTonWallet();

  const [tonConnectUi] = useTonConnectUI();

  // const { waitForTransaction } = useWaitForTransaction(client!!);

  const onChange = useCallback((value) => {
    setTx(value.updated_src);
  }, []);

  const handleSendTons = async () => {
            
    try {
      const result = await tonConnectUi.sendTransaction(tx);
      setLoading(true);
      const hash = Cell.fromBase64(result.boc)
        .hash()
        .toString("base64");

      const message = loadMessage(
        Cell.fromBase64(result.boc).asSlice()
      );
      console.log('hash ', hash);
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
  }

  return (
    <div className="send-tx-form">
      <h3>Configure and send transaction</h3>

      

      {wallet ? (
        <button
          disabled={loading}
          onClick={handleSendTons}
        >
          {loading ? "Loading..." : "Send transaction"}
        </button>
      ) : (
        <button onClick={() => tonConnectUi.openModal()}>
          Connect wallet to send the transaction
        </button>
      )}
      <div>Sending Tx Message Hash: {msgHash}</div>
      <div>Sending Tx Hash: {finalizedTx?.hash().toString('hex')}</div>
    </div>
  );
}
