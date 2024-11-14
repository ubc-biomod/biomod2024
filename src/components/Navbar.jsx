import { useState } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar({ links, currentBase, callToActionLink, isNormalPage }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full p-4">

      {/* Hamburger Icon (Mobile) */}
      <div className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
      </div>

      {/* Navigation Links */}
      <div className={`flex flex-col lg:flex-row gap-x-8 items-center lg:gap-x-16 ${isOpen ? 'block' : 'hidden'} lg:flex`}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="group text-navText font-semibold hover:opacity-70 transition duration-300"
          >
            {link.title}
            <div
              className={`max-w-0 group-hover:left-0 group-hover:max-w-full h-[0.2rem] bg-black transition-all duration-300 origin-center relative 
                ${link.base === currentBase ? "left-0 max-w-full" : "left-1/2"}`}
            />
          </a>
        ))}
        
        {/* Conditional Call to Action */}
        {isNormalPage ? (
          <a href={callToActionLink.href} className="btn-primary">
            <span>{callToActionLink.title}</span>
            <BsBoxArrowUpRight />
          </a>
        ) : (
          <div className="basis-1/5">
            {/* Assuming SearchDefault is another component */}
            <SearchDefault {...Astro.props} />
          </div>
        )}
      </div>
    </div>
  );
}