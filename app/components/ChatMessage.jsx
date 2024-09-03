const ChatMessage = ({ message, isUser }) => (
  <div className={`flex  ${isUser ? 'justify-end py-6' : 'justify-start'}`}>
    <div
      className={` text-white p-2 rounded-lg ${
        isUser ? 'bg-cyan-500' : 'bg-gray-500'
      }`}
    >
      {message}
    </div>
  </div>
);

export default ChatMessage;
