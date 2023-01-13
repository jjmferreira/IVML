import {FaTrashAlt} from 'react-icons/fa'
import {NodeToolbar, Position} from "reactflow";
import {NodeResizer} from "@reactflow/node-resizer";

const removeStyle = {
  color: 'red'
}


function Titulo({data, selected}) {

  
  const sizeValues = {
    height: '' + data.height + 'px',
    width: '' + data.width + 'px'
  }

  return (
  <div className="titulo-node" >
    <small className='text-margin'><b>{data.name}</b></small>
    <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
      <button  name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/> Remover</button>
    </NodeToolbar>
    <NodeResizer color="#307DBB" isVisible={selected} minWidth={50} minHeight={25} />
  </div>
  );
}

export default Titulo;