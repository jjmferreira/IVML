import {FaTrashAlt} from 'react-icons/fa'
import {NodeToolbar, Position, Handle} from "reactflow";
import {NodeResizer} from "@reactflow/node-resizer";


function Link({data, selected}) {

  return (
  <div className="link-node" >
    <div className='corner-element'>{data.compCounter}  </div>
        <div className='componentNameStyle'>
        <a href={data.name}>Click me!</a>        
    </div>    
    <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
      <button  name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/> Remover</button>
    </NodeToolbar>
    <NodeResizer color="#307DBB" isVisible={selected} minWidth={50} minHeight={25} />
    {<Handle type="target" position={Position.Left} id="a" style={{visibility: 'hidden'}} /> }
  </div>
  );
}

export default Link;