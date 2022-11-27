import { useState, useEffect } from "react";
import "./../../App.css";
import Employee from "./InnerComponents/Employee/Employee";
import Add from "./InnerComponents/Add/Add";
import MoneyDetails from "./InnerComponents/Salaries/Salaries";
import Save from "./InnerComponents/Save/Save";

const getTodayDate = ()=> {

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    return yyyy + '-' + mm + '-' + dd;
}

const employeeIn = () => ({
    name: "",
    start: "",
    end: "",
    tookTip: true,
});

const employeeOut = () => ({
    hours: 0,
    salary: 0,
    tips: 0,
});

const calculateHoursDifference = (start, end) => {
    start = start.split(":");
    end = end.split(":");
    start = +start[0] + +start[1] / 60;
    end = +end[0] + +end[1] / 60;
    return Math.round((end - start + (end - start < 0 ? 24 : 0)) * 100) /100
};

function Splitter() {

    const [date, setDate] = useState(getTodayDate())

    const [salaries, setSalaries] = useState({
        cash: 0,
        credit: 0,
        percent: 20,
        minimum: 40,
    });

    const [perHour, setPerHour] = useState(0);

    const [employeesIn, setEmployeesIn] = useState([employeeIn()]);
    const [employeesOut, setEmployeesOut] = useState([employeeOut()]);

    const add = () => {
        setEmployeesIn([...employeesIn, employeeIn()]);
    };

    const duplicate = (idx) => {
        const copy = {...employeesIn[idx]};
        copy.name = '';
        setEmployeesIn([...employeesIn, copy])
    } 

    const handleSalariesChange = (prop, value) => {
        setSalaries({
            ...salaries,
            [prop]: value,
        });
    };

    const updateEmployee = (idx, prop, value) => {
        const nextEmployees = [...employeesIn];
        if(prop==="tookTip"){
            nextEmployees[idx][prop] = value === "true" ? true : false
        } else {
            nextEmployees[idx][prop] = value;
        }
        setEmployeesIn(nextEmployees);
    };

    const remove = (idx) => {
        setEmployeesOut([...employeesOut.slice(0,idx), ...employeesOut.slice(idx+1)])
        setEmployeesIn([...employeesIn.slice(0,idx), ...employeesIn.slice(idx+1)])
    };

    useEffect(() => {
        const allTips = ((100 - +salaries.percent) / 100) * +salaries.credit + +salaries.cash;
        let totalHours = 0;
        const nextEmployees = [];

        for (const emp of employeesIn) {
            const nextEmployee = employeeOut(emp.index);
            nextEmployee.hours = calculateHoursDifference(emp.start, emp.end) || 0;
            totalHours += nextEmployee.hours;
            nextEmployee.salary = +salaries.minimum * nextEmployee.hours;
            nextEmployees.push(nextEmployee);
        }

        const nextPerHour = !totalHours ? 0 : allTips / totalHours;

        for (const emp of nextEmployees) {
            emp.tips = emp.hours ? nextPerHour*emp.hours - emp.salary : 0;
        }

        setEmployeesOut(nextEmployees);
        setPerHour(nextPerHour);
    }, [employeesIn, salaries]);

    return (
        <div className="App">

            <h1>מחשבון שכר</h1>
            <div>
                <div>תאריך</div>
                <div>
                    <input type="date" value={date} onChange={e=> setDate(e.target.value)}/>
                </div>
            </div>
            <MoneyDetails
                salariesIn={salaries}
                perHour={perHour}
                onChange={handleSalariesChange}
            />

            {employeesOut.map((emp, idx) => (
                <Employee
                    key={idx}
                    employeeIn={employeesIn[idx]}
                    employeeOut={emp}
                    duplicate={duplicate}
                    remove={remove}
                    onChange={updateEmployee}
                    idx={idx}
                />
            ))}

            <Add add={add} />
            <Save date={date} employeesIn= {employeesIn} employeesOut={employeesOut} salary={salaries} perHour={perHour}/>
        </div>
    );
}

export default Splitter;
