import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <p className="text-sm opacity-75 mb-3">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        <p className="text-base mb-3">
          Contact Me:{" "}
          <a
            href="https://wa.me/254715870654"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-300 hover:underline"
          >
            +254 715 870 654
          </a>
        </p>
        <p className="!text-gray-400 text-center font-mono">
          Designed and Developed
          <span className=" font-extrabold p-1 pr-0 rounded-lg text-center overflow-hidden ">
            <span className=" text-xs text-pink-600">by</span>{" "}
            <span className=" font-semibold font-mono mb-2">
              <span className="border-gray-100">
                developer
              </span>
              .
              <span className="rounded-full  border-r-2 pr-2 border-pink-500">
                gerison
              </span>
            </span>
          </span>
        </p>
      </div>
    </footer>
  );
}

export { Footer };
