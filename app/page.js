'use client';
import Link from 'next/link';
import Image from 'next/image';
import robot from './assets/robot.webp';
import { useTheme } from './context/ThemeProvider';
import SliderToggle from './components/SliderToggle';

export default function Page() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="w-full h-screen px-4 bg-light-bg dark:bg-dark-bg flex flex-col items-center justify-center">
      <div className="md:flex justify-center items-center ">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={robot}
            alt="Robot Image"
            priority={true}
            className="w-72 md:w-full bounce drop-shadow-lg"
          />
          <SliderToggle selected={theme} setSelected={toggleTheme} />
        </div>
        <div className="w-full flex flex-col items-center md:items-start">
          <h1 className="text-center md:text-start font-bold text-dark-text dark:text-light-text text-4xl md:text-7xl py-2">
            Welcome to KauSAP-AI
          </h1>

          <p className="text-center md:text-left text-md md:text-lg font-semibold text-gray-500 py-2">
            Explore the power of conversational AI with our friendly chat bot.
            Feel free to ask questions and get the information you need.
          </p>
          <Link href="/chat">
            <button className=" py-2 bg-cyan-600 px-4 rounded text-white font-semibold hover:bg-cyan-700">
              Start Chatting
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
