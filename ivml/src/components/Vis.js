import {Handle, Position } from 'react-flow-renderer';
import {FaPlus, FaInfo, FaTrashAlt} from 'react-icons/fa'
//import { NodeResizer, NodeResizeControl } from '@reactflow/node-resizer';
//import '@reactflow/node-resizer/dist/style.css';


const handleStyle = { 
  height: '1px',
  width:  '1px'
};

const removeStyle = {
  color: 'red'
}

const Vis = ({data}) => {

  const sizeValues = {
    height: '' + data.height + 'px',
    width: '' + data.width + 'px'
  }
  
  const adaptaptableWidth = {
    width: '' + data.width + 'px'
  }

  return (
    <>
    <div className="vis-node" style={sizeValues}>
        <div className='miniContainer'>
        <button className='miniButtonSize iconSize' name="Info"> <FaInfo pointerEvents={'none'}/> </button>
        <button className='miniButtonSize iconSize' name="Add" > <FaPlus pointerEvents={'none'}/> </button>
        <button  className='miniButtonSize iconSize' name="Remove" > <FaTrashAlt style={removeStyle} pointerEvents={'none'}/> </button>
        </div>
      {data.interIcon !== "" ? <Handle type="source" position={Position.Right} 
        style={{backgroundImage: `url(${data.interIcon})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '10px', height:'10px'}}/> 
        :
      <Handle type="source" position={Position.Right} id="b" style={handleStyle} /> }
      <div className='corner-element'>{data.compCounter}  </div>
      <div className='componentNameStyle' style={adaptaptableWidth}>
        <b>{data.name}</b>
      </div>
      {<Handle type="target" position={Position.Left} id="a" style={handleStyle} /> }
    </div>
    </>
    
  );
  }
export default Vis;
