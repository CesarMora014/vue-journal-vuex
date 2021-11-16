import journalAPI from "@/api/journalAPI"

const actions = {
    async loadEntries({ commit }){

        const { data } = await journalAPI.get('/entries.json')
        const entries = []

        if(data){
            for( let id of Object.keys(data) ){
                entries.push({
                    id,
                    ...data[id]
                })
            }
        }

        commit('setEntries', entries)

    },
    async updateEntry({ commit }, entry){
        
        const { id, ...entryData } = entry
        await journalAPI.put(`/entries/${id}.json`,entryData)
        
        commit('updateEntry', { ...entry })

    },
    async createEntry({ commit }, entry){

        const { data } = await journalAPI.post('/entries.json', entry)

        entry.id = data.name

        commit( 'addEntry', { ...entry } )

        return data.name
    },
    async deleteEntry({ commit }, id){

        await journalAPI.delete(`/entries/${id}.json`)
        commit('removeEntry', id)
    }
}

export default actions