import React, { useState } from 'react';
import { Check, X, Send, Plus, Minus } from 'lucide-react';

interface RsvpFormProps {
  deadline: string;
  onSubmit: () => void;
}

const RsvpForm: React.FC<RsvpFormProps> = ({ deadline, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dietaryRestrictions: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log({
      attending,
      guestCount,
      ...formData
    });
    
    setSubmitted(true);
    onSubmit();
    
    // Reset form after animation
    setTimeout(() => {
      setStep(1);
      setAttending(null);
      setGuestCount(1);
      setFormData({
        name: '',
        email: '',
        dietaryRestrictions: '',
        message: ''
      });
    }, 5000);
  };
  
  if (submitted) {
    return (
      <section id="rsvp" className="py-16">
        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-100 max-w-xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
              <Check size={32} />
            </div>
            <h2 className="text-3xl font-serif text-rose-700 mb-4">Thank You!</h2>
            <p className="text-gray-700 mb-6">
              Your RSVP has been received. We're looking forward to celebrating with you!
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="rsvp" className="py-16">
      <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-amber-100 max-w-xl mx-auto">
        <h2 className="text-3xl font-serif text-center text-rose-700 mb-8">RSVP</h2>
        
        <p className="text-center text-gray-700 mb-8">
          Please respond by <span className="font-medium text-rose-700">{deadline}</span>
        </p>
        
        <div className="mb-8">
          <div className="flex justify-between items-center relative">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  i <= step 
                    ? 'bg-rose-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i}
              </div>
            ))}
            <div className="absolute left-0 top-1/2 h-1 bg-gray-200 -z-10 w-full transform -translate-y-1/2"></div>
            <div 
              className="absolute left-0 top-1/2 h-1 bg-rose-600 -z-10 transform -translate-y-1/2 transition-all duration-500"
              style={{ width: `${(step - 1) * 50}%` }}
            ></div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-serif text-rose-700 text-center mb-6">Will you be attending?</h3>
              
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setAttending(true);
                    setStep(2);
                  }}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border transition-all duration-300 ${
                    attending === true 
                      ? 'bg-rose-600 text-white border-rose-600' 
                      : 'bg-white border-gray-300 hover:border-rose-300'
                  }`}
                >
                  <Check size={18} />
                  <span>Joyfully Accept</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setAttending(false);
                    setStep(3);
                  }}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border transition-all duration-300 ${
                    attending === false 
                      ? 'bg-gray-600 text-white border-gray-600' 
                      : 'bg-white border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <X size={18} />
                  <span>Regretfully Decline</span>
                </button>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Number of Guests</label>
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-16 text-center text-xl">{guestCount}</span>
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Back
                </button>
                
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              {attending && (
                <div className="mb-6">
                  <label htmlFor="dietaryRestrictions" className="block text-gray-700 mb-2">Dietary Restrictions</label>
                  <input
                    type="text"
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                    placeholder="Please let us know of any allergies or restrictions"
                  />
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">Message for the Couple</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="Share your well wishes or a special message"
                ></textarea>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(attending ? 2 : 1)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors flex items-center gap-2"
                >
                  <Send size={16} />
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default RsvpForm;