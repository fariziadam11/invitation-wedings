import React from 'react';
import { MapPin } from 'lucide-react';

interface MapEmbedProps {
  location: {
    name: string;
    address: string;
    googleMapsUrl: string;
  };
}

const MapEmbed: React.FC<MapEmbedProps> = ({ location }) => {
  return (
    <section className="my-16" id="location">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-rose-700 mb-4">Location</h2>
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="text-rose-600" size={18} />
          <p className="font-medium text-gray-800">{location.name}</p>
        </div>
        <p className="text-gray-600">{location.address}</p>
      </div>
      
      <div className="overflow-hidden rounded-xl shadow-xl border-4 border-white">
        <iframe
          src={location.googleMapsUrl}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Event Location"
          className="max-w-full"
        ></iframe>
      </div>
    </section>
  );
};

export default MapEmbed;