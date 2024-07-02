import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "./Username";

const Header = () => {
  return (
    <header className="flex items-center justify-around border-b border-stone-200 opacity-85 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="font-serif tracking-widest font-bold text-lg underline">
       Pizza Menu
      </Link>

      <SearchOrder />
      <Username />
    </header>
  );
};

export default Header;
