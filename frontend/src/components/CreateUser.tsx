import React, { useState } from "react";
import { useCreateUserMutation } from "../redux/services/memoriesAPI";
import { setUser } from "../redux/features/userSlice";
import { useAppDispatch } from "../redux/hooks";

export default function CreateUser() {
  const defaultUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [userForm, setUserForm] = useState({
    ...defaultUser,
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [createUser] = useCreateUserMutation();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userForm.password !== userForm.confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      try {
        const payload = await createUser(userForm).unwrap();
        dispatch(setUser(payload));
        console.log(payload);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-[90%] pt-40 md:w-2/3 lg:w-1/3 xl:w-1/4 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="flex flex-col border bg-gray-200 rounded-md p-6 m-0 gap-4 mx-auto">
            <p className="font-bold text-center text-gray-800">
              Get an account today
            </p>
            <div>
              <p className="pb-2">First Name</p>
              <input
                autoComplete="off"
                type="text"
                name="firstName"
                value={userForm.firstName}
                onChange={handleChange}
                required
                className="border rounded-md w-full p-2 focus:outline-none placeholder-gray-500"
              />
            </div>
            <div>
              <p className="pb-2">Last Name</p>
              <input
                type="text"
                name="lastName"
                value={userForm.lastName}
                onChange={handleChange}
                required
                autoComplete="off"
                className="border rounded-md w-full p-2 focus:outline-none placeholder-gray-500"
              />
            </div>
            <div>
              <p className="pb-2">Email</p>
              <input
                type="email"
                name="email"
                value={userForm.email}
                onChange={handleChange}
                autoComplete="off"
                required
                className="border rounded-md w-full p-2 focus:outline-none placeholder-gray-500"
              />
            </div>
            <div>
              <p className="pb-2">Password</p>
              <input
                type="password"
                name="password"
                value={userForm.password}
                onChange={handleChange}
                autoComplete="off"
                required
                className="border rounded-md w-full p-2 focus:outline-none placeholder-gray-500"
              />
            </div>
            <div>
              <p className="pb-2">Confirm password</p>
              <input
                type="password"
                name="confirmPassword"
                value={userForm.confirmPassword}
                onChange={handleChange}
                autoComplete="off"
                required
                className="border rounded-md w-full p-2 focus:outline-none placeholder-gray-500"
              />
              {passwordError && <p className="text-red-400">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full p-2 mt-4 border hover:bg-gray-600 bg-gray-800 text-white font-bold rounded-md text-lg uppercase"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
