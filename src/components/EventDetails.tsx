import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeScheduleItem, setActiveScheduleItem] = useState<number | null>(null);
  
  // Short version of description for collapsed state
  const shortDescription = event.description.length > 150 
    ? `${event.description.substring(0, 150)}...` 
    : event.description;
  
  // Schedule items with additional details
  const scheduleDetails = [
    "Join us for a beautiful ceremony where we will exchange vows and celebrate our love.",
    "Enjoy drinks and appetizers while mingling with other guests before dinner.",
    "Share a delicious meal followed by speeches, dancing, and memories that will last a lifetime.",
    "As the night comes to a close, we'll say our goodbyes until we meet again."
  ];

  return (
    <section className="animate-fade-in" id="details">
      <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-100">
        <h2 className="text-3xl font-serif text-center text-rose-700 mb-6">Our Special Day</h2>
        
        <div className="text-center mb-8 max-w-2xl mx-auto relative overflow-hidden transition-all duration-500"
          style={{ maxHeight: showFullDescription ? '500px' : '100px' }}
        >
          <p className="text-gray-700 italic">
            {showFullDescription ? event.description : shortDescription}
          </p>
          
          {event.description.length > 150 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="flex items-center justify-center mx-auto mt-2 text-rose-600 hover:text-rose-700 transition-colors gap-1"
            >
              {showFullDescription ? 'Read Less' : 'Read More'}
              {showFullDescription ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
          
          {showFullDescription && (
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white bg-opacity-80 shadow-md border border-amber-50 transition-all duration-300 hover:shadow-lg group">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4 group-hover:bg-rose-200 transition-colors">
              <Calendar className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-1">Date</h3>
            <p className="text-gray-700">{formatDate(event.date)}</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white bg-opacity-80 shadow-md border border-amber-50 transition-all duration-300 hover:shadow-lg group">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4 group-hover:bg-rose-200 transition-colors">
              <Clock className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-1">Time</h3>
            <p className="text-gray-700">{event.time}</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white bg-opacity-80 shadow-md border border-amber-50 transition-all duration-300 hover:shadow-lg group">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4 group-hover:bg-rose-200 transition-colors">
              <MapPin className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-1">Location</h3>
            <p className="text-gray-700 font-medium">{event.location.name}</p>
            <p className="text-gray-600 text-sm">{event.location.address}</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white bg-opacity-80 shadow-md border border-amber-50 transition-all duration-300 hover:shadow-lg group">
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4 group-hover:bg-rose-200 transition-colors">
              <Users className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-1">Dress Code</h3>
            <p className="text-gray-700">{event.dresscode}</p>
          </div>
        </div>
        
        <div className="mt-16 max-w-lg mx-auto">
          <h3 className="text-2xl font-serif text-center text-rose-700 mb-6">Schedule of Events</h3>
          <div className="space-y-4">
            {event.schedule.map((item, index) => (
              <div 
                key={index} 
                className={`border-l-2 pl-4 py-3 transition-all duration-300 ${
                  activeScheduleItem === index ? 'border-rose-500 bg-white bg-opacity-50 rounded-r-lg shadow-sm' : 'border-amber-300'
                }`}
              >
                <div 
                  className="flex items-start cursor-pointer"
                  onClick={() => setActiveScheduleItem(activeScheduleItem === index ? null : index)}
                >
                  <div className="min-w-24">
                    <p className="font-medium text-rose-600">{item.time}</p>
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-800">{item.event}</p>
                  </div>
                  <div className="ml-2">
                    {activeScheduleItem === index ? 
                      <ChevronUp size={16} className="text-rose-600" /> : 
                      <ChevronDown size={16} className="text-gray-400" />
                    }
                  </div>
                </div>
                
                {activeScheduleItem === index && (
                  <div className="mt-2 ml-24 text-gray-600 italic text-sm animate-fade-in">
                    {scheduleDetails[index]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center bg-rose-50 p-6 rounded-lg border border-rose-100">
          <h3 className="text-xl font-serif text-rose-700 mb-2">Please RSVP by</h3>
          <p className="text-gray-700 font-medium text-lg">
            {event.rsvpDeadline}
          </p>
          <div className="mt-4">
            <a
              href="#rsvp"
              className="inline-block px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              RSVP Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;