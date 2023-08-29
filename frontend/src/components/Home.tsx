import Posts from "./Posts";
import Hero from "./Hero";
import { IDisplayPostForm } from "../types";

export default function Home({
  displayPostForm,
}: {
  displayPostForm: IDisplayPostForm;
}) {
  return (
    <div className="pt-20 pb-40 bg-gray-300">
      <Hero displayPostForm={displayPostForm} />
      <Posts />
    </div>
  );
}
