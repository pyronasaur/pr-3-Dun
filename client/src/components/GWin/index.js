import React, { Component } from "react";
import { connect } from "react-redux";
import libs from "../../libs/index.js";
import store from "../../config/store.js";

function stateToProperty(state) {
  return {
    ...state.gwin
  }
}

function dispatchDeath(x, y, lastLoc, direction, lastLocKey, point) {
  store.dispatch({
    type: "DEAD_IN_ZONE",
    payload: {
        alive:true,
        width: 400,
        height: 400,
        enterCoords: [x, y],
        lastLoc: lastLoc,
        lastLocKey: lastLocKey,
        direction: direction,
        point: point
    }
  })
}

//calculate new entry point for new gWin
function calculateEntry(x, y, w, h){

  let startX;
  let startY;
  let lastLoc;
  let direction;

  if(x > w){
    startX = -25;
    startY = y;
    lastLoc = "WEST";
    direction = "EAST";
  }
  if(x < -120) {
    if(w > 400) {
      startX = w - 425;
    }
    else{
      startX = w - 25;
    }
    startY = y;
    lastLoc = "EAST";
    direction = "WEST";
  }
  if(y > h){
    startX = x;
    if(w > 400) {
      startX = x / 2;
    }
    else{
      startX = x;
    }
    startY = -90;
    lastLoc = "NORTH";
    direction = "SOUTH";
  }
  if(y < -120){
    startX = x;
    startY = h - 125;
    lastLoc = "SOUTH";
    direction = "NORTH";
  }

  return [startX, startY, lastLoc, direction]
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
            earth: new Texture("Earth.png"),
            spaceship: new Texture("UfoGrey.png")
          };
          
          scene.add("starfield");

          const stars = scene.add(new Container());

            let point = 0;
            let starnum = Math.ceil(Math.random() * 4);
            if(starnum === 1) {
              const earth = stars.add(new Sprite(textures.earth));
              earth.pos.x = Math.ceil(Math.random() * this.props.cWidth);
              earth.pos.y = Math.ceil(Math.random() * this.props.cHeight);
              that.point = 1;
              //console.log("points up " + that.point);
            }
            
            const blue = stars.add(new Sprite(textures.blueplanet));
            blue.pos.x = Math.ceil(Math.random() * this.props.cWidth);
            blue.pos.y = Math.ceil(Math.random() * this.props.cHeight);

            const yellow = stars.add(new Sprite(textures.yellowhalf));
            yellow.pos.x = Math.ceil(Math.random() * this.props.cWidth);
            yellow.pos.y = Math.ceil(Math.random() * this.props.cHeight);
            yellow.pivot = { x: 8, y: 8 };

            starnum = Math.ceil(Math.random() * 20);
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
              
              ship.pos = { x: this.props.enterCoords[0], y: this.props.enterCoords[1] };
              ship.update = function(dt, t) {
                const { x, y } = controls;
                //const rps = Math.PI * 2 * dt;
                this.pos.x += x * dt * 200;
                if(this.pos.x > w || this.pos.x < -120 ||
                  this.pos.y > h || this.pos.y < -120) {
                  ships.remove(ship);
                  ship.dead = true;
                  onSceneLeave();
                  const newCoords = calculateEntry(this.pos.x, this.pos.y, w, h);
                  //console.log("points are " + that.point);
                  dispatchDeath(newCoords[0], newCoords[1], newCoords[2], newCoords[3], that.props.lastLocKey, that.point);                 
                  
                }
                this.pos.y += y * dt * 200;
                //ship.rotation += 1 * rps;
                //console.log(`(x , y) = ${this.pos.x},${this.pos.y}`);

                const { scale } = this;
                scale.x = Math.abs(Math.sin(t * .7)) + 1.7;
                scale.y = Math.abs(Math.sin(t * .7)) + 1.7;
              }
            };
          

        game.run(dt => {
          const rps = Math.PI * 2 * dt;
          stars.map((s, i) => {
            if(s.texture.img.src != textures.earth || s.texture != textures.yellowhalf || s.texture != textures.blueplanet)
            {
              s.rotation += i * rps;
            }
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