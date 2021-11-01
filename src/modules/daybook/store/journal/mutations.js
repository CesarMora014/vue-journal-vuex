const mutations = {
    setEntries( state, entries ){
        state.entries = [
            ...state.entries,
            ...entries
        ]

        state.isLoading =  false
    },
    updateEntry( /*state*/ ){
    
    },
    addEntry( /*state*/ ){
    
    }

}

export default mutations