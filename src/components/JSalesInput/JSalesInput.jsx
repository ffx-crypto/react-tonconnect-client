import { useEffect, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useTonClient } from "../../hooks/useTonClient";
import AddressDisplay from "./AddressDisplay";
import { useTonTransaction } from "../../hooks/useTonTransaction";

export default function JSalesInput() {
  const [jettonAmount, setJettonAmount] = useState(0);
  const [jettonPrice, setJettonPrice] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [comment, setComment] = useState("");
  const { sendTons, loading, msgHash, finalizedTx, responseMsg, responseError } = useTonTransaction();
  const { client } = useTonClient();
  const oneJettonPrice = import.meta.env.VITE_JETTON_PRICE;
  const minterAdminAddr = import.meta.env.VITE_MINTER_ADMIN_ADDRESS;
  const wallet = useTonWallet();

  useEffect(() => {
    const totalPrice = jettonAmount * oneJettonPrice;
    setJettonPrice(parseFloat(totalPrice.toFixed(3)).toString());
    const isBtnDisabled = jettonAmount == 0 || comment.length > 232;
    setBtnDisabled(isBtnDisabled);
  }, [jettonAmount, comment]);

  const handleSendTons = async () => {
    await sendTons(jettonPrice, client, comment);
    setJettonAmount(0);
  };

  const handleTextAreaChange = (e) => {
    if (e.target.value.length <= 232) {
      setComment(e.target.value);
    } else {
      setBtnDisabled(true);
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
        <span className="text-sm text-gray-400 font-semibold">
          Minter address:
        </span>
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

      {/* SEND | CONNECT BUTTON */}
      {wallet ? (
        <button
          disabled={loading || btnDisabled}
          onClick={handleSendTons}
          className={`w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            btnDisabled
              ? "bg-blue-300 hover:bg-blue-300"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
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

      {/* MESSAGE HASH | TEXTAREA */}
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
        <>
          <textarea
            value={comment} // Bind the textarea value to state
            onChange={handleTextAreaChange} // Update state on change
            rows="4"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 mt-4"
            placeholder="Type your message here..."
          ></textarea>
        </>
      )}

      {/* RESULT | ERROR MESSAGE */}
      {responseMsg ? (
        <div className="mt-4 border-l-4 border-blue-600 text-center text-blue-700 font-mono">
          {responseMsg}
        </div>
      ) : (
        <></>
      )}
      {responseError ? (
        <div className="mt-4 border-l-4 border-rose-500 text-center text-rose-600 font-mono">
          {responseError}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
