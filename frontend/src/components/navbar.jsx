// navbar.jsx
import * as React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "Timetable", path: "/timetable" },
  { name: "Live", path: "/live" },
  { name: "Donate", path: "/donate" },
  { name: "Madrassah", path: "/madrassah" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const base =
    "px-5 py-2 transition-all rounded-md";
  const active = "bg-white text-primary font-bold";
  const idle = "text-white hover:bg-white hover:text-primary";

  return (
    <>
      <nav className="bg-primary shadow-xl w-full">
        <div>
          {/* Mobile toggle */}
          <div className="md:hidden">
            <button className="flex flex-row mx-auto" onClick={() => setIsOpen(v => !v)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex space-x-4 text-md py-3 justify-center">
            {links.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) => `${base} ${isActive ? active : idle}`}
              >
                {name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 text-center pb-3">
            {links.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block w-full ${base} ${isActive ? active : idle}`
                }
              >
                {name}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
