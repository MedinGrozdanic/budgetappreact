import { UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { Link, useNavigate } from "react-router-dom";
import LoginPage from "../../../pages/Login";
import useToken from "../../../useToken";
import './header-component.css';

export const HeaderComponent = () => {
  let navigate = useNavigate();
  const { token, setToken } = useToken();
  const items = [
    { label: "Home", key: "home" },
    { label: "Expenses", key: "expenses" },
  ]

  const path =  window.location.pathname;
  if (!token && path !== '/landing' && path !== '/ContactUs' && path !== '/Features'&& path !== '/About') {
    return <LoginPage setToken={setToken} />
  }

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <Header>
        {token ? (
          <Menu mode="horizontal" className="header-component-nav">
            <Menu.Item key="home">
              <Link to={"/home"} style={{ color: 'inherit' }}>Home</Link>
            </Menu.Item>
            <Menu.Item key="expenses">
              <Link to={"/Expense"}>Expenses</Link>
            </Menu.Item>
            <Menu.Item key="logout" onClick={logOut}>LogOut</Menu.Item>
          </Menu>
        ) : (
          <Menu mode="horizontal" className="header-component-nav"></Menu>
        )}
      </Header>
    </div>
  );
}