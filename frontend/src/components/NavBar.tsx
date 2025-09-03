import { Nav, Navbar } from "react-bootstrap";
import { User } from "../models/User";
import NavBarLoggedIn from "./NavBarLoggedIn";
import styles from "../styles/util.module.css";

interface NavbarProps {
    user: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
    onAddClicked: () => void,
}

const NavBar = ({user,onLoginClicked: onLoginSuccessful, onLogoutSuccessful, onSignUpClicked: onSignUpSuccessful, onAddClicked}: NavbarProps) => {
    return(
        <Navbar className={`${styles.dark} flex flex-col w-32 rounded-3xl h-full`}>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar" className={`h-full`}>
                <Nav className = "ms-auto h-full">
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