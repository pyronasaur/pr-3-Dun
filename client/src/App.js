import React from "react";
import GWin from "./components/GWin/index";
//import Crafty from "craftyjs";


function App() {
  return <div>
    <GWin id="game" canvas="canvas1" cWidth="800" cHeight="300" class="gwin"/>
    <GWin id="game2" canvas="canvas2"cWidth="800" cHeight="300" class="gwin"/> 
    <GWin id="game3" canvas="canvas2"cWidth="800" cHeight="300" class="gwin"/> 
  </div>;
}

export default App;
