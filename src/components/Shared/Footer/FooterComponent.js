import "./footer.css";
import { InstagramOutlined, LinkedinOutlined, TwitterOutlined, FacebookOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <hr />
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">
              <i>Medin Budget App</i> is a tool designed to efficiently manage the personal finances of individuals. The initial concept behind this application was to assist a wide range of people in organizing their financial affairs. With its array of essential features, this program has positioned itself as one of the leading budgeting applications available. Users can easily register on the website, track their past expenses, input their income and expenses, and work towards achieving their savings goals.
            </p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6 className="footerQuickLinks">Quick Links</h6>
            <ul className="footer-linkss">
              <li><Link to="/ContactUs">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
    </footer>
  );
};

export default FooterComponent;