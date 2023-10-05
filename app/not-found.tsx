import Link from "next/link";
import { FaExclamationCircle, FaHome, FaSadCry } from "react-icons/fa";
import { FiSmile, FiHeart, FiHome } from "react-icons/fi"; // Import cute icons from react-icons

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-000">
      <div className=" text-center flex flex-col items-center">
        <FaExclamationCircle className="text-6xl text-pink-500 mb-4" /> {/* Add a cute smiley icon */}
        <h1 className="text-4xl font-bold mb-4">Oops!</h1> {/* Adjust heading size */}
        <p className="text-xl mb-8">The page you are looking for doesn't exist.</p> {/* Adjust text size */}
        
        <Link className="bg-pink-500 text-white hover:bg-pink-400 text-lg font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center justify-center"
 href="/"><FaHome className="mr-2" /> 
            
            Go to Home
          
        </Link>
      </div>
    </div>
  );
}
