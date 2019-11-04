const initialState = {
    position: [0,0]
}

const gWinReducer = (state=initialState, action) => {
    switch(action.type) {
        case "DEAD_IN_ZONE":
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default gWinReducer;