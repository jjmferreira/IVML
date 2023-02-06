import {FaTrashAlt} from 'react-icons/fa'
import {Handle, NodeToolbar, Position} from "reactflow";
import {NodeResizer} from "@reactflow/node-resizer";


function Titulo({data, selected}) {

  return (
  <div className="titulo-node" >
    <small className='text-margin'><b>{data.name}</b></small>
    <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
      <button  name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/> Remover</button>
    </NodeToolbar>
    <NodeResizer color="#307DBB" isVisible={selected} minWidth={50} minHeight={25} />
    {<Handle type="target" position={Position.Left} id="a" style={{visibility: 'hidden'}} isConnectable={false}/> }
  </div>
  );
}

export default Titulo;