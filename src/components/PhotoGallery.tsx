import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Image {
  url: string;
  alt: string;
}

interface PhotoGalleryProps {
  images: Image[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  return (
    <section className="my-16" id="gallery">
      <h2 className="text-3xl font-serif text-center text-rose-700 mb-8">Our Moments</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={image.url} 
              alt={image.alt}
              className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white bg-rose-700 rounded-full p-1"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          <div 
            className="max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.url} 
              alt={selectedImage.alt}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;