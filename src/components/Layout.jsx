import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import MainNav from "./MainNav/MainNav";

function Layout({ title, setTitle }) {
  return (
    <>
      <MainNav title={title} setTitle={setTitle} />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
