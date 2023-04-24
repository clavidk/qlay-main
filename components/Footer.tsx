import { IconBrandGithub, IconBrandTwitter } from "@tabler/icons-react";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex h-[50px] border-t border-gray-300 py-2 px-8 items-center sm:justify-between justify-center">
      <div className="hidden sm:flex"></div>

      <div className="hidden sm:flex italic text-sm">
        AI-generated answers are inspired by content by John Piper 
        <a
          className="hover:opacity-50 mx-1"
          href="https://twitter.com/mckaywrigley"
          target="_blank"
          rel="noreferrer"
        >
          Clayt
        </a>
        based on content by
        <a
          className="hover:opacity-50 ml-1"
          href="https://twitter.com/johnpiper"
          target="_blank"
          rel="noreferrer"
        >
          John Piper
        </a>
        .
      </div>

      <div className="flex space-x-4">
        <a
          className="flex items-center hover:opacity-50"
          href="https://twitter.com/johncalvinspiff"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandTwitter size={24} />
        </a>
      </div>
    </div>
  );
};
