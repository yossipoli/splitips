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
            return await fetch('http://localhost:4100/register', postOption(values)).then(res=> res.json());
        } catch {
            return "fail";
        }
    },

    login : async(values) => {
        try {
            return await fetch('http://localhost:4100/login', postOption(values)).then(res=> res.json());
        } catch{
            return "fail";
        }
    },
    
    forgot : async(values) => {
        try {
           return await fetch('http://localhost:4100/forgot-password', postOption(values)).then(res=> res.json());
        } catch {
            return "fail";
        }
    },
    
    resetPassword : async(id, values) => {
        try {
            return await fetch(`http://localhost:4100/reset-password/${id}`, postOption(values)).then(res=> res.json());
        } catch {
            return "fail";
        }
    },
}