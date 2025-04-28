import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

interface EventProps {
  event: {
    names: string[];
    date: Date;
    time: string;
    location: {
      name: string;
      address: string;
    };
    description: string;
    dresscode: string;
    schedule: Array<{
      time: string;
      event: string;
    }>;
    rsvpDeadline: string;
  };
}

const EventDetails: React.FC<EventProps> = ({ event }) => {
  return (
    <section className="animate-fade-in" id="details">
      <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-100">
        <h2 className="text-3xl font-serif text-center text-rose-700 mb-6">Our Special Day</h2>
        
        <p className="text-center text-gray-700 italic mb-8 max-w-2xl mx-auto">
          {event.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white bg-opacity-70 shadow-sm border border-amber-50 transition-transform duration-300 hover:scale-105">
            <Calendar className="w-8 h-8 text-rose-600 mb-2" />
            <h3 className="text-xl font-medium text-gray-800 mb-1">Date</h3>
            <p className="text-gray-700">{formatDate(event.date)}</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white bg-opacity-70 shadow-sm border border-amber-50 transition-transform duration-300 hover:scale-105">
            <Clock className="w-8 h-8 text-rose-600 mb-2" />
            <h3 className="text-xl font-medium text-gray-800 mb-1">Time</h3>
            <p className="text-gray-700">{event.time}</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white bg-opacity-70 shadow-sm border border-amber-50 transition-transform duration-300 hover:scale-105">
            <MapPin className="w-8 h-8 text-rose-600 mb-2" />
            <h3 className="text-xl font-medium text-gray-800 mb-1">Location</h3>
            <p className="text-gray-700 font-medium">{event.location.name}</p>
            <p className="text-gray-600 text-sm">{event.location.address}</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white bg-opacity-70 shadow-sm border border-amber-50 transition-transform duration-300 hover:scale-105">
            <Users className="w-8 h-8 text-rose-600 mb-2" />
            <h3 className="text-xl font-medium text-gray-800 mb-1">Dress Code</h3>
            <p className="text-gray-700">{event.dresscode}</p>
          </div>
        </div>
        
        <div className="mt-12 max-w-lg mx-auto">
          <h3 className="text-2xl font-serif text-center text-rose-700 mb-4">Schedule</h3>
          <div className="space-y-4">
            {event.schedule.map((item, index) => (
              <div 
                key={index} 
                className="flex items-start border-l-2 border-amber-300 pl-4 py-2"
              >
                <div className="min-w-24">
                  <p className="font-medium text-rose-600">{item.time}</p>
                </div>
                <div>
                  <p className="text-gray-800">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-700">
            Please RSVP by <span className="font-medium text-rose-700">{event.rsvpDeadline}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;