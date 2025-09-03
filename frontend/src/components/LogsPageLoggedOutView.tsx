import { User } from "../models/User";
import { useState } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";


interface LoginProps {
    onLoginSuccessful: (user: User) => void,
    onSignupSuccessful: (user: User) => void,
}

const LogsPageLoggedOutView = ({onLoginSuccessful, onSignupSuccessful}: LoginProps) => {
    const [loginShow, setLoginShow] = useState(true);
    const [signupShow, setSignupShow] = useState(false)
    
    return(
        <>
            <div className={`h-3/4 w-1/2 bg-white p-4 rounded-3xl flex justify-center items-center`}>
                <div className={`flex-col w-1/2 `}>
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