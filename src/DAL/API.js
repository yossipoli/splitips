
const SERVER = 'https://tipsplit-server.cyclic.app/'
const LOCAL = 'https://localhost:4100/'

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
            return await fetch(`${SERVER}}/register`, postOption(values)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },

    login : async(values) => {
        try {
            return await fetch(`${SERVER}/login`, postOption(values)).then(res=> res.json());
        } catch{
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },
    
    forgot : async(values) => {
        try {
           return await fetch(`${SERVER}/forgot-password`, postOption(values)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },
    
    resetPassword : async(id, values) => {
        try {
            return await fetch(`${SERVER}/reset-password/${id}`, postOption(values)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },

    getEmployeeData : async(values) => {
        try {
            return await fetch(`${SERVER}/paycheck`, postOption(values)).then(res=> res.json());
        } catch {
            return null;
        }
    },
    
    getPayDays : async(values) => {
        try {
            return await fetch(`${SERVER}/days`, postOption(values)).then(res=> res.json());
        } catch {
            return null;
        }
    },

    changeTookTip : async(values) => {
        try {
            return await fetch(`${SERVER}/change-took-tip`, postOption(values)).then(res=> res.json());
        } catch {
            return false;
        }
    },

    addDay : async(value) => {
        try {
            return await fetch(`${SERVER}/add`, postOption(value)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },

    remove : async(value) => {
        try {
            return await fetch(`${SERVER}/remove`, postOption(value)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },

    checkCookie : async() => {
        try {
            return (await fetch(`${SERVER}/check-cookie`, {credentials: "include"}).then(res=> res.json())).res;
        } catch {
            return false;
        }
    },
    
    logout : () => fetch(`${SERVER}/logout`, {credentials: "include"})

}