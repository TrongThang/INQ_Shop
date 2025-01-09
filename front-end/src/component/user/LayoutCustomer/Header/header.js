import Navbar from "./navbar";

export default function Header({ categories, isLogged }) {

    return (
        <div className="nav-bar px-0 px-lg-4 py-lg-0 mb-2">
            <div className="container">
                <Navbar categories={categories} isLogged={isLogged} />
            </div>
        </div>
    );
}