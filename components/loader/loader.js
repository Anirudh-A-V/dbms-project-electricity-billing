import { SpinnerCircular } from "spinners-react";
export default function Loader({ text }) {
  return (
    <div className=" flex flex-col items-center justify-center min-h-full min-w-full fixed top-0 left-0 z-10 bg-black bg-opacity-25">
      <SpinnerCircular
        size={100}
        secondaryColor="rgba(255, 255, 255, .4)"
        color="#2979FF"
      />
      <p className="text-2xl mt-3 text-white font-medium">{text}...</p>
    </div>
  );
}
