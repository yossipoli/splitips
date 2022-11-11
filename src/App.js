import { useState } from "react";
import "./App.css";
import Employee from "./Components/Employee/Employee";
import Add from "./Components/Footer/Add";
import Header from "./Components/Header/Header";
import Logo from "./Components/Logo/Logo";

let index = 0;

const employee = (index) => ({
    index,
    name: "",
    start: "",
    end: "",
    hours: 0,
    salary: 0,
    tips: 0,
});

const calculateDifferenceHours = (start, end) => {
    start = start.split(":");
    end = end.split(":");
    start = +start[0] + +start[1] / 60;
    end = +end[0] + +end[1] / 60;
    return +(end - start + (end - start < 0 ? 24 : 0)).toFixed(2);
};

const calculateSalaries = ({ moneyDetails, employees }) => {
    const nextEmployees = [...employees];
    const nextMoneyDetails = { ...moneyDetails };
    nextMoneyDetails.allTips =
        ((100 - +nextMoneyDetails.percent) / 100) * +nextMoneyDetails.credit +
        +nextMoneyDetails.cash;

        nextMoneyDetails.perHour =
            +(nextMoneyDetails.allTips / nextMoneyDetails.totalHours).toFixed(2) || 0;

        if (nextMoneyDetails.perHour === Infinity) nextMoneyDetails.perHour = 0

        for (const emp of nextEmployees) {
            emp.salary = +(emp.hours * nextMoneyDetails.minimum).toFixed(2);
            emp.tips = +(
                emp.hours * nextMoneyDetails.perHour -
                emp.salary
            ).toFixed(2);
        }

    return {
        calculatedMoneyDetails: nextMoneyDetails,
        updatedEmployees: nextEmployees,
    };
};

function App() {
    const [moneyDetails, setMoneyDetails] = useState({
        cash: 0,
        credit: 0,
        percent: 20,
        allTips: 0,
        minimum: 40,
        perHour: 0,
        totalHours: 0,
    });

    const [employees, setEmployees] = useState([employee(index)]);

    const add = () => {
        index++;
        setEmployees([...employees, employee(index)]);
    };

    const updateEmployee = (index, detail, value) => {
        let nextEmployees = [...employees];
        const employeeIndex = nextEmployees.findIndex(
            (emp) => emp.index === index
        );
        const nextEmployee = { ...nextEmployees[employeeIndex] };
        nextEmployee[detail] = value;
        nextEmployees[employeeIndex] = nextEmployee;

        if (
            detail !== "name" &&
            nextEmployee.start !== "" &&
            nextEmployee.end !== ""
        ) {
            const nextMoneyDetails = { ...moneyDetails };
            nextMoneyDetails.totalHours -= nextEmployee.hours;
            nextEmployee.hours = calculateDifferenceHours(
                nextEmployee.start,
                nextEmployee.end
            );
            nextMoneyDetails.totalHours += nextEmployee.hours;
            const { calculatedMoneyDetails, updatedEmployees } =
                calculateSalaries({
                    moneyDetails: nextMoneyDetails,
                    employees: nextEmployees,
                });
            nextEmployees = updatedEmployees;
            setMoneyDetails(calculatedMoneyDetails);
        }

        setEmployees(nextEmployees);
    };

    const remove = (index, hours) => {
        const nextMoneyDetails = { ...moneyDetails };
        nextMoneyDetails.totalHours = nextMoneyDetails.totalHours - hours;
        let nextEmployees = employees.filter((emp) => emp.index !== index);

        const { calculatedMoneyDetails, updatedEmployees } = calculateSalaries({
            moneyDetails: nextMoneyDetails,
            employees: nextEmployees,
        });

        setMoneyDetails(calculatedMoneyDetails);
        setEmployees(updatedEmployees);
    };

    return (
        <div className="App">
            <Logo />

            <Header
                moneyDetails={moneyDetails}
                onChange={(nextValue) => {
                    const { calculatedMoneyDetails, updatedEmployees } =
                        calculateSalaries({
                            employees,
                            moneyDetails: { ...moneyDetails, ...nextValue },
                        });
                    setEmployees(updatedEmployees);
                    setMoneyDetails(calculatedMoneyDetails);
                }}
            />

            {employees.map((emp, idx) => (
                <Employee
                    key={emp.index}
                    employee={emp}
                    remove={remove}
                    onChange={(detail, value) =>
                        updateEmployee(emp.index, detail, value)
                    }
                    idx={idx}
                />
            ))}

            <Add add={add} />
        </div>
    );
}

export default App;
