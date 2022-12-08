
// eslint-disable-next-line no-unused-vars
const SERVER = 'https://https://tipsplit-server.herokuapp.com'
// eslint-disable-next-line no-unused-vars
const LOCAL = 'http://localhost:4100'

const HOST = SERVER

//POST requests options
const postOption = (obj)=> ({
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(obj)
  })

export const API = {
    register : async(values) => {
        try {
            return await fetch(`${HOST}/register`, postOption(values)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },

    login : async(values) => {
        try {
            return await fetch(`${HOST}/login`, postOption(values)).then(res=> res.json());
        } catch{
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },
    
    forgot : async(values) => {
        try {
           return await fetch(`${HOST}/forgot-password`, postOption(values)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },
    
    resetPassword : async(id, values) => {
        try {
            return await fetch(`${HOST}/reset-password/${id}`, postOption(values)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },

    getEmployeeData : async(values) => {
        try {
            return await fetch(`${HOST}/paycheck`, postOption(values)).then(res=> res.json());
        } catch {
            return null;
        }
    },
    
    getPayDays : async(values) => {
        try {
            return await fetch(`${HOST}/days`, postOption(values)).then(res=> res.json());
        } catch {
            return null;
        }
    },

    getDateSalary : async(values) => {
        try {
            return (await fetch(`${HOST}/salary-date`, postOption(values)).then(res=> res.json()))[0];
        } catch {
            return null;
        }
    },

    changeTookTip : async(values) => {
        try {
            return await fetch(`${HOST}/change-took-tip`, postOption(values)).then(res=> res.json());
        } catch {
            return false;
        }
    },

    addDay : async(value) => {
        try {
            return await fetch(`${HOST}/add`, postOption(value)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },

    saveSalary : async(value) => {
        try {
            return await fetch(`${HOST}/save-salary`, postOption(value)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },

    remove : async(value) => {
        try {
            return await fetch(`${HOST}/remove`, postOption(value)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },

    removeSalary : async(value) => {
        try {
            return await fetch(`${HOST}/remove-salary`, postOption(value)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },

    checkCookie : async() => {
        try {
            return (await fetch(`${HOST}/check-cookie`, {credentials: "include"}).then(res=> res.json())).res;
        } catch {
            return false;
        }
    },
    
    logout : () => fetch(`${HOST}/logout`, {credentials: "include"})

}