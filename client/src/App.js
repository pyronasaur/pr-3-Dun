import React, {Component} from "react";
import { connect } from "react-redux";
import Nav from "./components/Nav";
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
      <div className="containerDiv">
        <Nav id="theNav"
        points={this.props.gWins.point}/>
        <div id="appGameWindow">
          {console.log(this.props)}
          {this.props.gWins.gWins.map((gwin) => {
              return (
                <GWin
                  cWidth={gwin.width}
                  cHeight={gwin.height}
                  enterCoords={ [gwin.enterCoords[0], gwin.enterCoords[1]] }
                  className="gwin"
                  lastLoc={gwin.lastLoc}
                  lastLocKey={gwin.lastLocKey}
                  direction={gwin.direction}
                  key={gwin.key}
                />
              )
            })}
          {/* <GWin id="game" cWidth="800" cHeight="300" class="gwin"/>
          <GWin id="game2" cWidth="800" cHeight="300" class="gwin"/> 
          <GWin id="game3" cWidth="800" cHeight="300" class="gwin"/>  */}
        </div>
      </div>
    )
  }  
}

export default connect(stateToProperty)(App);
