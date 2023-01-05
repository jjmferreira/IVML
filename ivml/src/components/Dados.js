import {Handle, NodeToolbar, Position} from 'reactflow';
import {FaTrashAlt, FaInfo, FaPlus} from 'react-icons/fa'
import {NodeResizer} from "@reactflow/node-resizer";

const handleStyle = { 
  height: '3px',
  width:  '3px'
};


const removeStyle = {
  color: 'red',
}

function Dados({data, selected}) {

  return (
    <div className="dados-node">
        <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
            <button  name="Info"> <FaInfo pointerEvents={'none'}/> Info</button>
            <button  name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/> Remover</button>
        </NodeToolbar>
        <NodeResizer color="#307DBB" isVisible={selected} minWidth={20} minHeight={20} />
      {<Handle type="target" position={Position.Top} style={handleStyle}/>}
        {/*<small><b>{data.name}</b></small>*/}
        <small className='text-margin'><b>{data.name}</b></small>
        {/*<img src={testImage} alt="test"></img>*/}
        {/*<small><small><small>Tipo dos dados: {data.datatype}</small></small></small> */}
        {<Handle type="source" position={Position.Bottom} id="a" style={handleStyle} /> }
    </div>
  );
}

export default Dados;
