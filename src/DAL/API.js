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
    
}