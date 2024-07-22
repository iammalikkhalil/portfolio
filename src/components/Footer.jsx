import React from "react";
import { Link } from "react-router-dom";
import { socialLinks } from "../constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer font-poppins">
      <hr className="border-slate-200" />

      <div className="footer-container">
        <p>
          © {currentYear} <strong>M Khalil</strong>. All rights reserved.
        </p>

        <div className="flex gap-3 justify-center items-center">
          {socialLinks.map((link) => (
            <Link key={link.name} to={link.link} target="_blank">
              <img
                src={link.iconUrl}
                alt={link.name}
                className="w-8 h-8 object-contain" // Tailwind classes for width, height, and object-fit
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;