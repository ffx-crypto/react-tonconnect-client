import React, { useEffect, useState } from "react";

const JSalesInput = () => {
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const minterAdminAddr = process.env.REACT_APP_MINTER_ADMIN_ADDRESS;
  const jettonPrice = process.env.REACT_APP_JETTON_PRICE;

  const handleSubmit = () => {
    console.log("handleSubmit amount", amount);
  };

  useEffect(() => {
    const totalPrice = amount * jettonPrice;
    setPrice(parseFloat(totalPrice.toFixed(3)));
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
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Send <span className="text-bold text-yellow-400">{price}</span> Ton
      </button>
    </div>
  );
};

export default JSalesInput;
