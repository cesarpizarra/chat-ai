"use client";
import Link from "next/link";
import Image from "next/image";
import robot from "./assets/robot.webp";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

const SliderToggle = ({ selected, setSelected }) => {
  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "light" ? "text-white" : "text-slate-300"
        }`}
        onClick={() => {
          setSelected("light");
        }}
      >
        <FiMoon className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Light</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "dark" ? "text-white" : "text-slate-800"
        }`}
        onClick={() => {
          setSelected("dark");
        }}
      >
        <FiSun className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Dark</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};

export default function Page() {
  const [selected, setSelected] = useState("light");
  return (
    <div
      className={`w-full h-screen  px-4 flex flex-col items-center justify-center ${
        selected === "light" ? "bg-white" : "bg-slate-900 text-white"
      }`}
    >
      <div className="md:flex justify-center items-center relative">
        <div className="absolute top-[-150px]  md:top-0 right-0">
          <SliderToggle selected={selected} setSelected={setSelected} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={robot}
            alt="Robot Image"
            priority={true}
            className="w-72 md:w-full bounce drop-shadow-lg"
          />
        </div>
        <div className="w-full flex flex-col items-center md:items-start ">
          <h1 className="text-center md:text-start font-bold text-4xl md:text-7xl py-2">
            Welcome to ChatMind AI
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
