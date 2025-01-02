import Navbar from "./navbar";

export default function Header({ categories }) {
    return (
        <div class="container-fluid nav-bar px-0 px-lg-4 py-lg-0 mb-2">
            <div class="container">
                <Navbar categories={categories} />
            </div>
        </div>
    );
}