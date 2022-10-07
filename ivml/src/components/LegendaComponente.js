import {Handle, Position } from 'react-flow-renderer';
import {FaPlus, FaInfo, FaTrashAlt} from 'react-icons/fa'
const handleStyle = { 
  height: '3px',
  width:  '3px'
};


const removeStyle = {
  color: 'red'
}

function LegendaComponente({data}) {

  return (
    <div className="rect-node">
      {<Handle type="target" position={Position.Left} style={handleStyle}/>}
      <div>
        <div className='corner-element'>{data.compCounter}</div>
        <br></br>
         <small><small><b>{data.name}</b></small></small>
        <br></br>
        <div className='container'>
        <button className='buttonSize' name="Info" > <FaInfo pointerEvents={'none'}/> </button>
        <button className='buttonSize' name="Add" > <FaPlus pointerEvents={'none'}/> </button>
        <button className='buttonSize' name="Remove" > <FaTrashAlt style={removeStyle} pointerEvents={'none'}/> </button>
        </div>
        {<Handle type="source" position={Position.Right}  style={handleStyle}/>}
      </div>
    </div>
  );
  }
export default LegendaComponente;
