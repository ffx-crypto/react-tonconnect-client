import { FaDiscord, FaTelegram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="text-gray-600 p-4 border-t-2 border-gray-400 max-h-8">
      <div className="container mx-auto flex flex-col items-center sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        {/* Creative Commons License */}
        <p className="text-sm">
          © 2024, Licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Creative Commons Attribution 4.0 International
          </a>
        </p>

        {/* Social Media Icons */}
        <div className="flex space-x-4 p-4">
          <a
            href="https://discord.gg/7XxuvKrs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500"
          >
            <FaDiscord size={24} />
          </a>
          <a
            href="https://t.me/ffx_on_ton"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500"
          >
            <FaTelegram size={24} />
          </a>
          <a
            href="https://github.com/acdmft/react-tonconnect-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;