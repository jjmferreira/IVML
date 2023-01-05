import {NodeToolbar, Handle, Position } from 'reactflow';
import {FaPlus, FaInfo, FaTrashAlt} from 'react-icons/fa'
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';


const handleStyle = { 
  height: '1px',
  width:  '1px'
};


const Vis = ({data, selected}) => {

  const sizeValues = {
    height: '' + data.height + 'px',
    width: '' + data.width + 'px'
  }
  
  const adaptaptableWidth = {
    width: '' + data.width + 'px'
  }

  return (
    <>
      <div className="vis-node" >
        <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
            <button  name="Info"> <FaInfo pointerEvents={'none'}/> Info</button>
            <button name="Add" > <FaPlus pointerEvents={'none'}/> Adicionar </button>
            <button  name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/> Remover</button>
        </NodeToolbar>
        <NodeResizer color="#307DBB" isVisible={selected} minWidth={75} minHeight={75} />

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
