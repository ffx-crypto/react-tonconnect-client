import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleRedirect= () => {
    navigate("/sale");
  }

  return (
    <div className="container mx-auto p-4 lg:w-1/2 md:w-2/3 sm:w-full">
      <div className="my-6 space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
          Crypto FFX
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-center">
          New Digital Era opportunities.
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 text-justify">
          In today’s rapidly advancing digital landscape, innovative businesses
          must harness the full potential of internet technologies to stay
          competitive, foster sustainable growth, and secure long-term success.
          Blockchain tokens, such as NFTs and Jettons, offer versatile
          applications that redefine traditional business strategies. Here’s how
          these technologies can transform your approach:
        </p>
      </div>
      <div className="space-y-4 mb-8">
        <h3 className="text-xl sm:text-2xl font-semibold text-center">
          Crowdfunding with Blockchain Tokens
        </h3>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 text-justify">
          By tokenizing assets, creators can revolutionize the crowdfunding
          model, offering backers exclusive digital perks such as early access,
          special editions, or unique collectibles. This approach enhances
          transparency, strengthens community engagement, and provides a more
          dynamic way to support creative projects, startups, or charitable
          causes.
        </p>
        <h3 className="text-xl sm:text-2xl font-semibold text-center">
          Boosting Brand Promotion
        </h3>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 text-justify">
          NFTs offer unparalleled opportunities for brands to engage their
          audiences in creative and interactive ways. Whether it’s through
          digital art campaigns, loyalty programs, or gamified experiences,
          brands can use NFTs to tell their story, reward loyal customers, and
          create a buzz in the digital world. These innovative approaches help
          brands stay relevant while fostering deeper connections with their
          audience.
        </p>
        <h3 className="text-xl sm:text-2xl font-semibold text-center">
          Transforming Online Gaming
        </h3>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 text-justify">
          The integration of blockchain tokens in gaming is unlocking
          unprecedented possibilities. Players can own, trade, and use in-game
          assets with real-world value, creating a more immersive and rewarding
          gaming experience. The potential of tokens like Jettons in
          browser-based games is immense, as demonstrated by success stories
          like Hamster Kombat, which leveraged TON tokens to drive player
          engagement and create a thriving gaming ecosystem.
        </p>
      </div>
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-center text-center">
          About this app.
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 text-justify">
          Crypto FFX is an open-source project designed to showcase ICO
          campaign, providing a flexible framework that can be tailored to meet
          your specific needs. On the "Sale" page of Crypto FFX, users can
          seamlessly exchange TON tokens for FFX Jettons, showcasing the
          versatility and simplicity of blockchain-based transactions.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 text-justify">
          <b>Learning and Development:</b> Ideal for those looking to explore
          blockchain technology and token distribution models
        </p>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 text-justify">
          <b>Scalable Solution:</b> Built on the TON Blockchain, known for its
          high performance and decentralized nature.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 text-justify">
          <b>Community Collaboration:</b> Welcoming contributions and testing
          from developers and blockchain enthusiasts worldwide.
        </p>
      </div>
      <div className="flex justify-center">
        <button onClick={handleRedirect} className="w-content bg-blue-500 hover:bg-blue-700 text-xl sm:text-2xl text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Try now</button>
      </div>
      <div className="h-24"></div>
    </div>
  );
};

export default Home;
