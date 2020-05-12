// should be pure functions that always return the same value even after running a thousand times
// should always have an else that returns state in case action.type doesnt match
export default function location(state = "Seattle, WA", action) {
    if (action.type === "CHANGE_LOCATION") {
        return action.payload;
    } else {
        return state;
    }
}

//action is an object that is received from whatever is dispatching the action to redux