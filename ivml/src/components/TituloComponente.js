import {FaTrashAlt} from 'react-icons/fa'

const removeStyle = {
  color: 'red'
}


function TituloComponente({data}) {

  return (
  <div className="titulo-node">
    <small><b>{data.name}</b></small>
    <div className='miniContainer'>
    <button className='miniButtonSize iconSize' name="Remove" > <FaTrashAlt style={removeStyle} pointerEvents={'none'}/> </button>
    </div>
  </div>
  );
}

export default TituloComponente;