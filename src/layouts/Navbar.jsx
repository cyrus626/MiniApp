import { Link } from "react-router-dom";
import { useState } from "react";
import "../index.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Mini Tools</h1>
        <button onClick={() => setOpen(!open)}
        className="md:hidden text-2xl"
        >
          ☰
        </button>
        <ul className="hidden md:flex gap-6 font-semibold">
          <li className="hover:text-gray-300 cursor-pointer">Home</li>
          <li className="hover:text-gray-300 cursor-pointer">Weather</li>
          <li className="hover:text-gray-300 cursor-pointer">Notes</li>
          <li className="hover:text-gray-300 cursor-pointer">Expenses</li>
          <li className="hover:text-gray-300 cursor-pointer">Products</li>
        </ul>
      </div>

      {open && (<ul className="md:hidden mt-3 flex flex-col gap-2 font-medium bg-gray-800 p-4 rounded-lg">
          <li className="hover:text-gray-300 cursor-pointer"><Link to="/">Home</Link></li>
          <li className="hover:text-gray-300 cursor-pointer"><Link to="/tasks">Task Manager</Link></li>
          <li className="hover:text-gray-300 cursor-pointer"><Link to="/weather">Weather</Link></li>
          <li className="hover:text-gray-300 cursor-pointer"><Link to="/notes" >Notes</Link></li>
          <li className="hover:text-gray-300 cursor-pointer"><Link to="/splitter">Expenses Splitter</Link></li>
          <li className="hover:text-gray-300 cursor-pointer"><Link to="/products">Products</Link></li>
        </ul>)}
    </nav>
  );
}
