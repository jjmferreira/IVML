import {Handle, NodeToolbar, Position} from 'reactflow';
import {FaPlus, FaInfo, FaTrashAlt} from 'react-icons/fa'
import {NodeResizer} from "@reactflow/node-resizer";
const handleStyle = { 
  height: '3px',
  width:  '3px'
};

const removeStyle = {
  color: 'red'
}

function ParameterBindingComponent({data, selected}) {
  
  const sizeValues = {
    height: '' + data.height + 'px',
    width: '' + data.width + 'px'
  }
  
  const adaptaptableWidth = {
    width: '' + data.width + 'px'
  }

  return (
    <div className="parameterB-node"  >
        <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
            <button  name="Info"> <FaInfo pointerEvents={'none'}/> Info</button>
            <button name="Add" > <FaPlus pointerEvents={'none'}/> Adicionar </button>
            <button  name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/> Remover</button>
        </NodeToolbar>
        <NodeResizer color="#307DBB" style={sizeValues} isVisible={selected} minWidth={50} minHeight={35} />
      {<Handle type="target" position={Position.Left} style={handleStyle}/>}
      <div className='componentNameStyle' style={adaptaptableWidth}>
        <b>{data.name}</b>
      </div>
        <div><ul style={{paddingTop: 10, paddingInlineStart: 15, fontSize: 10}}>
            {data.parameterOptions.map((option, index) => (<li key={index}> {option} </li>))}
        </ul></div>
      {<Handle type="source" position={Position.Right} id="a" style={handleStyle} /> }

    </div>
  );
  }
export default ParameterBindingComponent;
