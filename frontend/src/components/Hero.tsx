import memory1 from "../assets/images/memories8.jpg";
import { IDisplayPostForm } from "../types";
import Filter from "./Filter";

export default function Hero({
  displayPostForm,
}: {
  displayPostForm: IDisplayPostForm;
}) {
  return (
    <section>
      <div className="lg:flex justify-center items-center mx-auto">
        <div
          className="bg-cover bg-center w-full bg-mobile h-[800px] px-0"
          style={{ backgroundImage: `url(${memory1})` }}
        >
          <div className="flex flex-col">
            <Filter />
            <div className="m-4 text-left text-white mt-32 lg:w-1/2 md:w-2/3 md:pl-20 lg:pl-40">
              <h1 className="font-bold text-5xl md:text-7xl text-white">
                Memories...
              </h1>
              <h2 className="pt-8 text-gray-100 font-semibold class text-xl md:text-3xl italic">
                Preserving yesterdays's echoes, embracing today's joys where
                every second has a story
              </h2>
              <button
                onClick={() => displayPostForm()}
                className="border border-white p-4 px-6 mt-8 text-2xl rounded text-white font-bold hover:bg-white hover:text-gray-800 "
              >
                Create memory
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
