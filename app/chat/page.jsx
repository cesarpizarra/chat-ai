"use client";
import React, { useState } from "react";
import { BsSendExclamationFill } from "react-icons/bs";
import { motion } from "framer-motion";
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

const ChatMessage = ({ message, isUser }) => (
  <div className={`flex  ${isUser ? "justify-end py-6" : "justify-start"}`}>
    <div
      className={`bg-blue-500 text-white p-2 rounded-lg ${
        isUser ? "bg-cyan-500" : "bg-gray-300"
      }`}
    >
      {message}
    </div>
  </div>
);

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          console.log("Enter key pressed");
          handleSendMessage();
        }
      }}
      className="flex gap-2 items-center pt-4"
    >
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Ask a question..."
        className="border-2 border-gray-300 p-2 flex-1 rounded-l-md text-black outline-none"
      />

      <div
        onClick={handleSendMessage}
        className="bg-cyan-500  p-3 rounded-md text-white"
      >
        <BsSendExclamationFill />
      </div>
    </div>
  );
};

const Form = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState("light");

  const handleSendMessage = (userMessage) => {
    const newUserMessage = { text: userMessage, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = { text: "Bot response...", isUser: false };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 500);
  };

  return (
    <div
      className={`w-full h-screen   ${
        selected === "light" ? "bg-white" : "bg-slate-900 text-white"
      }`}
    >
      <div className="w-full min-h-screen max-w-[1240px] mx-auto px-4 py-8 ">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-600">
            ChatMind AI
          </h1>
          <div>
            <SliderToggle selected={selected} setSelected={setSelected} />
          </div>
        </div>
        <div className="mt-8">
          <div>
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
            ))}
          </div>
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Form;
