import {Handle, NodeToolbar, Position} from 'reactflow';
import {FaInfo, FaTrashAlt} from 'react-icons/fa'
import {NodeResizer} from "@reactflow/node-resizer";

function Botao({data, selected}) {

    const handleVisibility = (trigger) => {
        if(data.actions.filter(action => action.trigger === trigger).length > 0)
            return {visibility: 'visible'}
        else
            return {visibility: 'hidden'};
    }
  

  return (
    <div className="button-node">
        <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
            <button title="Informação do Componente" name="Info"> <FaInfo pointerEvents={'none'}/> </button>
            <button title="Nova Interação" name="Interação"> Nova interação</button>
            <button title="Eliminar Componente" name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/></button>
        </NodeToolbar>
        <NodeResizer color="#307DBB" isVisible={selected} minWidth={50} minHeight={25} />
        <Handle className="handle_clique" type="source" position={Position.Right} id="Clique" style={handleVisibility("Clique")}/>
        <Handle className="handle_hover" type="source" position={Position.Right} id="Hover" style={handleVisibility("Hover")}/>
        <div>
          <div className='corner-element'>{data.compCounter}
          </div>
          <div className='componentNameStyle'>
            <b>{data.name}</b>
          </div>
            {<Handle type="target" position={Position.Left} id="a" style={{visibility: 'hidden'}} /> }
        </div>
    </div>
  );
}

export default Botao;
