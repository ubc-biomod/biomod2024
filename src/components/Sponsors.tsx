import { useEffect, useState } from "react";
import apscLogo from "../assets/ubc_apsc.jpg";
import sbmeLogo from "../assets/ubc_sbme.png";
import sinLabLogo from "../assets/logo_sino-biological.png";
import mslLogo from "../assets/ubc_msl.png";
import biolabsLogo from "../assets/new_england_biolabs.svg";
import type { ImageMetadata } from "astro";
import classNames from "classnames";

const tiers = ["Platinum", "Gold", "Bronze"] as const;
type SponsorType = {
  name: string;
  logo: ImageMetadata;
  href: string;
  type: (typeof tiers)[number];
};

export default function Sponsors() {
  const [sponsors, setSponsors] = useState<SponsorType[]>([]);

  useEffect(() => {
    setSponsors([
      {
        name: "The Faculty of Applied Science",
        logo: apscLogo,
        href: "https://apsc.ubc.ca/",
        type: "Platinum",
      },
      {
        name: "The School of Biomedical Engineering",
        logo: sbmeLogo,
        href: "https://bme.ubc.ca/",
        type: "Platinum",
      },
      {
        name: "Sino Biological",
        logo: sinLabLogo,
        href: "https://www.sinobiological.com/",
        type: "Gold",
      },
      {
        name: "Michael Smith Laboratories",
        logo: mslLogo,
        href: "https://www.msl.ubc.ca/",
        type: "Bronze",
      },
      {
        name: "New England Biolabs",
        logo: biolabsLogo,
        href: "https://www.neb.ca/",
        type: "Bronze",
      },
    ]);
  }, []);

  return (
    <div className="flex flex-col items-center gap-y-4 text-center">
      <div>
        <h1>Many thanks to our sponsors!</h1>
        <p>
          Our project wouldn't be possible without the generous support of our
          sponsors.
        </p>
      </div>
      <div className="flex flex-col gap-y-8">
        {tiers.map((tier) => {
          return (
            <div className="flex flex-col justify-center items-center">
              <div
                className={`w-full h-16 font-extrabold align-middle text-center 
                           flex flex-col justify-center rounded-full
                           ${classNames({
                             "bg-[#E5E4E2]": tier === "Platinum",
                             "bg-[#FFD700]": tier === "Gold",
                             "bg-[#CD7F32]": tier === "Bronze",
                           })}`}
              >
                <h2 className="">{tier}</h2>
              </div>
              <div className="flex flex-row gap-x-16 justify-center items-center">
                {sponsors
                  .filter((sponsor) => sponsor.type === tier)
                  .map((sponsor) => {
                    return (
                      <div className="w-1/3 h-auto hover:opacity-60 hover:scale-105 transition">
                        <a target="_blank" href={sponsor.href}>
                          <img src={sponsor.logo.src} alt={sponsor.name} />
                        </a>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
