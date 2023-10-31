import { useEffect, useState } from "react";
import "./Login.css";
import { Alert } from "antd";
const Message = (props) => {
  // const [show, setShow] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setShow(false), 4000);
  //   return () => {
  //     // setShow(true);
  //     clearTimeout(timer);
  //   };
  // }, []);
  const response = props.response;

  return response.status === 200 ? (
    <Alert message="Login successful..." type="success" />
  ) : (
    <Alert message={props.token} type="error"/>
  );
};
export default Message;
