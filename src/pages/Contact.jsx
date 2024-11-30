import React from "react";
import { FaDiscord, FaTelegram, FaGithub } from "react-icons/fa";

const Contact = () => {
  return (
    <div>
      <div className="container mx-auto p-4 lg:w-1/2 md:w-2/3 sm:w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold my-8 text-center">
          Contact Page
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 text-justify"> 
          Use one of the provided links to contact me. If you encountered
          troubles during exchange ton by jettons please send me{" "}
          <b>msg_hash, tx_hash</b> and optionally<b> transaction time</b> and{" "}
          <b>sent comment.</b>
        </p>
      </div>
      <div className="flex  justify-center flex-col items-start w-1/2 md:w-full mx-auto md:flex-row ">
      <div className="text-2xl mx-2">
          <a
            href="https://discord.gg/7XxuvKrs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500 flex"
          >
            <FaDiscord size={33} /><b className="pb-2 px-2">Discord</b>
          </a>
        </div>
        <div className="text-2xl mx-2">
          <a
            href="https://t.me/ffx_on_ton"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 flex"
          >
            <FaTelegram size={32} /><b className="pb-2 px-2">Telegram</b>
          </a>
        </div>
        <div className="text-2xl mx-2">
          <a
            href="https://github.com/acdmft/react-tonconnect-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 flex"
          >
            <FaGithub size={32} /><b className="pb-2 px-2">Github</b>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
