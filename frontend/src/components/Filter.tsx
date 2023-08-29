import { BsFilter } from "react-icons/bs";

export default function Filter() {
  return (
    <div>
      <form>
        <div className="md:flex items-center justify-center pt-12 pb-10 mx-auto px-6 md:px-0">
          <input
            type="text"
            placeholder="Author's name"
            className="bg-gray-50 border-gray-400 py-2 px-4 focus:outline-none rounded md:rounded-none md:rounded-l-md flex flex-col mb-2 w-full md:mb-0 md:w-1/4 placeholder-gray-600"
          />
          <input
            type="text"
            placeholder="Title"
            className="bg-gray-50 border-gray-400 py-2 px-4 focus:outline-none rounded md:rounded-none md:border-l mb-2 md:border-r md:mb-0 md:border-r-gray-100 md:border-l-gray-400 w-full md:w-1/4 placeholder-gray-600"
          />
          <select
            name=""
            id=""
            className="bg-gray-50 border-gray-400 py-[8.5px] px-4 focus:outline-none rounded md:rounded-none md:border-l md:rounded-r-md w-full md:w-1/4 text-gray-600 p-2"
          >
            <option value="" selected>
              24 hours ago
            </option>
            <option value="" selected>
              1 week ago
            </option>
            <option value="" selected>
              1 month ago
            </option>
            <option value="" selected>
              1 year ago
            </option>
          </select>
          <button className="flex items-center mt-2 text-white">
            <BsFilter className="md:ml-8" size={60} />{" "}
            <span className="ml-4 text-2xl md:hidden">Filter</span>
          </button>
        </div>
      </form>
    </div>
  );
}
