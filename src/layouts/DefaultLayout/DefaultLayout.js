import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

import Header from "../components/Header";
import Footer from "../components/Footer";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <div className={cx("inner")}>
          {/* <Sidebar></Sidebar> */}
          <div className={cx("content")}>{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

DefaultLayout.propTyles = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
