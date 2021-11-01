import journalAPI from "@/api/journalAPI"

const actions = {
    async loadEntries({ commit }){

        const { data } = await journalAPI.get('/entries.json')
        const entries = []

        for( let id  of Object.keys(data) ){
            entries.push({
                id,
                ...data[id]
            })
        }

        commit('setEntries', entries)

    },
    async updateEntry(/*{ commit }*/){

    },
    async createEntry(/*{ commit }*/){

    }
}

export default actions