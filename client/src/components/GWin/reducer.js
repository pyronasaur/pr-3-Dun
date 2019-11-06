const initialState = {
    gWins: {
        gWins:[{
            alive:true,
            width: 800,
            height: 300
        }]
    }
}

const gWinReducer = (state=initialState, action) => {
    switch(action.type) {
        case "DEAD_IN_ZONE":
            let gWinsArray = state.gWins.gWins;
            
            console.log(action);
            gWinsArray.push({
                ...action.payload
            })
            const gWins = { ...state, gWins: gWinsArray };
            return {
                gWins
            }
        default:
            return state
    }
}

export default gWinReducer;