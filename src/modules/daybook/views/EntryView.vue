<template>

    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{ day }}</span>
                <span class="mx-1 fs-3 ">{{month}}</span>
                <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
            </div>

            <div>
                <input type="file" @change="onImageSelected" ref="imsgeSelector" accept="image/png, image/jpeg" hidden/>
                <button class="btn btn-danger mx-2" @click="onDeleteEntry" v-if="entry.id">Borrar <i class="fa fa-trash-alt"></i></button>
                <button class="btn btn-primary" @click="onSelectImage">Subir foto <i class="fa  fa-upload"></i></button>
            </div>
        </div>

        <hr>

        <div class="d-flex flex-column px-3 h-75">
            <textarea placeholder="Que sucedio hoy?" v-model="entry.text"></textarea>
        </div>

        <img :src="localImage"
            v-if="localImage "
            alt="entry-picture"
            class="img-thumbnail">

        <img :src="entry.picture"
            v-if="entry.picture && !localImage"
            alt="entry-picture"
            class="img-thumbnail">

        <Fab 
            :icon="'fa-save'"
            @click="saveEntry"/>
    </template>
</template>

<script>
import {defineAsyncComponent} from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'

import uploadImage from '../helpers/uploadImage'
import getDayMonthYear from '../helpers/getDayMonthYear'

export default {
    props:{
        id: {
            type: String,
            required: true
        }
    },
    components:{
        Fab:  defineAsyncComponent(() => import('../components/Fab')),
    },
    data(){
        return {
            entry: null,
            localImage:null,
        }
    },
    created(){
        this.loadEntry()
    },
    methods:{
        loadEntry(){

            let entry 
            this.localImage = null

            if(this.id === 'new')
            {
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            }
            else{
                entry = this.getEntryById( this.id )
                if( !entry ) return this.$router.push({ name: 'no-entry' })
            }


            this.entry = entry
        },
        async saveEntry(){
            new Swal({
                title: 'Espere Por favor',
                allowOutsideClick: false
            })

            Swal.showLoading()

            const picture = await uploadImage(this.localImage)
            console.log(picture)
            this.entry.picture = picture

            if( this.entry.id ){
                await this.updateEntry(this.entry)
            }
            else{
               const id = await this.createEntry(this.entry)
               this.$router.push({ name: 'entry', params: { id } })
            }
            
            this.localImage = null

            Swal.fire('Guardado', 'Entrada registrada con éxito','success')


        },
        async onDeleteEntry(){

            const { isConfirmed } = await Swal.fire({
                title: '¿Estas seguro?',
                text: 'Una vez borrado, no se puede recuperar.',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })
            
            if( !isConfirmed ) return 

            new Swal({
                title: 'Espere Por favor',
                allowOutsideClick: false
            })
            Swal.showLoading()

            await this.deleteEntry(this.entry.id)
            this.$router.push({ name: 'no-entry' })
            
            Swal.fire('Eliminado', 'Entrada eliminada con éxito','success')
        },
        onImageSelected( { target } ){
            const file = target.files[0]

            if( !file ) {
                this.localImage = null
                return
            } 

            this.localIFile = file

            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL(file)

        },
        onSelectImage(){
            this.$refs.imsgeSelector.click()
        },
        ...mapActions('journal', ['updateEntry','createEntry','deleteEntry'])
    },
    computed: {
        ...mapGetters('journal',['getEntryById']),
        day(){
            const { day } = getDayMonthYear( this.entry?.date )
            return day
        },
        month(){
            const { month } = getDayMonthYear( this.entry?.date )
            return month
        },
        yearDay(){
            const { yearDay } = getDayMonthYear( this.entry?.date )
            return yearDay
        },

    },
    watch:{
        id(){
            this.loadEntry()
        }
    }
}
</script>

<style lang="scss" scoped>

    textarea{
        font-size: 20px;
        border:none;
        height: 100%;

        &:focus{
            outline: none;
        }

    }

    img{
        width: 200px;
        position: fixed;
        bottom: 150px;
        right: 20px;
        box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
    }

</style>