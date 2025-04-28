import React from 'react';
import { MessageSquareQuote } from 'lucide-react';

interface Message {
  name: string;
  relationship: string;
  message: string;
}

interface GuestbookProps {
  messages: Message[];
}

const Guestbook: React.FC<GuestbookProps> = ({ messages }) => {
  return (
    <section className="my-16" id="guestbook">
      <h2 className="text-3xl font-serif text-center text-rose-700 mb-8">Wishes & Blessings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-amber-100 transition-all duration-300 hover:shadow-lg hover:bg-opacity-100"
          >
            <div className="flex items-start">
              <MessageSquareQuote className="text-amber-400 mr-3 mt-1 flex-shrink-0" size={20} />
              <p className="text-gray-700 italic mb-4">{message.message}</p>
            </div>
            <div className="text-right">
              <p className="text-rose-700 font-medium">{message.name}</p>
              <p className="text-gray-500 text-sm">{message.relationship}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Guestbook;