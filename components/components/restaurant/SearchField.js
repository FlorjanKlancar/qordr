import {SearchIcon} from "@heroicons/react/outline";

function SearchField(props) {
  return (
    <div className="w-11/12 m-auto ">
      <div className="h-12 flex items-center border-2 rounded-full">
        <div className="p-4">
          <SearchIcon className="w-5 h-5 text-gray-500" />
        </div>

        <input
          className="py-0.5 px-6 text-gray-700 leading-tight focus:outline-none w-10/12 pl-1 "
          id="search"
          type="text"
          placeholder="Search"
          autoComplete="off"
          onChange={(event) => {
            props.setSearch(event.target.value);
          }}
        />
      </div>
    </div>
  );
}
export default SearchField;
