import "./Save.css";
import React from "react";
import { toast } from "react-toastify";
import { API } from "../../../../DAL/API";

function Save({ date, employeesIn, employeesOut, salary, perHour }) {
    
    const handleClick = async()=> {
        const employees = [];
        for (let idx in employeesIn) {
            employees.push({
                date,
                name: employeesIn[idx].name,
                start: employeesIn[idx].start,
                end: employeesIn[idx].end,
                hours: employeesOut[idx].hours,
                minimum: salary.minimum,
                perHour,
                salary: employeesOut[idx].salary,
                tip: employeesOut[idx].tips,
                expense: employeesOut[idx].tips < 0 ? employeesOut[idx].tips * (-1) : 0,
                tookTip: employeesIn[idx].tookTip ? 1: 0
            })
        }
        await API.remove({date})
        await API.removeSalary({date})
        const salaries = {...salary, date}
        await API.saveSalary({salaries})
        const res = await API.addDay({employees})
        toast[res.sign](res.msg)
    }

    return (
        <div>
            <div className="save">
                <button onClick={handleClick}>שמור</button>
            </div>
        </div>
    );
}

export default Save;
