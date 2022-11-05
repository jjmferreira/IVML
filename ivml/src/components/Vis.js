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

  const sizeValues = {
    height: '' + data.height + 'px',
    width: '' + data.width + 'px'
  }

  return (
    <div className="vis-node" style={sizeValues}>
       <div className='container'>
        <button className='buttonSize' name="Info" > <FaInfo  pointerEvents={'none'} className='t'/> </button>
        <button className='buttonSize' name="Add" > <FaPlus pointerEvents={'none'} className='t'/> </button>
        <button className='buttonSize' name="Remove" > <FaTrashAlt style={removeStyle} pointerEvents={'none'} className='t'/> </button>
        </div>
      {<Handle type="target" position={Position.Left} style={handleStyle}/>}
      <div className='corner-element'>{data.compCounter}</div>
      <div>
        <h6><b>{data.name}</b></h6>
        <small><p></p></small>  
       
        {<Handle type="source" position={Position.Right} id="a" style={handleStyle} /> }
      </div>
    </div>
  );
  }
export default Vis;
