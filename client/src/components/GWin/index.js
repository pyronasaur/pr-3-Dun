import React, { Component } from "react";
import { connect } from "react-redux";
import libs from "../../libs/index.js";
import store from "../../config/store.js";

function stateToProperty(state) {
  return {
    ...state.gwin
  }
}

function dispatchDeath(lastLoc, direction) {
  store.dispatch({
    type: "DEAD_IN_ZONE",
    payload: {
        alive:true,
        width: 800,
        height: 300,
        lastLoc: lastLoc,
        direction: direction
    }
  })
}

class GWin extends Component {

    constructor(props) {
        super(props);
        
        this.canvas = React.createRef();
        this.state = {
            isActive: true
        };
    }    

    componentDidMount() {
      let that = this;
        const { Container, Game, Sprite, Texture, Controls } = libs;
        const controls = new Controls();

        const game = new Game(this.props.cWidth, this.props.cHeight, this.canvas.current, "#gameWinDiv");
        const { scene, w, h } = game;

        const textures = {
            blueplanet: new Texture("BluePlanet.png"),
            whitestar: new Texture("WhiteStar.png"),
            fullmoon: new Texture("FullMoon.png"),
            yellowhalf: new Texture("YellowHalfMoon.png"),
            spaceship: new Texture("UfoGrey.png")
          };
          
          scene.add("starfield");

          const stars = scene.add(new Container());
            
            const blue = stars.add(new Sprite(textures.blueplanet));
            blue.pos.x = Math.ceil(Math.random() * this.props.cWidth);
            blue.pos.y = Math.ceil(Math.random() * this.props.cHeight);

            const yellow = stars.add(new Sprite(textures.yellowhalf));
            yellow.pos.x = Math.ceil(Math.random() * this.props.cWidth);
            yellow.pos.y = Math.ceil(Math.random() * this.props.cHeight);
            yellow.pivot = { x: 8, y: 8 };

            let starnum = Math.ceil(Math.random() * 20);
            for (let i = 0; i < starnum; i++) {
              
              const white = stars.add(new Sprite(textures.whitestar));
              white.pivot = { x: 8, y: 8 };
              white.pos.x = Math.ceil(Math.random() * this.props.cWidth);
              white.pos.y = Math.ceil(Math.random() * this.props.cHeight);
            }

            starnum = Math.ceil(Math.random() * 6);
            for (let i = 0; i < starnum; i++) {
              
              const full = stars.add(new Sprite(textures.fullmoon));
              full.pivot = { x: 8, y: 8 };
              full.pos.x = Math.ceil(Math.random() * this.props.cWidth);
              full.pos.y = Math.ceil(Math.random() * this.props.cHeight);
            }

            if(this.state.isActive) {
              const ships = scene.add(new Container());
              ships.pos.x = 0;
              ships.pos.y = h / 2 - 100;
              
              const ship = ships.add(new Sprite(textures.spaceship));
              ship.pivot = { x: 16, y: 16 };
              
              ship.pos = { x: 40, y: h / 2 };
              ship.update = function(dt, t) {
                const { x, y } = controls;
                //const rps = Math.PI * 2 * dt;
                this.pos.x += x * dt * 200;
                if(this.pos.x > w || this.pos.x < -120 ||
                  this.pos.y > h || this.pos.y < -120) {
                  ships.remove(ship);
                  ship.dead = true;
                  dispatchDeath("south", "south");
                  onSceneLeave();
                  
                }
                this.pos.y += y * dt * 200;
                //ship.rotation += 1 * rps;
                //console.log(`(x , y) = ${this.pos.x},${this.pos.y}`);

                const { scale } = this;
                scale.x = Math.abs(Math.sin(t)) + 2;
                scale.y = Math.abs(Math.sin(t * 1.1)) + 1.5;
              }
            };
          

        game.run(dt => {
          const rps = Math.PI * 2 * dt;
          stars.map((s, i) => {
            s.rotation += i * rps;
          });
        });   
        
        function onSceneLeave() {
          that.setState({
            isActive: false
          }) 
        }
    }

    
    
    render() {
        return (
            <div className="gameWinDiv">
                <canvas ref={this.canvas} id={this.props.id} width={this.props.cWidth} height={this.props.cHeight} className="gameWindow"></canvas>
            </div>
        )
    }
}

export default connect(stateToProperty)(GWin);