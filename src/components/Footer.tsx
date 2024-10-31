import React, { useState, useEffect, Suspense } from "react";

interface CarouselItem {
  image: string; // image
  text: string; // text info shown on hover
}
// should be able to read from db and map it to something like this in the future
const fetchedItems: CarouselItem[] = [
  { image: "dog.jpg", text: "Info 1" },
  { image: "dog.jpg", text: "Info 1" },
];

const Footer: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [activeText, setActiveText] = useState<string>("");
  const [Marquee, setMarquee] = useState<any>(null);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);

  useEffect(() => {
    const THRESHOLD = 15;
    // Set the carousel items after fetching from DB
    if (fetchedItems.length < THRESHOLD)
      setCarouselItems(
        Array.from(
          { length: THRESHOLD / fetchedItems.length },
          () => fetchedItems
        ).flat()
      );
  }, [fetchedItems]);

  useEffect(() => {
    // Dynamically import Marquee on the client side
    import("react-fast-marquee").then((module) =>
      setMarquee(() => module.default)
    );
  }, []);

  return (
    <div className="not-content">
      <div className="flex flex-col bg-[#d9d9d9] items-center">
        <h1 className="text-2xl md:text-4xl text-black font-bold mt-10">
          Meet the UBC BIOMOD Team
        </h1>
        <div className="h-12">
          <h4 className="text-md text-black mt-4 mb-1">{activeText}</h4>
        </div>

        <div className="flex w-full">
          {Marquee ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Marquee pauseOnHover={true}>
                {carouselItems.map((item, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 rounded-2xl flex items-center justify-center cursor-pointer relative mx-2"
                    onMouseEnter={() => {
                      setHoverIndex(index);
                      setActiveText(item.text);
                    }}
                    onMouseLeave={() => {
                      setHoverIndex(null);
                      setActiveText("");
                    }}
                  >
                    <img
                      src={item.image}
                      alt={`Image ${index}`}
                      className="rounded-2xl w-full h-full object-cover opacity-70 hover:opacity-100"
                    />
                  </div>
                ))}
              </Marquee>
            </Suspense>
          ) : (
            <div className="text-black">Loading Carousel...</div>
          )}
        </div>

        <div className="flex flex-row items-center mt-10">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="instagram.png"
              alt="Instagram"
              className="w-8 h-8 cursor-pointer"
            />
          </a>
          <div className="mx-12">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="youtube.png"
                alt="YouTube"
                className="w-8 h-8 cursor-pointer"
              />
            </a>
          </div>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="linkedin.png"
              alt="LinkedIn"
              className="w-8 h-8 cursor-pointer"
            />
          </a>
        </div>

        <div className="flex flex-row items-center my-10 space-x-8">
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-black"
          >
            Email Us
          </a>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-black"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
