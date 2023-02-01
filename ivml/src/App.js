import React, {useCallback, useState} from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges,
  ReactFlowProvider, useReactFlow, useOnSelectionChange} from 'reactflow';
import { SmartStepEdge } from '@tisoap/react-flow-smart-edge';
import 'reactflow/dist/style.css';
import 'bootstrap/dist/css/bootstrap.css';

import Dados from './components/Dados';
import Visualizacao from './components/Visualizacao';
import Legenda from './components/Legenda';
import Filtro from './components/Filtro';
import Titulo from './components/Titulo';
import Botao from './components/Botao';
import Parametro from './components/Parametro';
import Grafico from "./components/Grafico";
import VarVisuais from './components/VariavelVisual';
import Dashboard from './components/Dashboard'
import Link from './components/Link'




import './components/componentes.css';
import Sidebar from "./Sidebar";

const edgeTypes = {
  default: SmartStepEdge,
  straight: SmartStepEdge //backwards compatibility
}

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { dados: Dados, visualizacao: Visualizacao, legenda: Legenda, filtro: Filtro,
  titulo: Titulo, varvisual: VarVisuais, grafico: Grafico, botao: Botao, parametro: Parametro, dashboard: Dashboard, link:Link};

const initialNodes = [
  //{ id: 'node-1', type: 'visUpdater', position: { x: 0, y: 0 }, data: { name: 'Tratamento', datatype: 'Arbitrário'}},
  //{ id: 'node-2', type: 'dadosUpdater', position: { x: 10, y: 10 }, data: { name: 'Dados1' }, parentNode:"node-1", extent:'parent'},
];

const initialEdges = [
  //{ id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
];

const rfStyle = {backgroundColor: '#B8CEFF'};
const flowKey = 'example-flow';

function App() {

  const { setViewport } = useReactFlow();
  const [rfInstance, setRfInstance] = useState(null);

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);


  //Variável para passar o id do parent node
  const [parentNode, setParentNode] = useState("");



  /** Save and export flow **/
  //save
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);


  //export
  const exportJSON = () => {
    const flow = rfInstance.toObject();
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(flow)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "dashboardPrototype.json";

    link.click();
  }

  /** Restore and import flow **/
  //restore
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      setupFlow(flow);
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  //import
  const chooseFile = (event) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = e => {
      importJSON(e.target.result)
    };
  }

  const importJSON = useCallback((file) => {
    const restoreFlow = async () => {
      const flow = JSON.parse(file);
      setupFlow(flow);
    };
    restoreFlow();
  }, [setNodes, setViewport]);

  //setup for import and restore
  function setupFlow(flow){
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
      }
    }


  /** Default flow change callbacks */
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  /** This hook lets you listen to selection changes */
  useOnSelectionChange({
    onChange: ({ nodes: nds, edges:eds }) => {
      // se houver um node selecionado, definir como parent
      let selectedNode = nds.find(node => node.selected)
      if (selectedNode === undefined)
        selectedNode = "";
      if (parentNode.id !== selectedNode.id)
        setParentNode(selectedNode);

      const selectedEdge = eds.find(e => e.selected);
      setEdges(edges.map(edge => {
        //apenas mostrar label se houver um edge selecionado
        let isVisible = selectedEdge !== undefined ? edge.id === selectedEdge.id : false;

        const source = nodes.find(node => node.id === edge.source);
        if (source !== undefined){
          const action = source.data.actions.find(action => action.id === edge.data);
          if (action !== undefined) {
            //mostrar sempre labels de dashboards e links
            if (action.result === "Dashboard" || action.result === "Link") {
              edge.label = action.result;
            } else { //construir label da ação
              //procurar edges que contêm a mesma source e action
              const actionEdges = edges.filter(ed => ed.source === source.id && ed.data === action.id);
              //procurar componentes afetados pela mesma ação
              const targets = nodes.filter(nd => actionEdges.find(t => t.target === nd.id) !== undefined);
              edge.label = action.result + " por " + action.trigger + " =>" + targets.map(target => " " + nodeLabel(target));
            }
          }
        }

        if (isVisible) {
          edge.labelStyle = {visibility: 'visible'};
          edge.zIndex = 2;
        }else {
          edge.labelStyle = {visibility: 'hidden'};
          edge.zIndex = 0;
        }

        edge.labelShowBg = isVisible;
        return edge;
      }));
    },
  });

  const createNode = (node) => {
    if (node === undefined || node.type === ''){
      alert('Escolha um tipo de componente')
    } else if (node.type === "dados" && node.data.name === ''){
      alert('You cant create a data component without name')
      return;
    }

    //adicionar novo node
    let n = JSON.parse(JSON.stringify(node));
    n.id = nodes.length === 0 ? "0" : "" + (parseInt(nodes[nodes.length-1].id)+1);
    const components = nodes.filter(nd => nd.type === node.type);
    console.log(components);
    const lastIndex = components.length === 0 ? "0" : "" + (parseInt(components[components.length-1].data.compCounter.substr(1))+1);
    if(n.type !== "titulo" && n.type !== "dados" && n.type !== "varvisual" && n.type !== "grafico")
      n.data.compCounter = node.type.substr(0,1).toUpperCase() + lastIndex;
    setNodes([...nodes, n]);

    return n;
  }

  function editNode(node){
    const idx = nodes.findIndex(n => n.id === node.id); //find index of node to edit
    setNodes([...nodes.slice(0, idx), node, ...nodes.slice(idx+1)]); //replace nodes[idx] with edited node
  }

  const createInteraction = (source, eds) => {
    //add actions to node
    editNode(source);
    //add new edges
    let counter = edges.length === 0 ? 0 : parseInt(edges[edges.length-1].id)+1;
    eds.map(edge => {
      edge.id = '' + counter;
      counter++;
    });
    setEdges([...edges, ...eds]);
  }


  const createNavigation = (newNode, source, edge) => {
    let n = createNode(newNode);
    if(nodes.find(nde => nde.id === n.id) === undefined){
      const idx = nodes.findIndex(n => n.id === source.id); //find index of node to edit
      setNodes([...nodes.slice(0, idx), source, ...nodes.slice(idx+1), n]); //replace nodes[idx] with edited node
    } else{
      editNode(source);
    }
    let counter = edges.length === 0 ? 0 : parseInt(edges[edges.length-1].id)+1;
    edge.id = '' + counter;
    edge.target = '' + n.id;
    setEdges([...edges, edge]);
  }

  const createTooltip = (tooltip, parent) =>{
    let n = nodes.find(n => n.id === parent.id);
    n.data.tooltip = tooltip;
    editNode(n);
  }

  const eliminateTooltip = (parent) =>{
    let n = nodes.find(n => n.id === parent.id);
    n.data.tooltip = '';
    editNode(n);
  }

  const editNavNode = (node) =>{
    console.log(node.type + " Na APp")
    editNode(node);
  }



  const deleteActionFromNode = (eds) => {
    eds.map(edge => {
      const sourceNode = nodes.find(node => node.id === edge.source);
      //delete only if no more edges with same source and action
      if(edges.find(ed => ed.id !== edge.id && ed.source === edge.source && ed.data === edge.data) === undefined)
        sourceNode.data.actions = sourceNode.data.actions.filter((action) => (action.id !== edge.data));
    });
  }

  const nodeLabel = (node) => {
    let nodeName = node.data.name;
    if(node.data.compCounter !== ''){
      return node.data.compCounter;
    } else {
      let string = nodeName === '' ? "Componente de " + node.type : nodeName;
      if(node.parentNode !== undefined && node.parentNode !== ""){
        const parentNode = nodes.find(n => n.id === node.parentNode);
        string += " (em " + parentNode.data.compCounter + ")";
      }
      return string;
    }
  }

 const iconsSetUp = (click, node) => {
  let buttonName = click.target.name;
    switch(buttonName){
      case "Remove":
        const result = nodes.filter((n) => (n.id !== node.id) && (n.parentNode !== node.id));
        setNodes(result);
        setEdges(edges.filter((ed) => (result.includes(n => n.id === ed.source || n.id === ed.target))));
        break;
      default: return;
    } 
 }

  return (<>
    <div className='side'>
      <Sidebar
        nodes={nodes}
        edges={edges}
        createComp={createNode}
        selected={parentNode}
        editNode={editNode}
        getName={nodeLabel}
        createAction={createInteraction}
        createNavigation={createNavigation}
        createTooltip={createTooltip}
        eliminateTooltip={eliminateTooltip}
        editNavNode={editNavNode}/>
        <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={(event, node) => iconsSetUp(event, node)}
        fitView
        style={rfStyle}
        onInit={setRfInstance}
        onEdgesDelete={(edges) => deleteActionFromNode(edges)}
        deleteKeyCode={'Delete'}>
      <div className="header">
        <div className="save__controls">
          <button onClick={onSave}>Guardar</button>
          <button onClick={onRestore}>Restaurar</button>
          <button onClick={exportJSON}>Exportar Dashboard</button>
          <input type="file" onChange={chooseFile}/>
        </div>
      </div>
    </ReactFlow>
    </div>
    
    </>
  );
}

export default () => (<ReactFlowProvider>
  <App />
</ReactFlowProvider>);