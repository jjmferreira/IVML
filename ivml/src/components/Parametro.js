import {Handle, NodeToolbar, Position} from 'reactflow';
import {FaTrashAlt} from 'react-icons/fa'
import {NodeResizer} from "@reactflow/node-resizer";

function Parametro({data, selected}) {

    const handleVisibility = (trigger) => {
        if(data.actions.filter(action => action.trigger === trigger).length > 0)
            return {visibility: 'visible'}
        else
            return {visibility: 'hidden'};
    }

  return (
    <div className="parameter-node" >
        <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
            <button title="Eliminar Componente" name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/></button>
        </NodeToolbar>
        <NodeResizer color="#307DBB" isVisible={selected} minWidth={100} minHeight={50} />
        <Handle className="handle_clique" type="source" position={Position.Right} id="Clique" style={handleVisibility("Clique")} isConnectable={false}/>
        <Handle className="handle_hover" type="source" position={Position.Right} id="Hover" style={handleVisibility("Hover")} isConnectable={false}/>
      <div>
          <div className='corner-element'>{data.compCounter}</div>
          <div className='componentNameStyle'>
              {data.name === "" ? <br/> : <b>{data.name}</b>}
              {data.parameterOptions.length > 0 ?
              <select style={{marginRight: "10px", width: "70px"}} className='parameterSelect' name="category" defaultValue={'DEFAULT'} >
                  <option value="DEFAULT">Opções</option>
                  {data.parameterOptions.map((option) => (
                      <option disabled key={option}>{option}</option>
                  ))}
              </select> : null}
          </div>
          {<Handle type="target" position={Position.Left} id="a" style={{visibility:'hidden'}} isConnectable={false}/> }
        </div>
    </div>
  );
}

export default Parametro;
