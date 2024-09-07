import React from "react";
import { Typography } from "@material-tailwind/react";

function Footer() {
  return (
    <footer
      className="container-main flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between"
      id="Contact"
    >
      <Typography color="blue-gray" className="font-bold" variant="h3">
        &copy; Weather News
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography color="blue-gray" className="font-normal ">
            <span className="font-bold">Contact Us</span> :{" "}
            <a
              href="mailto:sefehab189@gmail.com"
              className="transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              sefehab189@gmail.com
            </a>
          </Typography>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
