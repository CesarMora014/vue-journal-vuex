const mutations = {
    setEntries( state, entries ){
        state.entries = [
            ...state.entries,
            ...entries
        ]

        state.isLoading =  false
    },
    updateEntry( state, updatedEntry ){
        const idx = state.entries.map( entry => entry.id).indexOf( updatedEntry.id )
        state.entries[idx] = updatedEntry
    },
    addEntry( state, entry ){
        state.entries = [ entry, ...state.entries ]
    },
    removeEntry( state, id ){
        state.entries = state.entries.filter(entry => entry.id !== id)
    }

}

export default mutations