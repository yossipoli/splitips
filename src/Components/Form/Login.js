import "./Form.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useState } from "react";
import { API } from "../../DAL/API";
import FormInput from "./InnerComponents/FormInput";
import { Link } from "react-router-dom";

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
            placeholder: "הכנס את כתובת המייל שלך",
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

    const onSubmit = async(e) => {
        e.preventDefault()
        const res = await API.login(values)
        toast[res.sign](res.msg)
        if (res.sign === "success") window.location.replace("/")
    };
    
    return (
        <div>
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
                    <Link to="/forgot-password"> שכחתי סיסמה </Link>
                    <button>שלח</button>
                </form>
            </div>
        </div>
    );
};


export default Login;
