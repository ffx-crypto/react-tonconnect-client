import React, { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

const AddressDisplay = ({ address }) => {
  const [showCopyIcon, setShowCopyIcon] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    console.log('handleCopy');
  };
  const handleMouseUp = () => {
    setCopied(false);
  };
  const handleMouseDown = () => {
    setCopied(true);
  }

  const truncatedAddress = `${address.slice(0, 8)}...${address.slice(-8)}`;

  return (
    <div
      className="relative inline-flex items-center space-x-2 text-gray-800 hover:text-gray-600 cursor-pointer"
      onMouseEnter={() => setShowCopyIcon(true)}
      onMouseLeave={() => setShowCopyIcon(false)}
      onClick={handleCopy}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      

    >
      <span className="text-base pr-4 font-mono">{truncatedAddress}</span>
      
        {showCopyIcon && (
          <span className=" absolute -right-2 mr-12">
            {copied ? (
              <>
                <FaCheck className="" />
              </>
            ) : (
              <>
                <FaCopy className="text-gray-500 hover:text-gray-800" />
              </>
            )}
          </span>
        )}
      
    </div>
  );
};

export default AddressDisplay;
