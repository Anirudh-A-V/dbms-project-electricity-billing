import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
export default function Complaints() {
  ///
  const [selected, setSelected] = useState(0);

  const [data, setData] = useState("");
  const getData = () => {
    axios({
      method: "get",
      url: `https://dbms-api.vercel.app/complaint`,
      responseType: "json",
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {});
  };
  useEffect(() => {
    getData();
  }, []);

  ///////////////
  const markResolved = (id) => {
    console.log(id);
    axios({
      method: "put",
      url: `https://dbms-api.vercel.app/complaint/resolve/${id}`,
      responseType: "json",
    })
      .then((response) => {
        console.log(response);
        getData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteComplaint = (id) => {
    console.log(id);
    axios({
      method: "delete",
      url: `https://dbms-api.vercel.app/complaint/${id}`,
      responseType: "json",
    })
      .then((response) => {
        console.log(response);
        getData();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="p-16 ">
      <h2 className="font-bold text-2xl">Consumer Complaints </h2>
      <div className="line w-full mt-3"></div>
      <div className="p-6">
        <div className="flex flex-col">
          <div className="grid bg-white p-2 grid-cols-4">
            <div className="w-40 font-medium  text">Consumer Number</div>
            <div className="w-40 font-medium  text">Location</div>
            <div className="w-40 font-medium  text">Complaint</div>
            <div className="w-40 font-medium  text">Status</div>
          </div>
          <div className="line w-full " />
          {data &&
            data.map((item, i) => {
              return (
                <div
                  onClick={() => {
                    setSelected(i);
                    markResolved(item.complaint_id);
                  }}
                  key={item.id}
                  className="grid cursor-pointer place-content-center mt-2  p-2 grid-cols-4"
                >
                  <div className="w-40 font-medium  text">
                    {item.consumer_id}
                  </div>
                  <div className="w-40 font-medium  text">{item.location}</div>
                  <div className="w-40 font-medium  text">
                    {
                      ///if selected index same as item index full complaint will be shown else trimmed content will be shown
                    }
                    {selected != i
                      ? item.description.substring(0, 35) + "......"
                      : item.description}
                  </div>
                  <div className=" flex flex-row justify-start items-center font-medium  text">
                    {item.status ? (
                      <button className="text-sm  rounded-sm  w-40 p-2 text-white font-medium bg-green-600  ">
                        Solved
                      </button>
                    ) : (
                      <button className="text-sm hover:opacity-80 transition-all rounded-sm  w-40 p-2 text-white font-medium bg-red-600  ">
                        Mark as solved
                      </button>
                    )}
                    <button
                      className="ml-3 text-xl"
                      onClick={() => {
                        deleteComplaint(item.complaint_id);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
