import React from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate()

function handleSubmit(e){
e.preventDefault()
if(!query) return;
navigate(`/order/${query}`)
setQuery('')
}

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order"
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
        className=" rounded-full px-4 py-3 text-sm bg-yellow-100 placeholder:text-stone-400 w-40 sm:w-64 transition-all sm:focus:w-72 focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-50 duration-300"
      />
    </form>
  );
};

export default SearchOrder;
