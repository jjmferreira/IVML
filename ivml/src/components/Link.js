import {FaTrashAlt} from 'react-icons/fa'
import {NodeToolbar, Position, Handle} from "reactflow";
import {NodeResizer} from "@reactflow/node-resizer";
import url from "../imagens/Icones/URL.png"



function Link({data, selected}) {

  return (
  <div className="link-node" >
    <div style={{position:'relative'}}>
      <img src={url} alt="test" className='url_handle'></img>
    </div>
        <div className='componentNameStyle'>
        <a href={("https://"+ data.name)} target='_blank'>{data.name}</a>
    </div>    
    <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
      <button  name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/> Remover</button>
    </NodeToolbar>
    <NodeResizer color="#307DBB" isVisible={selected} minWidth={80} minHeight={30} />
    {<Handle type="target" position={Position.Left} id="a" style={{visibility: 'hidden'}} isConnectable={false}/> }
  </div>
  );
}

export default Link;