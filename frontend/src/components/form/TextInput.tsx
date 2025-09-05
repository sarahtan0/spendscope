import {Form} from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
    label: string,
    name: string,
    //specific register needed to connect between the form and hook form
    register: UseFormRegister<any>
    registerOptions?: RegisterOptions,
    error?: FieldError,
    type: string,
    //any other variables
    [x: string]: any,
}

const TextInputField = ({type, label, name, register, registerOptions, error, ...props}: TextInputFieldProps) => {
    return(
        <Form.Group className={"mb-3 w-full"} controlId = {name + "-input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                {...props}
                placeholder={label}
                {...register(name, registerOptions)}
                isInvalid={!!error}
                type={type}
            />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
    );
}

export default TextInputField;