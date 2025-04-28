import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EventDetails from './components/EventDetails';
import CountdownTimer from './components/CountdownTimer';
import MapEmbed from './components/MapEmbed';
import PhotoGallery from './components/PhotoGallery';
import Guestbook from './components/Guestbook';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import RsvpForm from './components/RsvpForm';
import Confetti from './components/Confetti';
import { eventData } from './data/eventData';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Add page load animation with a slight delay for better effect
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Trigger confetti on special interactions
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-rose-50 to-amber-50 text-gray-800 font-light transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {showConfetti && <Confetti />}
      <MusicPlayer audioUrl={eventData.audioUrl} />
      <Header title={eventData.title} subtitle={eventData.subtitle} />
      
      <HeroSection names={eventData.names} date={eventData.date} />
      
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-16 sm:space-y-24">
        <EventDetails event={eventData} />
        <CountdownTimer targetDate={eventData.date} />
        <MapEmbed location={eventData.location} />
        <PhotoGallery images={eventData.galleryImages} />
        <Guestbook messages={eventData.guestbookMessages} />
        <RsvpForm deadline={eventData.rsvpDeadline} onSubmit={triggerConfetti} />
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