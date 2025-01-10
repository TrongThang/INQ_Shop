import { Link } from "react-router-dom";
import AreaCustomer from "../Header/areaCustomer";
import SearchHeader from "./searchHeader";
import RecursiveDropdown from "./recursiveDropdown";
import { useSettingWeb } from "../../../../context/settingWebContext";

export default function Navbar({categories, isLogged}) {
    const { setting } = useSettingWeb();
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between align-items-center text-nowrap">
            {/* <!-- Logo --> */}
            <Link to="/" className="navbar-brand p-0 me-auto">
                <h1 className="text-primary mb-0">
                    {/* {}<i className="fab fa-slack me-2"></i>INQ Shop */}
                    {<div dangerouslySetInnerHTML={{ __html: setting.LOGO }} /> }
                </h1>
            </Link>
            {/* <!-- Toggler for Mobile View --> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars"></span>
            </button>
            {/* <!-- Navbar Links --> */}
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav mx-auto">
                    <Link to={ setting.LINK_NAVBAR_INDEX } className="nav-item nav-link active">{ setting.LAYOUT_NAVBAR_INDEX }</Link>
                    <div className="nav-item dropdown">
                        <div className="nav-link" data-bs-toggle="dropdown">
                            <span className="dropdown-toggle">Danh mục</span>
                        </div>
                        <div className="dropdown-menu">
                            <RecursiveDropdown items={[
                                    {
                                        label: "Mục 1.1",
                                        link: "#"
                                    },
                                    {
                                        label: "Mục 1.2",
                                        link: "#",
                                        children: [
                                            {
                                                label: "Mục 1.2.1",
                                                link: "#"
                                            },
                                            {
                                                label: "Mục 1.2.2",
                                                link: "#"
                                            }
                                        ]
                                    },
                                    {
                                        label: "Mục 1.3",
                                        link: "#"
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    

                    <Link to={setting.LINK_NAVBAR_INTRODUTION} className="nav-item nav-link">{ setting.LAYOUT_NAVBAR_INTRODUTION || "Giới thiệu" }</Link>
                    <Link to={setting.LINK_NAVBAR_BLOG} className="nav-item nav-link">{setting.LAYOUT_NAVBAR_BLOG || "Bài viết"}</Link>
                    <Link to={setting.LINK_NAVBAR_CONTACT} className="nav-item nav-link">{setting.LAYOUT_NAVBAR_CONTACT || "Liên hệ"}</Link>
                </div>
            </div>

            <SearchHeader />
            <AreaCustomer isLogged={isLogged} />
        </nav>
    );
};
