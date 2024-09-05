import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate('/login')
    }
  return (
<header className="flex border-b py-4 px-4 sm:px-10 bg-slate-100 font-sans min-h-[70px] tracking-wide relative z-50">
  <div className="flex flex-wrap items-center lg:gap-y-2 gap-y-4 gap-x-4 w-full">
    <Link to={'/'}>
      <div>
        <img
          src="https://cdn.discordapp.com/attachments/1226840467929305120/1281125007119880253/ANIMAGE_Transparent.png?ex=66da9423&is=66d942a3&hm=1dbf6388a8c6d9c4aa7fe0f2285521dd42cdc3d0d41564ffdc570a5c057da27e&"
          alt="logo"
          className="w-36"
        />
      </div>
    </Link>
    <div
      id="collapseMenu"
      className="max-lg:hidden lg:!flex lg:items-center lg:flex-1 max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
    >
      <ul className="lg:ml-12 lg:flex lg:gap-x-8 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
        <li className="max-lg:border-b max-lg:py-3">
        <Link to={'/'}>
          <p
            className="hover:text-[#007bff] text-gray-600 block font-bold text-[15px]"
          >
            Home
          </p>
        </Link>
        </li>
        <li className="max-lg:border-b max-lg:py-3">
        <Link to={'/my-images'}>
          <p
            className="hover:text-[#007bff] text-gray-600 block font-bold text-[15px]"
          >
            My Images
          </p>
        </Link>
        </li>
        <li className="max-lg:border-b max-lg:py-3">
        <Link to={'/generate-image'}>
          <p
            className="hover:text-[#007bff] text-gray-600 block font-bold text-[15px]"
          >
            Generate Image
          </p>
        </Link>
        </li>
      </ul>
    </div>
    <div className="flex ml-auto space-x-6">
      <button onClick={handleLogout} className="px-4 py-2.5 text-sm rounded-md font-bold border border-[#b54848] bg-transparent hover:bg-[#ff0000] hover:text-white transition-all ease-in-out duration-300 text-[#e83131]">
        Logout
      </button>
      <button id="toggleOpen" className="lg:hidden">
        <svg
          className="w-7 h-7"
          fill="#333"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</header>

  )
}
