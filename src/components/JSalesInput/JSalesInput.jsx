import { useEffect, useState } from "react";
import { useTonWallet } from "@tonconnect/ui-react";
import { useTonClient } from "../../hooks/useTonClient";
import AddressDisplay from "./AddressDisplay";
import { useTonTransaction } from "../../hooks/useTonTransaction";

export default function JSalesInput() {
  const [jettonAmount, setJettonAmount] = useState(0);
  const [jettonPrice, setJettonPrice] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const { sendTons, loading, msgHash, finalizedTx } = useTonTransaction();
  const { client } = useTonClient();
  const oneJettonPrice = import.meta.env.VITE_JETTON_PRICE;
  const minterAdminAddr = import.meta.env.VITE_MINTER_ADMIN_ADDRESS;
  const wallet = useTonWallet();

  useEffect(() => {
    const totalPrice = jettonAmount * oneJettonPrice;
    setJettonPrice(parseFloat(totalPrice.toFixed(3)).toString());
    // btnDisabled = jettonAmount > 0;
    setBtnDisabled(jettonAmount == 0);
  }, [jettonAmount]);

  const handleSendTons = async () => {
    await sendTons(jettonPrice, client);
    setJettonAmount(0);
  }

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
          disabled={loading || btnDisabled}
          onClick={handleSendTons}
          className={`w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${btnDisabled ? "bg-blue-300 hover:bg-blue-300" : "bg-blue-500 hover:bg-blue-700"}`}
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
