import {Handle, Position } from 'react-flow-renderer';
import {FaPlus, FaInfo, FaTrashAlt} from 'react-icons/fa'
const handleStyle = { 
  height: '3px',
  width:  '3px'
};

const removeStyle = {
  color: 'red'
}


function AcaoDadosComponente({data}) {

  return (
    <div className="acao-dados-node">
      {<Handle type="source" position={Position.Top} style={handleStyle}/>}
      <div>
        <br></br>
          <small><small><b>{data.name}</b></small></small>
          </div>  
         <br></br>
        <div className='container'>
        <button className='buttonSize' name="Info" > <FaInfo pointerEvents={'none'}/> </button>
        <button className='buttonSize' name="Add" > <FaPlus pointerEvents={'none'}/> </button>
        <button className='buttonSize' name="Remove" > <FaTrashAlt style={removeStyle} pointerEvents={'none'}/> </button>
        </div>
        {<Handle type="target" position={Position.Bottom} id="a" style={handleStyle} /> }
      </div>
  );
  }
export default AcaoDadosComponente;
