import './Add.css'

function Add({add}) {
  return (
    <div className='add'>
        <button className='addBtn' onClick={add}>
            הוסף מלצר
        </button>
    </div>
  )
}

export default Add