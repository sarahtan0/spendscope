import { useForm } from "react-hook-form";
import { User } from "../models/User";
import { LoginCredentials } from "../networks/logs_api";
import * as LogsApi from "../networks/logs_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInput";
import styles from "../styles/util.module.css";


interface LoginProps {
    onLoginSuccessful: (user: User) => void
}

const LogsPageLoggedOutView = ({onLoginSuccessful}: LoginProps) => {
    const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm<User>();


    async function onSubmit(credentials: LoginCredentials){
            try {
                const response = await LogsApi.login(credentials);
                onLoginSuccessful(response);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
    
    return(
        // <div className={`h-full flex items-center justify-center`}>
        //     <h1 className={`text-4xl font-bold`}>Please log in to see your notes</h1>
        // </div> 
        <div className={`h-auto w-96 bg-white p-4 rounded-lg`}>
            <Modal.Title>Log In</Modal.Title>
                <Form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        label="Username"
                        name="username"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.username}
                    />
                    <TextInputField
                        label="Password"
                        name="password"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.password}
                    />
                </Form>
            <Button
                type="submit"
                form="loginForm"
                disabled={isSubmitting}
            > Submit
            </Button>
        </div>
    );
}

export default LogsPageLoggedOutView;