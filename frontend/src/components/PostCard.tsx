import { IPostMessage } from "../../../server/src/models/PostMessage";
import { AiOutlineLike } from "react-icons/ai";

export default function PostCard({ post }: { post: IPostMessage }) {
  let duration: string = "2 hours ago";
  const dateTimeString = post.createdAt && new Date(post.createdAt);
  const hours = dateTimeString?.getHours() || 0;
  const minutes = dateTimeString?.getMinutes();
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(weeks / 4);
  const years = Math.round(weeks / 52);

  if (hours) {
    if (hours < 1) {
      if (minutes && minutes <= 1) {
        duration = "Just now";
      } else {
        duration = `${minutes} minutes ago`;
      }
    } else if (hours === 1) {
      duration = `${hours} hour ago`;
    } else if (hours < 24) {
      duration = `${hours} hours ago`;
    } else if (days < 7) {
      duration = `${days} day(s) ago`;
    } else if (weeks < 4) {
      duration = `${weeks} week(s) ago`;
    } else if (months < 12) {
      duration = `${months} month(s) ago`;
    } else {
      duration = `${years} year(s) ago`;
    }
  }

  return (
    <div className="bg-gray-200 border rounded-md hover:scale-105 duration-200">
      <img
        src={post.selectedFile}
        alt={post.title}
        className="h-[200px] md:w-full rounded-t-md w-full"
      />
      <div className="p-4">
        <p className="font-bold text-lg pb-2 text- text-red-600">
          {post.title}
        </p>
        <p className="font-semibold text-gray-800">{`Memories by: ${post.author}`}</p>
        <p className="text-gray-600 py-4">{post.message}</p>
        <p className="font-semibold pb-4 text-gray-800">{`Tags: ${post.tags?.join(
          " "
        )}`}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 py-4">
            <button>
              <AiOutlineLike />
            </button>
            <p>{post.likeCount}</p>
          </div>
          <div>
            <p>{duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
