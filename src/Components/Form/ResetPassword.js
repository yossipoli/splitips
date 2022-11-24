import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { API } from "../../DAL/API";
import FormInput from "./InnerComponents/FormInput";

const ResetPassword = () => {
    const nav = useNavigate()
    const {id} = useParams()

    const [values, setValues] = useState({
        password: "",
        confirmPassword: "",
    });

    const inputs = [
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "הקלד כאן את הסיסמה החדשה שלך",
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

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await API.resetPassword(id, values);
        switch (res) {
            case "wrong":
                toast.warning("משתמש לא מוכר");
                break;
            case "success":
                toast.success("הסיסמה שלך שונתה בהצלחה");
                setTimeout(() => nav("/all"), 2000);
                break;
            default:
                toast.error("אירעה שגיאה");
        }
    };

    return (
        <div>
            <div className="alert">
                <ToastContainer />
            </div>
            <div className="form resetPassword">
                <form onSubmit={onSubmit}>
                    <h1>חידוש סיסמה</h1>
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
        </div>
    );
};

export default ResetPassword;
