import {Handle, NodeToolbar, Position} from 'reactflow';
import {FaInfo, FaPlus, FaTrashAlt} from 'react-icons/fa'
import {NodeResizer} from "@reactflow/node-resizer";


const handleStyle = { 
  height: '1px',
  width:  '1px'
};

const removeStyle = {
  color: 'red',
}

function ButComponente({data, selected}) {
  const sizeValues = {
    height: '' + data.height + 'px',
    width: '' + data.width + 'px'
  }

  const adaptaptableWidth = {
    width: '' + (data.width-30) + 'px'
  }
  

  return (
    <div className="button-node">
        <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
            <button  name="Info"> <FaInfo pointerEvents={'none'}/> Info</button>
            <button  name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/> Remover</button>
        </NodeToolbar>
        <NodeResizer color="#307DBB" style={sizeValues} isVisible={selected} minWidth={50} minHeight={25} />
        {data.interIcon !== "" ? <Handle type="source" position={Position.Right} 
        style={{backgroundImage: `url(${data.interIcon})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '10px', height:'10px'}}/> 
        :
      <Handle type="source" position={Position.Right} id="b" style={handleStyle} /> }
        <div>
          <div className='corner-element'>{data.compCounter}
          </div>
          <div className='componentNameStyle' style={adaptaptableWidth}>
            <b>{data.name}</b>
          </div>
          {<Handle type="target" position={Position.Left} id="a" style={handleStyle} /> }
        </div>
    </div>
  );
}

export default ButComponente;
