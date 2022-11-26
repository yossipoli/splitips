import { useState } from 'react'
import { API } from '../../../DAL/API'
import './Employee.css'

function Employee({props}) {
    const [tookTip, setTookTip] = useState(props["לקח טיפ"]? true : false)
    delete props["לקח טיפ"]

    const handleClick = ()=> {
        setTookTip(!tookTip)
        !API.changeTookTip({
            name: props["שם"],
            date: props["תאריך"],
            tookTip: tookTip ? 0 : 1 //its revers because its before the render
        })
        && alert("אירעה שגיאה")
    }
  return (
    <tr className='employeeData'>
        {Object.values(props).map((prop, idx)=> <td key={idx}>{prop}</td>)}
        <td className='tookTip' onClick={handleClick}>{tookTip? "V" : "X"}</td>
    </tr>
  )
}

export default Employee