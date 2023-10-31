import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/Login';
import { Link, Outlet, useNavigate } from "react-router-dom";
import React from 'react';
import useToken from './useToken';
import {Avatar, Layout, Menu} from 'antd';
// import 'antd/dist/antd.css';
import { UserOutlined } from '@ant-design/icons';
import FooterComponent from './components/Shared/Footer/FooterComponent';
import { Modal } from './components/Modal/Modal';
import { HeaderComponent } from './components/Shared/Header/Header-component';
const { Header, Content,Footer } = Layout;



function App() {
  

  return (
    <Layout>
      <HeaderComponent />
             
      {/* LÄGG IN FUNKTION FÖR INLOGGAD/EJ INLOGGAD ---- VISA OLIKA KOMPONENTER  */}
      <Content>
      <Outlet />
      </Content>
      <Footer>
      <FooterComponent/>
      </Footer>
      
    </Layout>

  )
}
export default App;