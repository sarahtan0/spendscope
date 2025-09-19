import { Nav, Navbar } from "react-bootstrap";
import { User } from "../models/User";
import NavBarLoggedIn from "./NavBarLoggedIn";
import styles from "../styles/util.module.css";

interface NavbarProps {
    user: User | null,
    onLogoutSuccessful: () => void,
    onAddClicked: () => void,
}

const NavBar = ({user, onLogoutSuccessful, onAddClicked}: NavbarProps) => {
    return(
        <Navbar className={`${styles.navbar} ${styles.dark} `}>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar" className={`h-full`}>
                    <Nav className = "ms-auto h-full w-full">
                        {user 
                        ? <NavBarLoggedIn user={user} onLogoutSuccessful={onLogoutSuccessful} onAddClicked={onAddClicked}/>
                        : <></>
                        }
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;

// absolute sm:static z-10 sm:z-0 sm:h-full w-screen flex sm:flex-col sm:w-32 sm:rounded-3xl sm:h-full 