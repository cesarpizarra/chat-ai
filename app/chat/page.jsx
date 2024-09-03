'use client';
import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';
import Loader from '../common/Loader';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';

const Form = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const typingControls = useAnimation();

  const handleSendMessage = async (userMessage) => {
    const newUserMessage = { text: userMessage, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Show typing animation before sending request
    await typingControls.start({ opacity: 1, width: '15%' });

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo-0301',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userMessage },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      const data = response.data;

      // Hide typing animation after receiving response
      await typingControls.start({ opacity: 0, width: '0%' });

      // Extract the bot's response from the API data
      const botResponse = {
        text: data.choices[0].message.content,
        isUser: false,
      };

      // Add a delay before showing the actual response
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500); // Adjust the delay as needed
    } catch (error) {
      console.error(
        'Error while fetching data from OpenAI API:',
        error.response.data
      );
      setError(error.response.data.error.message);
      await typingControls.start({ opacity: 0, width: '0%' });
    }
  };

  return (
    <div className="w-full min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="w-full min-h-screen max-w-[1240px] mx-auto px-4 py-8">
        <Link href="/">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-600 dark:text-white">
            KauSAP-AI
          </h1>
        </Link>
        {error && (
          <div role="alert">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              Ooops..
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>{error}</p>
            </div>
          </div>
        )}
        <div className="mt-8">
          <div>
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, width: '0%' }}
            animate={typingControls}
            transition={{ duration: 0.5 }}
            className="h-6 mt-2"
          >
            <Loader />
          </motion.div>

          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Form;
