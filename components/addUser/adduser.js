import axios from "axios";
import { useState } from "react";
import Loader from "../loader/loader";

export default function Adduser() {
  const [user, setUser] = useState({
    consumer_id: "",
    username: "",
    address: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [uploading, setuploading] = useState(false);
  const createUser = () => {
    if (user.consumer_id.length < 5) {
      setError("Enter a valid consumer id");
    } else if (user.username.length < 5) {
      setError("Enter a valid username");
    } else if (user.password.length < 5) {
      setError("Minimum password length 5");
    } else if (user.consumer_id.length < 5) {
      setError("Enter a valid consumer id");
    } else {
      setError("");
      setuploading(true);
      console.log(user);
    }
    axios({
      method: "post",
      url: "https://dbms-api.vercel.app/users",
      data: user,
    })
      .then((e) => {
        console.log(e);
        setuploading(false);
        setError("User added succesfully 🤩");
      })
      .catch((e) => {
        console.log(e);
        setError("Something went wrong!");
      });
  };
  return (
    <div className="p-16 ">
      {uploading ? <Loader text="Adding new user" /> : ""}
      <h2 className="font-bold text-2xl">Add User </h2>
      <div className="line w-full mt-3"></div>
      <div className="p-6">
        <div className="flex flex-col">
          <div className=" grid gap-y-6 grid-cols-2">
            <div className="">
              <p className="text text-lg font-medium">Username</p>
              <input
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
                type="text"
                className="input-box mt-1 w-4/6 outline-none p-2 rounded"
                placeholder="User name"
              />
            </div>{" "}
            <div className="">
              <p className="text text-lg font-medium">Password</p>
              <input
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                type="text"
                className="input-box mt-1 w-4/6 outline-none p-2 rounded"
                placeholder="password"
              />
            </div>{" "}
            <div className="">
              <p className="text text-lg font-medium">Consumer Number</p>
              <input
                onChange={(e) => {
                  setUser({ ...user, consumer_id: e.target.value });
                }}
                type="text"
                className="input-box mt-1 w-4/6 outline-none p-2 rounded"
                placeholder="Consumer Number"
              />
            </div>{" "}
            <div className="">
              <p className="text text-lg font-medium">Address</p>
              <input
                onChange={(e) => {
                  setUser({ ...user, address: e.target.value });
                }}
                type="text"
                className="input-box mt-1 w-4/6 outline-none p-2 rounded"
                placeholder="Consumer Address"
              />
            </div>{" "}
            <div className="">
              <p className="text text-lg font-medium">Phone Number</p>
              <input
                type="tel"
                onChange={(e) => {
                  setUser({ ...user, phone: e.target.value });
                }}
                className="input-box mt-1 w-4/6 outline-none p-2 rounded"
                placeholder="Consumer Phone Number"
              />
            </div>
            <div className=""></div>
            {error ? (
              <div className=" col-span-2">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              ""
            )}
            <div className="">
              <button
                onClick={createUser}
                className="text-sm hover:opacity-80 transition-all rounded-sm  w-40 p-2 text-white font-medium bg-blue-400 dark-blue  mt-1"
              >
                Add User
              </button>
              <button className="text-sm button-off ml-4 hover:opacity-80 transition-all rounded-sm  w-40 p-2 text-white font-medium bg-blue-400 dark-blue  mt-1">
                View All Users
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
