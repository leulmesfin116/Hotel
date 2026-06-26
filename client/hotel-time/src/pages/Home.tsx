import { useRef } from 'react';
import hotel1 from '../assets/hotel1.png';
import hotel2 from '../assets/hotel2.png';
import hotel3 from '../assets/hotel3.png';
import hotel4 from '../assets/hotel4.png';

function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; // Scroll by roughly one image width
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header className="m-3">
        <h1 className="text-4xl font-serif text-amber-500 ">Hotel Time </h1>
      </header>
      <hr></hr>
      <div>
        <div className="flex flex-col m-4">
          <h2 className="font-bold text-xl font-serif">Hotel time ,Dessie</h2>
          <a
            href="https://www.google.com/maps/search/?api=1&query=4JVV%2BP5Q%2C%201%2C%20Dese"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-black-600 hover:text-blue-800 transition-colors"
          >
            4JVV+P5Q, 1, Dese
          </a>
        </div>
        <hr></hr>
        {/* secod box */}
        <div className="relative group max-w-full">
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl z-10 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
            aria-label="Scroll left"
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

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 p-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <img
              src={hotel1}
              alt="Hotel View 1"
              className="h-96 w-auto object-cover snap-center rounded-lg shadow-md shrink-0"
            />
            <img
              src={hotel2}
              alt="Hotel View 2"
              className="h-96 w-auto object-cover snap-center rounded-lg shadow-md shrink-0"
            />
            <img
              src={hotel3}
              alt="Hotel View 3"
              className="h-96 w-auto object-cover snap-center rounded-lg shadow-md shrink-0"
            />
            <img
              src={hotel4}
              alt="Hotel View 4"
              className="h-96 w-auto object-cover snap-center rounded-lg shadow-md shrink-0"
            />
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl z-10 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
            aria-label="Scroll right"
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
        {/* second */}
        <div className="flex flex-row ">
          <div className="m-4 flex flex-col sm:flex-row items-center gap-4 bg-white border border-gray-200 p-5 rounded-xl shadow-sm max-w-fit hover:shadow-md transition-shadow">
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
                className=" font-bold underline text-black-600 hover:text-blue-800 transition-colors"
                href="https://www.tripadvisor.com/Hotel_Review-g2194934-d7248694-Reviews-Hotel_Time_Spa-Dessie_Amhara_Region.html"
              >
                read reviews
              </a>
            </div>
            <div>
              <a className="m-4 px-4" href="tel:+251914313458">
                Call Us: 091 431 3458
              </a>
            </div>
          </div>
        </div>
        {/* third */}
        <div className="m-4 flex flex-col gap-4 bg-white">
          <div>
            <h1 className=" text-center text-3xl font-serif text-amber-500">
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
                className="w-7 h-7 text-amber-500 shrink-0"
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
                className="w-7 h-7 text-amber-500 shrink-0"
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
                className="w-7 h-7 text-amber-500 shrink-0"
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
                className="w-7 h-7 text-amber-500 shrink-0"
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
                className="w-7 h-7 text-amber-500 shrink-0"
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
      </div>
    </>
  );
}
export default Home;
