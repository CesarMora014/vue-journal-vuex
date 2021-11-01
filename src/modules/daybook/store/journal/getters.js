const getters = {
    getEntriesByTerm( state ){
        return (term) => {
            if( term.length == 0 ) return state.entries

            return state.entries.filter( entry => entry.text.toLowerCase().includes( term.toLowerCase() ) )
        }
    },
    getEntryById( state ){
        return ( id ) => { 
            const entry = state.entries.find( entry => entry.id === id )
        
            if( !entry ) return
            
            return { ...entry }
        }
    }

}

export default getters