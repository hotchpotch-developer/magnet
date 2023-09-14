import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import TopHeader from "./TopHeader";
import { useEffect } from "react";
import Navbar from "./Navbar";


const Layout = () => {

    useEffect(() => {
        document.querySelector("html").setAttribute("data-layout", "horizontal");
        document.querySelector("html").setAttribute("data-topbar", "dark");
    }, []);

    return (
        <>
            <div id="layout-wrapper">
                <TopHeader />
                <Navbar />
                    <div className="main-content">
                        <div className="page-content">
                            <div className="container-fluid">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                <Footer />
            </div>
        </>
    )

}
export default Layout;