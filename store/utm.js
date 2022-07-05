export const state = () =>({
    source:''
})

export const getters = {
    getSource(state){
        return state.source
    }
}

export const mutations ={
    setSource(state,source){
        state.source = source
        console.log(state.source)
    }
}