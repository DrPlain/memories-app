import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useCreatePostMutation } from "../redux/services/memoriesAPI";
import { IPostMessage } from "../../../server/src/models/PostMessage";
import { IDisplayPostForm } from "../types";

export default function PostForm({
  displayForm,
}: {
  displayForm: IDisplayPostForm;
}) {
  const defaultPostForm: IPostMessage = {
    title: "",
    message: "",
    author: "",
    selectedFile: "",
    tags: [],
  };

  const [postForm, setPostForm] = useState<IPostMessage>(defaultPostForm);

  const [createPost] = useCreatePostMutation();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "tags") {
      setPostForm({ ...postForm, tags: value.split(",") });
    } else {
      setPostForm((prevState) => {
        return { ...prevState, [name]: value };
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = await createPost(postForm).unwrap();
      console.log(payload);
    } catch (error) {
      console.error(error);
    }
    // clear();
  };

  const handleUpload = (file: { base64: string }) => {
    setPostForm({ ...postForm, selectedFile: file.base64 });
  };

  return (
    <div className="w-full pt-28 md:pt-0">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mx-auto">
          <div className="flex flex-col border bg-gray-200 rounded-md p-6 gap-4 mx-auto">
            <p className="font-bold text-center text-gray-800">
              Creating a memory
            </p>
            <div>
              <input
                autoComplete="off"
                type="text"
                name="author"
                value={postForm.author}
                onChange={handleChange}
                placeholder="Name of creator"
                required
                className="border rounded-md w-full p-2 focus:outline-none placeholder-gray-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="title"
                value={postForm.title}
                onChange={handleChange}
                required
                autoComplete="off"
                placeholder="Title"
                className="border rounded-md w-full p-2 focus:outline-none placeholder-gray-500"
              />
            </div>
            <div>
              <textarea
                value={postForm.message}
                name="message"
                onChange={handleChange}
                required
                className="border rounded-md w-full p-2 focus:outline-none placeholder-gray-500"
                placeholder=" Tell us about this memory..."
              ></textarea>
            </div>
            <div>
              <input
                type="text"
                name="tags"
                value={postForm.tags}
                onChange={handleChange}
                autoComplete="off"
                placeholder="#tags"
                className="border rounded-md w-full p-2 focus:outline-none placeholder-gray-500"
              />
            </div>
            <div className="py-2 border rounded-md p-2">
              <p className="pb-2 text-gray-500">
                Upload an image of the memory
              </p>
              <FileBase
                type="file"
                name="selectedFile"
                onDone={handleUpload}
                value={postForm.selectedFile}
              ></FileBase>
            </div>
            <button
              type="submit"
              className="w-full p-2 mt-4 border hover:bg-gray-600 bg-gray-800 text-white font-bold rounded-md text-lg uppercase"
            >
              submit
            </button>
            {/* <button
              onClick={clear}
              className="w-full p-2 mt-4 border bg-gray-800 hover:bg-gray-600 text-white font-bold rounded-md text-lg uppercase"
            >
              Hide
            </button> */}
          </div>
        </div>
      </form>
    </div>
  );
}
