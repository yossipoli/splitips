import { useState } from "react";
import "./Form.css";
import FormInput from "./InnerComponents/FormInput";

const Login = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "כתובת המייל שלך",
            errorMessage: "כתובת אימייל לא תקינה",
            label: "אימייל",
            required: true,
        },

        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "הקלד כאן את הסיסמה שלך",
            errorMessage: "סיסמה חייבת להיות באורך של 6 עד 20 תווים",
            label: "סיסמה",
            pattern: `[a-zA-Z0-9!@#$%^&*]{6,20}`,
            required: true,
        },
    ];

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(values);
    };

    return (
        <div className="form login">
            <form onSubmit={onSubmit}>
                <h1>התחברות</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <button>שלח</button>
            </form>
        </div>
    );
};


export default Login;
