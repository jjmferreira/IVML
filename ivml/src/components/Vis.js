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
  
  const adaptaptableWidth = {
    width: '' + data.width + 'px'
  }

  return (
    <div className="vis-node" style={sizeValues}>
        <div className='miniContainer'>
        <button className='miniButtonSize iconSize' name="Info"> <FaInfo pointerEvents={'none'}/> </button>
        <button className='miniButtonSize iconSize' name="Add" > <FaPlus pointerEvents={'none'}/> </button>
        <button  className='miniButtonSize iconSize' name="Remove" > <FaTrashAlt style={removeStyle} pointerEvents={'none'}/> </button>
        </div>
      {<Handle type="target" position={Position.Left} style={handleStyle}/>}
      <div className='corner-element'>{data.compCounter}  </div>
      <div className='componentNameStyle' style={adaptaptableWidth}>
        <b>{data.name}</b>
      </div>
      {<Handle type="source" position={Position.Right} id="a" style={handleStyle} /> }

    </div>
  );
  }
export default Vis;
