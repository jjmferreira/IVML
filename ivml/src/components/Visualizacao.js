import {NodeToolbar, Handle, Position } from 'reactflow';
import {FaInfo, FaTrashAlt} from 'react-icons/fa'
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';

//bootstrap
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const Visualizacao = ({data, selected}) => {

  const handleVisibility = (trigger) => {
    if(data.actions.filter(action => action.trigger === trigger).length > 0)
      return {visibility: 'visible'}
    else
      return {visibility: 'hidden'};
  }

  const popover = (
    data.tooltip !== "" ? 
    <Popover id="popover-basic">
      <Popover.Header as="h3">Título: {data.tooltip.title}</Popover.Header>
      <Popover.Body>
        <>
        {data.tooltip.dataComps.length !== 0 ? 
        <>
        <p>Dados da tooltip:</p>
        <ul>
          {data.tooltip.dataComps.map(data => <li key={data}> {data} </li>)}
        </ul>
        </> : ""}
        
        <p>Descrição: {data.tooltip.description}</p>
        </>
      </Popover.Body>
    </Popover> : ""
  );

  return (
    <>
      <div className="vis-node" >
        <NodeToolbar className="node-toolbar" isVisible={selected} position={Position.Top}>
            <button title="Informação do Componente" name="Info"> <FaInfo pointerEvents={'none'}/> </button>
            {data.tooltip !== "" ? 
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
              <Button variant="success" className="btn-primary">Tooltip!</Button>
            </OverlayTrigger> : ""}
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
export default Visualizacao;
