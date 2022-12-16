import axios from "axios";
import { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
export default function Bill() {
  const [consumerid, setConsumerid] = useState();
  const [verified, setVerified] = useState();
  const [username, setUsername] = useState("");
  const [data, setData] = useState({
    bill_id: "",
    consumer_id: "",
    units: "",
    current_reading: "",
    due_date: "",
    tax: "",
  });
  const verify = () => {
    if (consumerid == "") {
      return;
    }
    axios({
      method: "get",
      url: `https://dbms-api.vercel.app/users/${consumerid}`,
      responseType: "json",
    }).then(function (response) {
      console.log(response.data);
      let data = response.data;
      let verified = false;
      setVerified(false);
      for (let i = 0; i < data.length; i++) {
        console.log(
          data[i].consumer_id,
          consumerid,
          data[i].consumer_id == consumerid
        );
        if (data[i].consumer_id == consumerid) {
          verified = true;
          setVerified(true);
          setUsername(data[i].username);
          break;
        }
      }
      console.log(verified);
    });
  };
  const submitBill = () => {};
  return (
    <div className="p-16 ">
      <h2 className="font-bold text-2xl">Add User Bills</h2>
      <div className="line w-full mt-3"></div>
      <div className="p-6">
        <div className="flex flex-col">
          <p className="text text-lg font-medium">Consumer Number</p>
          <div className="flex flex-row items-center">
            <input
              onChange={(e) => setConsumerid(e.target.value)}
              type="text"
              className="input-box mr-4 mt-1 w-2/6 outline-none p-2 rounded"
              placeholder="Consumer Number"
            />
            {verified ? (
              <IoIosCheckmarkCircle size={20} color="#00c853" />
            ) : (
              <IoIosCheckmarkCircle size={20} color="#b2ebf2" />
            )}
          </div>

          <button
            onClick={verify}
            className="text-sm hover:opacity-80 transition-all rounded-sm  w-40 p-2 text-white font-medium bg-blue-400 dark-blue  mt-4"
          >
            Get User
          </button>
          {verified ? (
            <div className="mt-10 grid gap-y-6 grid-cols-2">
              {" "}
              <div className="">
                <p className="text text-lg font-medium">Username</p>
                <input
                  value={username}
                  disabled
                  type="text"
                  className="input-box mt-1 w-4/6 outline-none p-2 rounded"
                  placeholder="Current Reading"
                />
              </div>{" "}
              <div className="">
                <p className="text text-lg font-medium">Current Reading</p>
                <input
                  onChange={(e) => setData({ ...data, units: e.target.value })}
                  type="text"
                  className="input-box mt-1 w-4/6 outline-none p-2 rounded"
                  placeholder="Current Reading"
                />
              </div>{" "}
              <div className="">
                <p className="text text-lg font-medium">Unit charge</p>
                <input
                  onChange={(e) => setData({ ...data, units: e.target.value })}
                  type="text"
                  className="input-box mt-1 w-4/6 outline-none p-2 rounded"
                  placeholder="Per unit price"
                />
              </div>{" "}
              <div className="">
                <p className="text text-lg font-medium">Tax</p>
                <input
                  onChange={(e) => setData({ ...data, units: e.target.value })}
                  type="text"
                  className="input-box mt-1 w-4/6 outline-none p-2 rounded"
                  placeholder="Tax amount"
                />
              </div>{" "}
              <div className="">
                <p className="text text-lg font-medium">Expiry Date</p>
                <input
                  type="date"
                  className="input-box mt-1 w-4/6 outline-none p-2 rounded"
                  placeholder="Current Reading"
                />
              </div>{" "}
              <div className=""></div>
              <button className="text-sm hover:opacity-80 transition-all rounded-sm  w-40 p-2 text-white font-medium bg-blue-400 dark-blue  mt-4">
                Generate Bill
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
