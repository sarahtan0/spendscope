import { User } from "../models/User";
import { useState } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import SpendingCategoryWidget from "./widgets/SpendingCategoryWidget";
import { Card } from "react-bootstrap";
import styles from "../styles/util.module.css";


interface LoginProps {
    onLoginSuccessful: (user: User) => void,
    onSignupSuccessful: (user: User) => void,
}

const LogsPageLoggedOutView = ({onLoginSuccessful, onSignupSuccessful}: LoginProps) => {
    const [loginShow, setLoginShow] = useState(true);
    const [signupShow, setSignupShow] = useState(false)
    
    return(
        <>
         {/* <Card className={`h-2/6 ${styles.widgetCard}`}>
            <Card.Header className={styles.widgetHead}>
                <h1 className="text-xl">Top Spending Categories</h1>
            </Card.Header>
            <Card.Body className="grid w-full gap-1 sm:grid-cols-3">
                <>
                    <SpendingCategoryWidget
                        color="red"
                        section={"Clothes"}
                        percentage={89.2}
                        cost={70}
                    />
                    <SpendingCategoryWidget
                        color="orange"
                        section={"Essential"}
                        percentage={89.2}
                        cost={70}
                    />
                    <SpendingCategoryWidget
                        color="green"
                        section={"Misc"}
                        percentage={89.2}
                        cost={70}
                    />
                </>
            </Card.Body>
        </Card> */}
            <div className={`h-3/4 w-full md:w-1/2 bg-transparent flex justify-center items-center`}>
                <div className={`flex-col sm:w-1/2 w-10/12 `}>
                    {loginShow && 
                        <LoginModal
                            onLoginSuccessful={(user)=>{
                                onLoginSuccessful(user)
                            }}
                            onSignUpClick={() => {
                                setLoginShow(false);
                                setSignupShow(true);
                            }}
                        />
                    }
                    {signupShow && 
                        <SignUpModal
                            onSignUpSuccessful={(user)=>{
                                onSignupSuccessful(user)
                            }}
                            onLoginClicked={() => {
                                setLoginShow(true);
                                setSignupShow(false);
                            }}
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default LogsPageLoggedOutView;