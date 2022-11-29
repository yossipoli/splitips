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
            return await fetch('https://easy-pear-penguin-tux.cyclic.app/register', postOption(values)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },

    login : async(values) => {
        try {
            return await fetch('https://easy-pear-penguin-tux.cyclic.app/login', postOption(values)).then(res=> res.json());
        } catch{
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },
    
    forgot : async(values) => {
        try {
           return await fetch('https://easy-pear-penguin-tux.cyclic.app/forgot-password', postOption(values)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },
    
    resetPassword : async(id, values) => {
        try {
            return await fetch(`https://easy-pear-penguin-tux.cyclic.app/reset-password/${id}`, postOption(values)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },

    getEmployeeData : async(values) => {
        try {
            return await fetch(`https://easy-pear-penguin-tux.cyclic.app/paycheck`, postOption(values)).then(res=> res.json());
        } catch {
            return null;
        }
    },
    
    getPayDays : async(values) => {
        try {
            return await fetch(`https://easy-pear-penguin-tux.cyclic.app/days`, postOption(values)).then(res=> res.json());
        } catch {
            return null;
        }
    },

    changeTookTip : async(values) => {
        try {
            return await fetch(`https://easy-pear-penguin-tux.cyclic.app/change-took-tip`, postOption(values)).then(res=> res.json());
        } catch {
            return false;
        }
    },

    addDay : async(value) => {
        try {
            return await fetch(`https://easy-pear-penguin-tux.cyclic.app/add`, postOption(value)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },

    remove : async(value) => {
        try {
            return await fetch(`https://easy-pear-penguin-tux.cyclic.app/remove`, postOption(value)).then(res=> res.json());
        } catch {
            return {sign: "error", msg:"אירעה שגיאה"};
        }
    },

    checkCookie : async() => {
        try {
            return (await fetch(`https://easy-pear-penguin-tux.cyclic.app/check-cookie`, {credentials: "include"}).then(res=> res.json())).res;
        } catch {
            return false;
        }
    },
    
    logout : () => fetch(`https://easy-pear-penguin-tux.cyclic.app/logout`, {credentials: "include"})

}