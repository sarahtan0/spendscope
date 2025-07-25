import { Button, Container, Navbar } from "react-bootstrap";
import { User } from "../models/User";

interface NavbarProps {
    user: string,
    loggedIn: boolean,
}

const NavBar = ({user,loggedIn}: NavbarProps) => {
    return(
        <>
            {loggedIn ?
                <Navbar>
                    <Container>
                        <Navbar.Brand>SpendScope</Navbar.Brand>
                        <Navbar.Text>Signed in as: {user}</Navbar.Text>
                    </Container>
                </Navbar>
            :
                <Navbar>
                    <Container>
                        <Navbar.Brand>SpendScope</Navbar.Brand>
                        <Button>Login</Button>
                        <Button>Sign Up</Button>
                    </Container>
                </Navbar>
            }
        </>
    );
}

export default NavBar;