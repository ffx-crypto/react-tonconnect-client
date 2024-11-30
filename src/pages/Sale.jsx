import React, { useState } from "react";
import JSalesInput from "../components/JSalesInput/JSalesInput";

const Sale = () => {
  const oneJettonPrice = import.meta.env.VITE_JETTON_PRICE;
  const minForwardAmount = import.meta.env.VITE_FORWARD_FEE;
  return (
    <div className="container mx-auto p-4 lg:w-1/2 md:w-2/3 sm:w-full">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center my-8">
        Sale Page
      </h1>
      <div className="mb-8 space-y-4">
        <p className="text-base sm:text-lg md:text-xl text-gray-700 text-justify">
          On this page you can exchange <b>ton</b> tokens on <b>FFX jettons</b>.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 text-justify">
          The price of 1 jetton - <b>{oneJettonPrice} ton</b>. You will also need to send a
          minimal forward fees amount equal to - <b>{minForwardAmount} ton</b>, more about this   
          <a
            href="https://docs.ton.org/v3/documentation/smart-contracts/transaction-fees/fees"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500 px-2"
          >
            here.
          </a>
        </p>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 text-justify">
          You can also send a comment with your purchase, so that admin will be able to read. Unlike a transaction comment that is recorded in the TON blockchain, this comment will be inserted in the database.  
        </p>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 text-justify font-bold">
          Don't spend more than you are ready to lose. 
        </p>
      </div>
      <JSalesInput />
    </div>
  );
};

export default Sale;
