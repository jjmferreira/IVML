import {NodeToolbar, Handle, Position } from 'reactflow';
import {FaTrashAlt} from 'react-icons/fa'
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';

const Dashboard = ({data, selected}) => {

  const handleVisibility = (trigger) => {
    if(data.actions.filter(action => action.trigger === trigger).length > 0)
      return {visibility: 'visible'}
    else
      return {visibility: 'hidden'};
  }

  return (
    <>
      <div className="dashboard-node" >
        <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
            <button title="Eliminar Componente" name="Remove" > <FaTrashAlt style={{color: 'red'}} pointerEvents={'none'}/></button>
        </NodeToolbar>
        <NodeResizer color="#307DBB" isVisible={selected} minWidth={100} minHeight={75} />
             <Handle className="handle_clique" type="source" position={Position.Right} id="Clique" style={handleVisibility("Clique")} isConnectable={false}/>
             <Handle className="handle_hover" type="source" position={Position.Right} id="Hover" style={handleVisibility("Hover")} isConnectable={false}/>
        <div className='corner-element'>{data.compCounter}  </div>
        <div className='componentNameStyle'>
            <b>{data.name}</b>
        </div>
        {<Handle type="target" position={Position.Left} id="a" style={{visibility: 'hidden'}} isConnectable={false}/> }
      </div>
    </>
    
  );
  }
export default Dashboard;
