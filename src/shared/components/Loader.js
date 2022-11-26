import { ThreeDots } from "react-loader-spinner";

export default function Loader({ loading }) {
  return (
    <ThreeDots
      height="40"
      width="40"
      color="rgb(0 126 255)"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      wrapperClass=""
      visible={loading === undefined ? true : loading}
    />
  );
}
