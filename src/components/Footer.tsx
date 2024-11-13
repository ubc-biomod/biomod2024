import React, { useState, useEffect, Suspense } from "react";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { type MarqueeProps } from "react-fast-marquee";

interface CarouselItem {
  image: string;
  text: string;
}

const socialLinks = [
  {
    href: "https://instagram.com",
    icon: FaInstagram,
    label: "Instagram",
    color: "#000000",
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
  const [, setHoverIndex] = useState<number | null>(null);
  const [activeText, setActiveText] = useState<{
    name: string;
    subteam: string;
  } | null>(null);
  const [Marquee, setMarquee] = useState<React.FC<MarqueeProps> | null>(null);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);

  useEffect(() => {
    fetch("")
      .then((response) => response.json())
      .then((data) => {
        const items = data
          .filter(
            (item: { name: string; subteam: string }) =>
              item.name && item.subteam,
          )
          .map(
            (item: { name: string; subteam: string; image_url?: string }) => ({
              image: item.image_url || "user.png",
              text: `${item.name} - ${item.subteam}`,
            }),
          );

        const THRESHOLD = 15;
        setCarouselItems(
          items.length < THRESHOLD
            ? Array.from(
                { length: Math.ceil(THRESHOLD / items.length) },
                () => items,
              ).flat()
            : items,
        );
      })
      .catch((error) => console.error("Error fetching carousel data:", error));
  }, []);

  useEffect(() => {
    import("react-fast-marquee").then((module) =>
      setMarquee(() => module.default),
    );
  }, []);

  return (
    <div className="not-content relative flex flex-col items-center">
      <div className="flex flex-col bg-[#d9d9d9] items-center absolute w-screen gap-y-6 py-4">
        {carouselItems.length !== 0 && (
          <div className="flex flex-col items-center">
            <h1 className="text-2xl md:text-4xl text-black font-bold">
              Meet the UBC BIOMOD Team
            </h1>
            <h4 className="h-6 text-md text-black">
              {activeText && (
                <>
                  <span className="font-bold">{activeText.name}</span>
                  <span> - {activeText.subteam}</span>
                </>
              )}
            </h4>
          </div>
        )}

        <div className="flex w-full">
          {Marquee ? (
            <Suspense fallback={<div>Loading...</div>}>
              <Marquee pauseOnHover={true}>
                {carouselItems.map((item, index) => {
                  const [name, subteam] = item.text.split(" - ");
                  return (
                    <div
                      key={index}
                      className="w-24 h-24 rounded-2xl flex items-center justify-center cursor-pointer relative mx-2"
                      onMouseEnter={() => {
                        setHoverIndex(index);
                        setActiveText({
                          name: name || "",
                          subteam: subteam || "",
                        });
                      }}
                      onMouseLeave={() => {
                        setHoverIndex(null);
                        setActiveText(null);
                      }}
                    >
                      <img
                        src={item.image}
                        alt={`Image ${index}`}
                        className="rounded-2xl w-full h-full object-cover opacity-85 hover:opacity-100"
                      />
                    </div>
                  );
                })}
              </Marquee>
            </Suspense>
          ) : (
            <div className="text-black">Loading Carousel...</div>
          )}
        </div>

        <div className="flex flex-row items-center gap-x-10">
          {socialLinks.map(({ href, icon: Icon, label, color }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 cursor-pointer"
              aria-label={label}
            >
              <Icon className="hover:opacity-60" size={32} color={color} />
            </a>
          ))}
        </div>

        <div className="flex flex-row items-center gap-x-8">
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
