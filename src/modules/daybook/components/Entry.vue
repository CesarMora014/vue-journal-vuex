<template>
    <div class="entry-container mb-3 pointer p-2" @click="$router.push({name: 'entry', params: {id: 10}})">
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">15 </span>
            <span class="mx-1 fs-5">Julio </span>
            <span class="mx-2 fw-light">2021, Jueves</span>

        </div>
        <div class="entry-description">
            Laborum fugiat mollit elit ex ad minim cupidatat exercitation dolore. Id et ipsum enim anim occaecat irure labore. Sint nulla reprehenderit cillum sint ullamco ipsum et irure dolor eu esse. Ex ex aute quis id aute ut magna. Laborum et pariatur consequat nostrud esse quis tempor elit deserunt et nostrud eiusmod.
        </div>
    </div>  
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

.entry-container{
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover{
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }
}

.entry-description{
    font-size: 12px;
}

</style>