import { useForm } from "react-hook-form";
import { User } from "../models/User";
import { Button, Form, Modal } from "react-bootstrap";
import * as LogsApi from "../networks/logs_api";
import TextInputField from "./form/TextInput";

interface SignUpProps {
    onDismiss: () => void,
    onSignUpSuccessful: (user: User) => void
}

function SignUpModal({onDismiss, onSignUpSuccessful}: SignUpProps) {
    const {register, handleSubmit, formState : {errors, isSubmitting}} = useForm<User>();

    async function onSubmit(input: User){
        try{
            const response = await LogsApi.signUp(input);
            onSignUpSuccessful(response);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    return(
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>SpendScope</Modal.Title>
                <h2>Sign Up</h2>
            </Modal.Header>
            <Modal.Body>
                <Form id="signUpForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        label="Username"
                        name="username"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.username}
                    />
                    <TextInputField
                        label="Email"
                        name="email"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.email}
                    />
                    <TextInputField
                        label="Password"
                        name="password"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.password}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="submit"
                    form="signUpForm"
                    disabled={isSubmitting}
                > Submit
                </Button>
            </Modal.Footer>
            
        </Modal>
    );
}

export default SignUpModal;