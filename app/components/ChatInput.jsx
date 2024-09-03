import { useState } from 'react';
import { BsSendExclamationFill } from 'react-icons/bs';
const ChatInput = ({ onSendMessage }) => {
  const [message, setMessages] = useState('');

  const handleMessageChange = (e) => {
    setMessages(e.target.value);
  };

  const handleSendMessage = () => {
    const userMessage = message.trim();

    if (userMessage) {
      onSendMessage(userMessage);
      setMessages('');
    }
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          console.log('Enter key pressed');
          handleSendMessage();
        }
      }}
      className="flex gap-2 items-center pt-4"
    >
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Type your message..."
        className="bg-transparent caret-emerald-500 border-b text-dark-text dark:text-light-text border-gray-300 p-2 flex-1 outline-none"
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

export default ChatInput;
