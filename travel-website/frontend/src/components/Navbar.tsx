import { Plane } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b-2 border-pink-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-bold text-cute-pink text-xl flex items-center gap-2"
        >
          <Plane size={22} /> Trip Planner
        </Link>
        {/* <div className="space-x-6">
          <Link to="/" className="hover:text-blue-200 transition">Trips</Link>
        </div> */}
      </div>
    </nav>
  );
}
