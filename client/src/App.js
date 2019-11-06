import React, {Component} from "react";
import { connect } from "react-redux";
import GWin from "./components/GWin/index";
// import store from "./config/store.js";

function stateToProperty(state) {
  return {
    ...state.gwin
  }
}



// let gwindows = store.getState();

class App extends Component {

  constructor(props) {
    super(props);

    console.log(this.props);
  }
  
  // store.subscribe(() => {
  //   gwindows = store.getState();
  // })
  

  render(){
    return (
      <div>
        {console.log(this.props)}
        {this.props.gWins.gWins.map((gwin, index) => {
            return (
              <GWin
                cWidth={gwin.width}
                cHeight={gwin.height}
                class="gwin"
                lastLoc={gwin.lastLoc}
                direction={gwin.direction}
                key={"canvasKey" + index}
              />
            )
          })}
        {/* <GWin id="game" cWidth="800" cHeight="300" class="gwin"/>
        <GWin id="game2" cWidth="800" cHeight="300" class="gwin"/> 
        <GWin id="game3" cWidth="800" cHeight="300" class="gwin"/>  */}
      </div>
    )
  }  
}

export default connect(stateToProperty)(App);
