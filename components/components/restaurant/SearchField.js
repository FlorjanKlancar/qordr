function SearchField(props) {
  return (
    <div className="w-11/12 m-auto">
      <div className="h-12 flex items-center border-2">
        <input
          className="w-full py-0.5 px-6 text-gray-700 leading-tight focus:outline-none "
          id="search"
          type="text"
          placeholder="Search"
          autoComplete="off"
          onChange={(event) => {
            props.setSearch(event.target.value);
          }}
        />
        <div className="p-4">
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default SearchField;
