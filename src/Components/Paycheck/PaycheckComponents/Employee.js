import './Employee.css'

function Employee({props}) {
  return (
    <tr>
        {Object.values(props).slice(2).map((prop, idx)=> <td key={idx}>{prop}</td>)}
    </tr>
  )
}

export default Employee