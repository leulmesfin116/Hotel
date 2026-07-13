import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hotel3 from '../assets/kedamawi.3.png';
import hotel4 from '../assets/kedamawi.4.png';
import hotel5 from '../assets/kedamawi.5.png';

function Booking() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [hotel3, hotel4, hotel5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-amber-800">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
               </svg>
               <span className="text-xl font-serif text-amber-800 font-bold">Kedamawi Hotel</span>
            </Link>
         </div>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row max-w-7xl mx-auto w-full py-12 px-4 sm:px-6 lg:px-8 gap-12">
        {/* Left side: Images and Text */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 text-amber-800">
            Book a Luxury Room
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Experience the ultimate comfort and elegance. Reserve your stay with us today and enjoy world-class amenities tailored just for you.
          </p>
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
            {heroImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Hotel view ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right side: Form */}
        <div className="lg:w-1/2 flex flex-col justify-center bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
            Your Details
          </h2>
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white shadow-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                <input 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adults</label>
                <input 
                  type="number" 
                  min="1"
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Children (Max 3)</label>
                <input 
                  type="number" 
                  min="0"
                  max="3"
                  value={children}
                  onChange={(e) => setChildren(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white shadow-sm"
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-amber-800 text-white font-semibold py-4 px-6 rounded-lg hover:bg-amber-900 transition-colors shadow-md text-lg"
              >
                Search Rooms
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Booking;
