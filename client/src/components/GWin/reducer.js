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
        }]
    }
}

const gWinReducer = (state=initialState, action) => {
    switch(action.type) {
        case "DEAD_IN_ZONE":
            let gWinsArray = state.gWins.gWins;
            console.log(`gWinsArray before:`)
            console.log(gWinsArray);
            switch(action.payload.direction) {
                case "WEST":
                    gWinsArray.splice(gWinsArray.length-1, 0, {
                        ...action.payload,
                        key:gWinsArray.length+1
                    });
                    console.log(`gWinsArray after: ${gWinsArray}`)
                    console.log(gWinsArray);
                    break;
                case "EAST":
                        console.log(action);
                        gWinsArray.push({
                            ...action.payload,
                            key:gWinsArray.length+1
                        })
                    break;
                default:
                    console.log(action);
                    gWinsArray.push({
                        ...action.payload,
                        key:gWinsArray.length+1
                    })
            }
            
            // console.log(action);
            // gWinsArray.push({
            //     ...action.payload
            // })
            const gWins = { ...state, gWins: gWinsArray };
            return {
                gWins
            }
        default:
            return state
    }
}

export default gWinReducer;