import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hotel1 from '../assets/kedamawi.1.png';
import hotel2 from '../assets/kedamawi.2.png';
import hotel3 from '../assets/kedamawi.3.png';
import hotel4 from '../assets/kedamawi.4.png';
import hotel5 from '../assets/kedamawi.5.png';

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [hotel1, hotel2, hotel3, hotel4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <>

      <div className="pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center m-4 gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-3xl md:text-4xl font-serif text-gray-900">
              Kedamawi Hotel, <span className="text-amber-800">Dessie</span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
              <a
                href="https://www.google.com/maps/search/?api=1&query=4JVR%2BMF%2C%20Dese"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 font-medium hover:text-amber-800 transition-colors"
              >
                4JVR+MF Dese,
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
            <div className="flex justify-center items-center gap-2 px-4 py-2 bg-white border border-amber-800 rounded-lg shadow-sm">
              <span className="text-gray-700 font-medium">
                {formatDate(today)}
              </span>
              <span className="text-gray-400">-</span>
              <span className="text-gray-700 font-medium">
                {formatDate(tomorrow)}
              </span>
            </div>
            <div className="flex justify-center items-center px-4 py-2 bg-white border border-amber-800 rounded-lg shadow-sm">
              <span className="text-gray-700 font-medium">1 room, 1 guest</span>
            </div>
            <button className="w-full sm:w-auto bg-amber-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-900 transition-colors shadow-sm">
              Book a room
            </button>
          </div>
        </div>
        <hr className="my-6 border-gray-200" />
        {/* image carousel */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden my-6 shadow-sm rounded-xl mx-4 max-w-[calc(100%-2rem)]">
          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Hotel View ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0'
              }`}
            />
          ))}
          <button
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === 0 ? heroImages.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl z-20 transition-colors"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl z-20 transition-colors"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
        {/* reviews section */}
        <div className="flex flex-row my-10">
          <div className="m-4 flex flex-col sm:flex-row items-center gap-4 bg-white border border-gray-200 p-5 rounded-xl shadow-sm w-full sm:max-w-fit hover:shadow-md transition-shadow">
            <img
              src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg"
              alt="Tripadvisor"
              className="h-10 object-contain"
            />
            <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-1">
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-[#00aa6c]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="12" r="12" />
                  </svg>
                ))}
                <svg
                  className="w-6 h-6 text-[#00aa6c]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="11" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-500 mt-1 tracking-wide">
                4.0 out of 5
              </span>
            </div>
            <div>
              <a
                className="font-bold underline text-black-600 hover:text-blue-800 transition-colors"
                href="https://www.tripadvisor.com/Hotel_Review-g2194934-d7248694-Reviews-Hotel_Time_Spa-Dessie_Amhara_Region.html"
              >
                read reviews
              </a>
            </div>
            <div className="w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-4 mt-2 sm:mt-0 text-center sm:text-left">
              <a
                className="font-semibold text-amber-800"
                href="tel:+251914313458"
              >
                Call Us: 091 431 3458
              </a>
            </div>
          </div>
        </div>
        {/* amenities section */}
        <div className="mx-4 my-10 flex flex-col gap-4 bg-white">
          <div>
            <h1 className=" text-center text-3xl font-serif text-amber-800">
              Our amenities
            </h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-2">
            {/* Free WiFi & Internet */}
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7 text-amber-800 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                />
              </svg>
              <span className="text-black font-medium text-lg">
                Free WiFi / Internet
              </span>
            </div>

            {/* Child Friendly */}
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7 text-amber-800 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm3.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Z"
                />
              </svg>
              <span className="text-black font-medium text-lg">
                Child friendly
              </span>
            </div>

            {/* Bar / Lounge */}
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7 text-amber-800 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 3v3a5 5 0 0 0 10 0V3H7zm5 8v10m-3 0h6"
                />
              </svg>
              <span className="text-black font-medium text-lg">
                Bar / Lounge
              </span>
            </div>

            {/* 24 hour desk */}
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7 text-amber-800 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="text-black font-medium text-lg">
                24 hour desk
              </span>
            </div>

            {/* Baggage storage */}
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-7 h-7 text-amber-800 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 8V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3m-8 0h8m-8 0H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2m-8 0v14m8-14v14"
                />
              </svg>
              <span className="text-black font-medium text-lg">
                Baggage storage
              </span>
            </div>
          </div>
        </div>

        {/* Rooms and Suites */}
        <div id="rooms-and-suites" className="mx-4 my-12">
          <h2 className="text-3xl font-serif text-amber-800 text-center mb-8">
            Rooms and Suites
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 1,
                img: hotel3,
                title: 'Standard Room',
                desc: 'A cozy retreat with essential amenities for a relaxing stay.',
              },
              {
                id: 2,
                img: hotel4,
                title: 'Deluxe Room',
                desc: 'Spacious and elegant, featuring premium comfort and a great view.',
              },
              {
                id: 3,
                img: hotel5,
                title: 'Executive Suite',
                desc: 'Luxury redefined with a separate living area and upgraded services.',
              },
              {
                id: 4,
                img: hotel1,
                title: 'Presidential Suite',
                desc: 'The ultimate experience with top-tier luxury, space, and privacy.',
              },
            ].map((room) => (
              <div
                key={room.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <img
                  src={room.img}
                  alt={room.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold font-serif mb-2">
                    {room.title}
                  </h3>
                  <p className="text-gray-600 flex-grow mb-4 text-sm">
                    {room.desc}
                  </p>
                  <button className="w-full bg-amber-800 text-white py-2.5 rounded-lg font-semibold hover:bg-amber-900 transition-colors shadow-sm">
                    Book now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Location Section */}
        <div className="mx-4 my-12 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <h2 className="text-3xl font-serif text-amber-800 text-center my-6">
            Location
          </h2>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-64 md:h-auto min-h-[300px]">
              <iframe
                src="https://maps.google.com/maps?q=4JVR%2BMF%2C%20Dese&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Location"
              ></iframe>
            </div>
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold font-serif mb-4">
                Kedamawi Hotel, Dessie
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                We are conveniently located at the heart of the city, easily
                accessible for all your travel needs.
              </p>
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-amber-800 mt-1 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">Address</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=4JVR%2BMF%2C%20Dese"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-800 hover:text-amber-900 hover:underline transition-colors mt-1"
                  >
                    4JVR+MF Dese
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-amber-800 text-white mt-12 px-6 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div>
              <h3 className="text-2xl font-serif font-extrabold tracking-tight mb-4">Kedamawi Hotel</h3>
              <p className="text-amber-100 text-sm leading-relaxed">
                Experience luxury and comfort in the heart of Dessie. Your premier destination for exceptional hospitality.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-4 tracking-wide uppercase">Contact</h4>
              <ul className="space-y-2 text-amber-100 text-sm">
                <li>📍 4JVR+MF, Dessie, Ethiopia</li>
                <li>📞 <a href="tel:+251914313458" className="hover:text-white transition-colors">091 431 3458</a></li>
                <li>✉️ <a href="mailto:info@kedamawihotel.com" className="hover:text-white transition-colors">info@kedamawihotel.com</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-bold mb-4 tracking-wide uppercase">Company</h4>
              <ul className="space-y-2 text-amber-100 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press & Media</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-4 tracking-wide uppercase">Services</h4>
              <ul className="space-y-2 text-amber-100 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Room Booking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Event Hosting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Restaurant & Bar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Airport Transfer</a></li>
              </ul>
            </div>

          </div>

          <div className="max-w-7xl mx-auto border-t border-amber-700 mt-10 pt-6 text-center text-amber-200 text-sm">
            © {new Date().getFullYear()} Kedamawi Hotel. All rights reserved.
          </div>
        </footer>

      </div>
    </>
  );
}
export default Home;
