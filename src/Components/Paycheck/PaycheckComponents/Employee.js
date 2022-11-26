import { useState } from 'react'
import { API } from '../../../DAL/API'
import './Employee.css'

function Employee({props, onChange}) {
    const [tookTip, setTookTip] = useState(props["לקח טיפ"])

    const handleClick = ()=> {
        onChange(+props["טיפ"]* ( tookTip ? 1 : (-1) ))
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
        {Object.entries(props).map((prop, idx)=> {
          if (prop[0] === "לקח טיפ"){
            return <td key={idx} className='tookTip' onClick={handleClick}>{tookTip? "V" : "X"}</td>
          }
        return <td key={idx}>{prop[1]}</td>
      })}    
    </tr>
  )
}

export default Employee