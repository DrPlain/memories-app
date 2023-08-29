import { useGetPostsQuery } from "../redux/services/memoriesAPI";
import PostCard from "./PostCard";

export default function Posts() {
  const { data: posts, error, isLoading } = useGetPostsQuery();

  return (
    <div className="md:flex mx-auto justify-center mt-20">
      <div className="mx-10">
        {!isLoading && (
          <>
            <div>
              <h2 className="text-3xl md:text-5xl text-center pb-10 font-bold">
                Memories in photos
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-20 px-6 md:px-0">
              {posts?.slice(0, 8).map((post) => (
                <div key={post._id}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
