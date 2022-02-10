import React, {
    useEffect,
    useState
} from 'react';
import {
    useNavigate,
    Outlet,
    Link
} from 'react-router-dom';
import './App.css';
import { authService } from "./services/auth"
import SearchBar from "./components/searchBar";

export default function App() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        let subscription = authService.currentUser.subscribe((authUser) => {
            setUser(authUser);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [user]);

    const logout = () => {
        authService.logout();
        navigate("/", { replace: true });
    }

    return (
        <div className="centered">

            <header className="border-bottom border-dark border-4">
                <nav className="navbar-expand-sm navbar-toggleable-sm ng-white box-shadow mb-3">

                    <div className="container d-flex justify-content-between">

                        <Link className="text-black text-decoration-none" to="/">
                            <div className="header-top">

                                <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-puzzle-fill" viewBox="0 0 16 16">
                                    <path d="M3.112 3.645A1.5 1.5 0 0 1 4.605 2H7a.5.5 0 0 1 .5.5v.382c0 .696-.497 1.182-.872 1.469a.459.459 0 0 0-.115.118.113.113 0 0 0-.012.025L6.5 4.5v.003l.003.01c.004.01.014.028.036.053a.86.86 0 0 0 .27.194C7.09 4.9 7.51 5 8 5c.492 0 .912-.1 1.19-.24a.86.86 0 0 0 .271-.194.213.213 0 0 0 .036-.054l.003-.01v-.008a.112.112 0 0 0-.012-.025.459.459 0 0 0-.115-.118c-.375-.287-.872-.773-.872-1.469V2.5A.5.5 0 0 1 9 2h2.395a1.5 1.5 0 0 1 1.493 1.645L12.645 6.5h.237c.195 0 .42-.147.675-.48.21-.274.528-.52.943-.52.568 0 .947.447 1.154.862C15.877 6.807 16 7.387 16 8s-.123 1.193-.346 1.638c-.207.415-.586.862-1.154.862-.415 0-.733-.246-.943-.52-.255-.333-.48-.48-.675-.48h-.237l.243 2.855A1.5 1.5 0 0 1 11.395 14H9a.5.5 0 0 1-.5-.5v-.382c0-.696.497-1.182.872-1.469a.459.459 0 0 0 .115-.118.113.113 0 0 0 .012-.025L9.5 11.5v-.003l-.003-.01a.214.214 0 0 0-.036-.053.859.859 0 0 0-.27-.194C8.91 11.1 8.49 11 8 11c-.491 0-.912.1-1.19.24a.859.859 0 0 0-.271.194.214.214 0 0 0-.036.054l-.003.01v.002l.001.006a.113.113 0 0 0 .012.025c.016.027.05.068.115.118.375.287.872.773.872 1.469v.382a.5.5 0 0 1-.5.5H4.605a1.5 1.5 0 0 1-1.493-1.645L3.356 9.5h-.238c-.195 0-.42.147-.675.48-.21.274-.528.52-.943.52-.568 0-.947-.447-1.154-.862C.123 9.193 0 8.613 0 8s.123-1.193.346-1.638C.553 5.947.932 5.5 1.5 5.5c.415 0 .733.246.943.52.255.333.48.48.675.48h.238l-.244-2.855z" />
                                </svg>

                                <h1 className="mx-2 my-0 align-self-center"><strong>PIECE OF MIND</strong></h1>

                            </div>
                        </Link>

                        <ul className="navbar-nav flex-grow">
                            {!user
                                // if we are not logged in
                                ? <div className="d-flex">
                                    <Link className="text-dark m-1" to="/login">
                                        <div className="btn btn-dark">
                                            Login
                                        </div>
                                    </Link>
                                    <Link className="text-dark m-1" to="/register">
                                        <div className="btn btn-dark">
                                            Register
                                        </div>
                                    </Link>
                                </div>
                                // if we are logged in
                                :
                                <div className="d-flex justify-content-start align-items-center">
                                    <img style={{ margin: "auto", height: 35 }} src={process.env.PUBLIC_URL + "/images/profile.png"} alt="..." />
                                    <div className="p-2">
                                        <h6 style={{ margin: "auto" }} className="nice-font">{user.username}</h6>
                                    </div>
                                    <SearchBar />
                                    <button className="btn btn-dark" onClick={logout} style={{ float: "right" }}>Logout</button>
                                </div>
                            }
                        </ul>

                    </div>

                </nav>
            </header>

            <Outlet />

        </div>
    );
}
