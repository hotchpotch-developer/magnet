import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import TopHeader from "./TopHeader";
import { useContext } from "react";
import Navbar from "./Navbar";
import { Context } from "./Context";


const Layout = () => {
    const [context] = useContext(Context)

    return (
        <>
            <div id="layout-wrapper">
                {context && context.auth && <>
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
                </>}
            </div>
        </>
    )

}
export default Layout;