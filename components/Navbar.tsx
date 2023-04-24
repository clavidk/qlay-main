import { IconExternalLink } from "@tabler/icons-react";
import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <div className="flex h-[60px] bg-white py-2 px-8 items-center justify-between shadow-md" style={{ fontFamily: 'Balto Web, Helvetica, Arial, sans-serif', boxShadow: '0 0 7px 0 rgba(0, 0, 0, .3)' }}>
      <div className="font-bold text-base text-gray-700 flex items-center">
        <a
          className="hover:opacity-50"
          href="https://www.desiringgod.org"
        >
          John Piper GPT
        </a>
      </div>
      <div>
        <a
          className="flex items-center hover:opacity-50"
          href="http://www.desiringgod.org"
          target="_blank"
          rel="noreferrer"
        >
          <div className="hidden sm:flex">Desiring God</div>
        </a>
      </div>
    </div>
  );
};
