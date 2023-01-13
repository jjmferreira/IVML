import {Handle, NodeToolbar, Position} from 'reactflow';
import {FaTrashAlt, FaInfo} from 'react-icons/fa'
import {NodeResizer} from "@reactflow/node-resizer";

function Dados({data, selected}) {

    const handleVisibility = (trigger) => {
        if(data.actions.filter(action => action.trigger === trigger).length > 0)
            return {visibility: 'visible'}
        else
            return {visibility: 'hidden'};
    }

  return (
    <div className="dados-node">
        <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
            <button  name="Info"> <FaInfo pointerEvents={'none'}/> </button>
            <button  name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/> </button>
        </NodeToolbar>
        <NodeResizer color="#307DBB" isVisible={selected} minWidth={20} minHeight={20} />
        <Handle className="handle_clique" type="source" position={Position.Right} id="Clique" style={handleVisibility("Clique")}/>
        <Handle className="handle_hover" type="source" position={Position.Right} id="Hover" style={handleVisibility("Hover")}/>
        {/*<small><b>{data.name}</b></small>*/}
        <small className='text-margin'><b>{data.name}</b></small>
        {/*<img src={testImage} alt="test"></img>*/}
        {/*<small><small><small>Tipo dos dados: {data.datatype}</small></small></small> */}
        {<Handle type="source" position={Position.Bottom} id="a" style={{visibility: 'hidden'}} /> }
    </div>
  );
}

export default Dados;
