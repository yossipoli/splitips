import { useState } from "react";
import FormInput from "./InnerComponents/FormInput";

const Register = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "הכנס כתובת מייל, לדוגמה avi@gmail.com",
            errorMessage: "כתובת אימייל אינה תקינה",
            label: "אימייל",
            required: true,
        },

        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "הקלד כאן את הסיסמה שלך",
            errorMessage: "סיסמה חייבת להיות לפחות באורך 6 תווים ולא יותר מ20",
            label: "סיסמה",
            pattern: `[a-zA-Z0-9!@#$%^&*]{6,20}`,
            required: true,
        },
        {
            id: 3,
            name: "confirmPassword",
            type: "password",
            placeholder: "רק מוודים שזו הסיסמה",
            errorMessage: "הסיסמאות לא תואמות",
            label: "סיסמה בשנית",
            pattern: values.password,
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
        <div className="form register">
            <form onSubmit={onSubmit}>
                <h1>הרשמה</h1>
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

export default Register;
