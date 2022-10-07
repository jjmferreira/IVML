import area from "../imagens/Gráficos/Área.PNG"
import barras from "../imagens/Gráficos/Barras.PNG"
import barrasEmp from "../imagens/Gráficos/Barras Empilhadas.PNG"
import barrasEmp100 from "../imagens/Gráficos/Empilhadas 100.PNG"
import dispersao from "../imagens/Gráficos/Dispersão.PNG"
import gant from "../imagens/Gráficos/Gant.PNG"
import hexabin from "../imagens/Gráficos/Hexabin.PNG"
import linha from "../imagens/Gráficos/Linha.PNG"
import mapa from "../imagens/Gráficos/Mapa.PNG"
import mapaCalor from "../imagens/Gráficos/Mapa de Calor.PNG"
import mapaCoropletico from "../imagens/Gráficos/Mapa Coroplético.PNG"
import multiLinhas from "../imagens/Gráficos/Múltiplas Linhas.PNG"
import pontos from "../imagens/Gráficos/Pontos.PNG"
import relogio from "../imagens/Gráficos/Relógio.PNG"
import tabela from "../imagens/Gráficos/Tabela.PNG"
import texto from "../imagens/Gráficos/Texto.PNG"

function GraficoComponente({data}) {

    const switchVariable = () => {
        switch(data.graphType){
          case "Área": return (<img src={area} alt="test" className='graph-node'></img>)
          case "Barras": return (<img src={barras} alt="test" className='graph-node'></img>)
          case "Barras Empilhadas": return (<img src={barrasEmp} alt="test" className='graph-node'></img>)
          case "Empilhadas 100": return (<img src={barrasEmp100} alt="test" className='graph-node'></img>)
          case "Texto": return (<img src={texto} alt="test" className='graph-node'></img>)
          case "Pontos": return (<img src={pontos} alt="test" className='graph-node'></img>)
          case "Dispersão": return (<img src={dispersao} alt="test" className='graph-node'></img>)
          case "Gant": return (<img src={gant} alt="test" className='graph-node'></img>)
          case "Hexabin": return (<img src={hexabin} alt="test" className='graph-node'></img>)
          case "Linha": return (<img src={linha} alt="test" className='graph-node'></img>)
          case "Mapa": return (<img src={mapa} alt="test" className='graph-node'></img>)
          case "Mapa de Calor": return (<img src={mapaCalor} alt="test" className='graph-node'></img>)
          case "Mapa Coroplético": return (<img src={mapaCoropletico} alt="test" className='graph-node'></img>)
          case "Múltiplas Linhas": return (<img src={multiLinhas} alt="test" className='graph-node'></img>)
          case "Relógio": return (<img src={relogio} alt="test" className='graph-node'></img>)
          case "Tabela": return (<img src={tabela} alt="test" className='graph-node'></img>)
        }
      } 
  return (
<div >
      <div>
        {switchVariable()}
      </div>
    </div>
  );
}

export default GraficoComponente;
