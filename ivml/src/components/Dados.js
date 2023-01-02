import { Handle, Position } from 'react-flow-renderer';
import {FaTrashAlt, FaInfo} from 'react-icons/fa'

const handleStyle = { 
  height: '3px',
  width:  '3px'
};


const removeStyle = {
  color: 'red',
}

function Dados({data}) {

  return (
    <div className="dados-node">
      {<Handle type="target" position={Position.Top} style={handleStyle}/>}
        {/*<small><b>{data.name}</b></small>*/}
        <small className='text-margin'><b>{data.name}</b></small>
        {/*<img src={testImage} alt="test"></img>*/}
        {/*<small><small><small>Tipo dos dados: {data.datatype}</small></small></small> */}
        <div className='miniContainer'>
        <button className='miniButtonSize iconSize' name="Remove" > <FaTrashAlt style={removeStyle} pointerEvents={'none'}/> </button>
        <button className='miniButtonSize iconSize' name="Info"> <FaInfo pointerEvents={'none'}/> </button>
        </div>
        {<Handle type="source" position={Position.Bottom} id="a" style={handleStyle} /> }
    </div>
  );
}

export default Dados;
