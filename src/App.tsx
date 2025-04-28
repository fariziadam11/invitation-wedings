import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EventDetails from './components/EventDetails';
import CountdownTimer from './components/CountdownTimer';
import MapEmbed from './components/MapEmbed';
import PhotoGallery from './components/PhotoGallery';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import { eventData } from './data/eventData';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add page load animation
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-rose-50 to-amber-50 text-gray-800 font-light transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <MusicPlayer audioUrl={eventData.audioUrl} />
      <Header title={eventData.title} subtitle={eventData.subtitle} />
      
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-16 sm:space-y-24">
        <EventDetails event={eventData} />
        <CountdownTimer targetDate={eventData.date} />
        <MapEmbed location={eventData.location} />
        <PhotoGallery images={eventData.galleryImages} />
        <Guestbook messages={eventData.guestbookMessages} />
      </main>
      
      <Footer 
        names={eventData.names} 
        date={eventData.date} 
        websiteUrl={eventData.websiteUrl} 
      />
    </div>
  );
}

export default App;