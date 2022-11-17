import { useState, useEffect } from "react";
import "./App.css";
import Employee from "./Components/Employee/Employee";
import Add from "./Components/Add/Add";
import Header from "./Components/Salaries/Salaries";
import Logo from "./Components/Logo/Logo";

const employeeIn = () => ({
    name: "",
    start: "",
    end: "",
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
    return +(end - start + (end - start < 0 ? 24 : 0)).toFixed(2);
};

function App() {
    const [salariesIn, setSalariesIn] = useState({
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

    const handleSalariesChange = (prop, value) => {
        setSalariesIn({
            ...salariesIn,
            [prop]: value,
        });
    };

    const updateEmployee = (idx, prop, value) => {
        const nextEmployees = [...employeesIn];
        nextEmployees[idx][prop] = value;
        setEmployeesIn(nextEmployees);
    };

    const remove = (idx) => {
        console.log(idx)
    };

    useEffect(() => {
        const allTips = ((100 - +salariesIn.percent) / 100) * +salariesIn.credit + +salariesIn.cash;
        let totalHours = 0;
        const nextEmployees = [];

        for (const emp of employeesIn) {
            const nextEmployee = employeeOut(emp.index);
            nextEmployee.hours = calculateHoursDifference(emp.start, emp.end) || 0;
            totalHours += nextEmployee.hours;
            nextEmployee.salary = +salariesIn.minimum * nextEmployee.hours;
            nextEmployees.push(nextEmployee);
        }

        const nextPerHour = !totalHours ? 0 : allTips / totalHours;

        for (const emp of nextEmployees) {
            emp.tips = emp.hours ? nextPerHour*emp.hours - emp.salary : 0;
        }

        setEmployeesOut(nextEmployees);
        setPerHour(nextPerHour);
    }, [employeesIn, salariesIn]);

    return (
        <div className="App">
            <Logo />

            <Header
                salariesIn={salariesIn}
                perHour={perHour}
                onChange={handleSalariesChange}
            />

            {employeesOut.map((emp, idx) => (
                <Employee
                    key={idx}
                    employeeIn={employeesIn[idx]}
                    employeeOut={emp}
                    remove={remove}
                    onChange={updateEmployee}
                    idx={idx}
                />
            ))}

            <Add add={add} />
        </div>
    );
}

export default App;
