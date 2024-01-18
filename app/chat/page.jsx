"use client";
import React, { useState } from "react";
import { BsSendExclamationFill } from "react-icons/bs";
import { motion, useAnimation } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import axios from "axios";

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
        isUser ? "bg-cyan-500" : "bg-gray-500"
      }`}
    >
      {message}
    </div>
  </div>
);

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessages] = useState("");

  const handleMessageChange = (e) => {
    setMessages(e.target.value);
  };

  const handleSendMessage = () => {
    const userMessage = message.trim();

    if (userMessage) {
      onSendMessage(userMessage);
      setMessages("");
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
        className="bg-transparent caret-emerald-500 border-b border-gray-300 p-2 flex-1 outline-none"
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
  const typingControls = useAnimation(); // Controls for typing animation

  const handleSendMessage = async (userMessage) => {
    const newUserMessage = { text: userMessage, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Show typing animation before sending request
    await typingControls.start({ opacity: 1, width: "50%" });

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo-0301",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userMessage },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      const data = response.data;

      // Hide typing animation after receiving response
      await typingControls.start({ opacity: 0, width: "0%" });

      // Extract the bot's response 
      const botResponse = {
        text: data.choices[0].message.content,
        isUser: false,
      };

      // Add a delay before showing the actual response
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500); 
    } catch (error) {
      console.error(
        "Error while fetching data from OpenAI API:",
        error.response.data
      );
    }
  };

  return (
    <div
      className={`w-full min-h-screen   ${
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
          <motion.div
            animate={typingControls}
            initial={{ opacity: 0, width: "0%" }}
            transition={{ duration: 0.5 }}
            className="h-6 mt-2 bg-gray-300 rounded-full overflow-hidden"
          />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Form;
