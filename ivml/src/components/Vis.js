import {Handle, Position } from 'react-flow-renderer';
import {FaPlus, FaInfo, FaTrashAlt} from 'react-icons/fa'
const handleStyle = { 
  height: '3px',
  width:  '3px'
};

const removeStyle = {
  color: 'red'
}

function Vis({data}) {

  return (
    <div className="vis-node">
      {<Handle type="target" position={Position.Left} style={handleStyle}/>}
      <div className='corner-element'>{data.compCounter}</div>
      <div>
        <h6><b>{data.name}</b></h6>
        <small><p></p></small>  
        <div className='container'>
        <button className='buttonSize' name="Info" > <FaInfo  pointerEvents={'none'}/> </button>
        <button className='buttonSize' name="Add" > <FaPlus pointerEvents={'none'}/> </button>
        <button className='buttonSize' name="Remove" > <FaTrashAlt style={removeStyle} pointerEvents={'none'}/> </button>
        </div>
        {<Handle type="source" position={Position.Right} id="a" style={handleStyle} /> }
      </div>
    </div>
  );
  }
export default Vis;
