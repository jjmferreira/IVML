import React, {useState} from "react";
import CriarComponente from "./CriarComponente";
import InfoForm from "./InfoForm";
import CriarInteracao from "./CriarInteracao";

const Sidebar = ({createComp, nodes, selected, edges, getName, editNode, createAction}) => {

    const allowsInteractions = selected !== "" && selected.type !== "varvisual" && selected.type !== "grafico";

    return (
    <div className="sidebar">
        {selected !== "" ? <>
            <InfoForm editComponent={editNode} edges={edges} nodes={nodes} getName={getName} selectedNode={selected}/>
            <CriarComponente createComp={createComp} parent={selected}/>
            {allowsInteractions ? <CriarInteracao getName={getName} edges={edges} nodes={nodes} source={selected} actionsDone={createAction}/> : null}
            </> : <CriarComponente createComp={createComp} parent={""}/>}
        {/*<div><div className="box-header"><b>Dashboard</b></div><hr/> {createLayout(nodes, selectNode)}</div>
        {selected !== undefined ? (
            nodeDetail(nodes, nodes.find(node => node.id === selected),
                edges.filter(edge => edge.source === selected || edge.target === selected), editNode)
        ) : null}*/}
    </div> );
};

function createLayout(nodes, selectNode){
    const parents = nodes.slice();
    const children = nodes.slice();
    return <div className="box-content" style={{height: "300px", overflowY: "scroll", overflowX: "hidden", whiteSpace: "nowrap"}}>
        <ul style={{textOverflow: "ellipsis", margin: "0px", paddingLeft: "16px"}}>{parents.filter((node) => node.parentNode === "").map((node) => (
        <li key={node.id} value={node.id} >
            <label onClick={() => selectNode(node.id)}>{aux(parents, node)}</label>
            <ul>
            {children.filter((child) => child.parentNode === node.id).map((n) => (
                <li key={n.id} value={n.id}>
                    <i onClick={() => selectNode(n.id)}>{aux(nodes, n)}</i>
                </li>
            ))}</ul>
        </li>
    ))}</ul></div>
}

function nodeDetail(nodes, node, edges, editNode){

    const interactions = edges.filter((edge) => edge.source === node.id && nodes.find(n => n.id === edge.target) !== undefined);
    const triggers = edges.filter((edge) => edge.target === node.id && nodes.find(n => n.id === edge.source) !== undefined);
    const hasName = (node.type !== undefined && node.type !== "graficoUpdater" && node.type !== "imgUpdater");

    const type = (node.type !== undefined ? (node.type === "graficoUpdater" ? "Gráfico de " + node.data.graphType
        : (node.type === "imgUpdater" ? "Variável Visual " + node.data.varName : node.type.replace("Updater", ""))) : "" );

    function changeName(name){
        const n = node;
        n.data.name = name;
        editNode(n);
    }

    return <div style={{bottom:"0px"}}><div className="box-header"><b>Detalhes do Componente</b></div><hr/>
            <div className="box-content" style={{height: "210px", overflowY: "scroll", overflowX: "hidden"}}>
                <b>Tipo: </b>
                {(node.data.compCounter !== undefined ? "[" + node.data.compCounter + "] " : "") + type}
                {hasName ? (<div><br/>
                <b>Nome: </b>
                <input id="text" type="text" value={node.data.name === undefined ? "" : node.data.name}
                       onChange={(e) => changeName(e.target.value) }/></div>
                ) : null}
                <br/><b>Componentes Afetados</b>
                {interactions.length > 0 ? (<div>
                    <ul style={{margin: "0px", paddingLeft: "16px"}}>
                        {interactions.map((edge) => (
                            <li key={edge.id} value={nodes.find(n => n.id === edge.target)}>
                                {console.log(nodes.find(n => n.id === edge.target))}
                                {aux(nodes, nodes.find(n => n.id === edge.target))}
                            </li>
                        ))}</ul>
                </div>) : <div>Nenhum</div>}
                <br/><b>Componentes Acionadores</b>
                {triggers.length > 0 ? (<div>
                    <ul style={{margin: "0px", paddingLeft: "16px"}}>
                        {triggers.map((edge) => (
                            <li key={edge.id} value={nodes.find(n => n.id === edge.source)}>
                                {aux(nodes, nodes.find(n => n.id === edge.source))}
                            </li>
                        ))}</ul>
                </div>) : <div>Nenhum</div>}
            </div>
    </div>;
}

function aux (nodes, curNode) {
    if (curNode !== undefined && curNode.data !== undefined) {
        let nodeName = curNode.data.name;
        if (curNode.data.compCounter !== undefined) {
            return "[" + curNode.data.compCounter + "] " + nodeName;
        } else {
            switch (curNode.type.replace("Updater", "")) {
                case "grafico":
                    nodeName = "Gráfico de " + curNode.data.graphType;
                    break;
                case "img":
                    nodeName = "Variável Visual " + curNode.data.varName;
                    break;
                case "titulo":
                    nodeName = "Título: " + nodeName;
                    break;
                case "dados":
                    nodeName = "Dados: " + nodeName;
                    break;
                case "acaoDados":
                    nodeName = "Ação de " + curNode.data.actionResultType;
                    break;
                case "parameterBinding":
                    nodeName = "Parameter Binding: " + nodeName;
                    break;
                default:
                    nodeName = curNode.type.replace("Updater", "");
                    break;
            }
            if (curNode.parentNode !== "") {
                nodes.map((node) => {
                    if (node.id === curNode.parentNode) {
                        //console.log(nodeName + "(" + node.data.compCounter + ")")
                        return nodeName + " (em " + node.data.compCounter + ")";
                    }
                })
            }
        }
        return nodeName;
    }
    return "";
}

export default Sidebar;
