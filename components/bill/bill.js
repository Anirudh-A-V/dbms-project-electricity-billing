import axios from "axios";
import { useState } from "react";
import Loader from "../loader/loader";
import { IoIosCheckmarkCircle } from "react-icons/io";
export default function Bill() {
  const [consumerid, setConsumerid] = useState();
  const [verified, setVerified] = useState();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [uploading, setuploading] = useState(false);
  const [data, setData] = useState({
    bill_id: "",
    consumer_id: "",

    current_reading: "",
    due_date: "",
    unit_charge: "",
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

      let u_data = response.data;
      let verified = false;
      setVerified(false);
      for (let i = 0; i < u_data.length; i++) {
        console.log(
          u_data[i].consumer_id,
          consumerid,
          u_data[i].consumer_id == consumerid
        );
        if (u_data[i].consumer_id == consumerid) {
          verified = true;
          setData({ ...data, consumer_id: consumerid });
          setVerified(true);
          setUsername(u_data[i].username);
          break;
        }
      }
      console.log(verified);
    });
  };
  var round = Math.round;
  const submitBill = () => {
    if (data.current_reading.length == 0) {
      setError("Enter Current reading value");
    } else if (data.unit_charge.length == 0) {
      setError("Enter unit charge");
    } else if (data.tax.length == 0) {
      setError("Enter tax amount");
    } else if (data.due_date.length < 5) {
      setError("Add Due date");
    } else {
      let totalprice = data.unit_charge * data.current_reading;

      let submitdata = {
        consumer_id: round(data.consumer_id),
        units: round(data.current_reading),
        current_reading: totalprice,
        due_date: data.due_date,
        tax: round(data.tax),
      };
      setError("");
      setuploading(true);
      console.log(submitdata);
      axios({
        method: "post",
        url: "https://dbms-api.vercel.app/bills",
        data: submitdata,
      })
        .then((e) => {
          console.log(e);
          setuploading(false);
          setError("Bill added succesfully 🤩");
        })
        .catch((e) => {
          console.log(e);
          setuploading(false);
          setError("Something went wrong!");
        });
    }
  };

  return (
    <div className="p-16 ">
      {uploading ? <Loader text="Adding new bill" /> : ""}
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
                  onChange={(e) =>
                    setData({ ...data, current_reading: e.target.value })
                  }
                  type="text"
                  className="input-box mt-1 w-4/6 outline-none p-2 rounded"
                  placeholder="Current Reading"
                />
              </div>{" "}
              <div className="">
                <p className="text text-lg font-medium">Unit charge</p>
                <input
                  onChange={(e) =>
                    setData({ ...data, unit_charge: e.target.value })
                  }
                  type="text"
                  className="input-box mt-1 w-4/6 outline-none p-2 rounded"
                  placeholder="Per unit price"
                />
              </div>{" "}
              <div className="">
                <p className="text text-lg font-medium">Tax</p>
                <input
                  onChange={(e) => setData({ ...data, tax: e.target.value })}
                  type="text"
                  className="input-box mt-1 w-4/6 outline-none p-2 rounded"
                  placeholder="Tax amount"
                />
              </div>{" "}
              <div className="">
                <p className="text text-lg font-medium">Expiry Date</p>
                <input
                  onChange={(e) =>
                    setData({ ...data, due_date: e.target.value })
                  }
                  type="date"
                  className="input-box mt-1 w-4/6 outline-none p-2 rounded"
                  placeholder="Current Reading"
                />
              </div>{" "}
              <div className=""></div>
              {error ? (
                <div className=" col-span-2">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : (
                ""
              )}
              <button
                onClick={submitBill}
                className="text-sm hover:opacity-80 transition-all rounded-sm  w-40 p-2 text-white font-medium bg-blue-400 dark-blue  mt-4"
              >
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
