import { useEffect } from "react"
import { Link } from "react-router-dom"
import authStore from "../stores/authStore"

const Navbar = () => {
    const store = authStore();

    useEffect(() => {
        if(store.loggedIn === null || store.user._id === ''){
            store.checkAuth()
        }
    })

    return (
        <header>
            <Link to="/" className="logo">MyLogo</Link>
            <nav>
                {store.loggedIn && (
                    <>
                        <Link to="/create">Create Post</Link>
                        <a onClick={store.logout}>Logout</a>
                    </>
                )}
                {!store.loggedIn && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Navbar