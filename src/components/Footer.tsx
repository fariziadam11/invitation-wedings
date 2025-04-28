import React from 'react';
import { Heart, QrCode } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

interface FooterProps {
  names: string[];
  date: Date;
  websiteUrl: string;
}

const Footer: React.FC<FooterProps> = ({ names, date, websiteUrl }) => {
  return (
    <footer className="bg-rose-700 text-white py-10">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <span className="text-lg">{names[0]}</span>
          <Heart className="text-amber-400 fill-amber-400" size={16} />
          <span className="text-lg">{names[1]}</span>
        </div>
        
        <p className="mb-6">{formatDate(date)}</p>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 flex items-center justify-center">
            <QrCode size={20} className="mr-2" /> Save This Invitation
          </h3>
          <p className="text-sm text-rose-200">Scan this QR code to save this page to your phone</p>
          
          <div className="bg-white p-4 rounded-lg inline-block mt-2">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(websiteUrl)}`} 
              alt="QR Code to Website" 
              className="w-32 h-32"
            />
          </div>
        </div>
        
        <p className="text-rose-200 text-sm">
          &copy; {new Date().getFullYear()} • Created with love for our special day
        </p>
      </div>
    </footer>
  );
};

export default Footer;