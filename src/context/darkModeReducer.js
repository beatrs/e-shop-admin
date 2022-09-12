
const DarkModeReducer = (state, action) => {
    // if (action.type === "TOGGLE") {
    //     return {
    //         darkMode : !state.darkMode
    //     }
    // }
    if (action.type === "setToDark") {
        return {
            darkMode : true
        }
    }
    if (action.type === "setToLight") {
        return {
            darkMode : false
        }
    }
}

export default DarkModeReducer