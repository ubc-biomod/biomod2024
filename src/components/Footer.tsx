import React, { useState, useEffect, Suspense } from "react";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

interface CarouselItem {
  image: string; // image
  text: string; // text info shown on hover
}

const socialLinks = [
  {
    href: "https://instagram.com",
    icon: FaInstagram,
    label: "Instagram",
    color: "#000000", // if we want to color icons in future
  },
  {
    href: "https://youtube.com",
    icon: FaYoutube,
    label: "YouTube",
    color: "#000000",
  },
  {
    href: "https://linkedin.com",
    icon: FaLinkedin,
    label: "LinkedIn",
    color: "#000000",
  },
];

const additionalLinks = [
  {
    href: "https://google.com",
    label: "Email Us",
  },
  {
    href: "https://google.com",
    label: "Become a Sponsor",
  },
];


const Footer: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [activeText, setActiveText] = useState<string>("");
  const [Marquee, setMarquee] = useState<any>(null);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);

  useEffect(() => {
    // Fetch data from the endpoint
    fetch('')
      .then(response => response.json())
      .then(data => {
        // Transform the data to match CarouselItem structure
        const items = data
        .filter((item: any) => item.name && item.subteam) // filter out items with no name or subteam
        .map((item: any) => ({
          image: item.image_url || "user.png",  // Fallback image if img_url is empty
          text: `${item.name} - ${item.subteam}`
        }));
        
        const THRESHOLD = 15;
        // Check if the items are below the threshold, repeat if needed
        setCarouselItems(
          items.length < THRESHOLD
            ? Array.from({ length: Math.ceil(THRESHOLD / items.length) }, () => items).flat()
            : items
        );
      })
      .catch(error => console.error("Error fetching carousel data:", error));
  }, []);

  useEffect(() => {
    // Dynamically import Marquee on the client side
    import("react-fast-marquee").then((module) =>
      setMarquee(() => module.default)
    );
  }, []);

  return (
    <div className="not-content relative flex flex-col items-center">
      <div className="flex flex-col bg-[#d9d9d9] items-center absolute w-screen">
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

        <div className="flex flex-row items-center mt-10 gap-10">
  {socialLinks.map(({ href, icon: Icon, label, color }, index) => (
    <a
      key={index}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 cursor-pointer"
      aria-label={label}
    >
      <Icon size={32} color={color} />
    </a>
  ))}
</div>


      <div className="flex flex-row items-center my-10 gap-8">
        {additionalLinks.map(({ href, label }, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-black"
          >
            {label}
          </a>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Footer;
