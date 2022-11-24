//POST requests options
const postOption = (obj)=> ({
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(obj)
  })

export const API = {
    register : async(values) => (await fetch('http://localhost:4100/register', postOption(values)).then(res=> res.json())).res,

    login : async(values) => (await fetch('http://localhost:4100/login', postOption(values)).then(res=> res.json())).res,
    
    forgot : async(values) => (await fetch('http://localhost:4100/forgot-password', postOption(values)).then(res=> res.json())).res,
    
    resetPassword : async(id, values) => (await fetch(`http://localhost:4100/reset-password/${id}`, postOption(values)).then(res=> res.json())).res,
}