import { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "./images/Property-.jpg";

export default function Home() {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center "
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    > 
    </div>
  );
}
