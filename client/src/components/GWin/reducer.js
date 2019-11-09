const wide = 800;
const high = 400;

const initialState = {
    gWins: {
        gWins:[{
            alive:true,
            width: wide,
            height: high,
            enterCoords: [wide/2, high/2],
            key: 1,
            lastLocKey: 1            
        }],
        point: 0
    }
}

const gWinReducer = (state=initialState, action) => {
    switch(action.type) {
        case "DEAD_IN_ZONE":
            let gWinsArray = state.gWins.gWins;
            let point = state.gWins.point;
            console.log(`gWinsArray before:`)
            console.log(gWinsArray);
            switch(action.payload.direction) {
                case "WEST":

                    if(action.payload.point > 0) {
                        console.log("found earth");
                        point += action.payload.point;
                    }
                    gWinsArray.splice(gWinsArray.length-1, 0, {
                        ...action.payload,
                        key:gWinsArray.length+1                        
                    });
                    

                    // console.log(`gWinsArray after: ${gWinsArray}`)
                    // console.log(gWinsArray);
                    break;
                case "EAST":
                        console.log(action);
                        if(action.payload.point > 0) {
                            point += action.payload.point;
                        }
                        gWinsArray.push({
                            ...action.payload,
                            key:gWinsArray.length+1,

                        })
                    break;
                default:
                    console.log(action);
                    if(action.payload.point > 0) {
                        point += action.payload.point;
                    }
                    gWinsArray.push({
                        ...action.payload,
                        key:gWinsArray.length+1,

                    })
            }
            
            // console.log(action);
            // gWinsArray.push({
            //     ...action.payload
            // })
            const gWins = { ...state, gWins: gWinsArray, point: point };
            return {
                gWins
            }
        default:
            return state
    }
}

export default gWinReducer;