import React from "react";
import { Link, NavLink } from "react-router-dom";
import { TbMoodShare } from "react-icons/tb";
import { SiTask } from "react-icons/si";
import { BsMinecartLoaded } from "react-icons/bs";
import { AiFillThunderbolt } from "react-icons/ai";
function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/ref">
            <TbMoodShare className="icon" />
            Ref
          </NavLink>
        </li>
        <li>
          <NavLink to="/task">
            <SiTask className="icon" />
            Task
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <BsMinecartLoaded className="icon" />
            Mine
          </NavLink>
        </li>
        <li>
          <NavLink to="/boosts">
            <AiFillThunderbolt className="icon" />
            Boost
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
