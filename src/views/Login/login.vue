<template>
    <div>
        <p>{{message}}</p>  
        <router-link to="/publish"></router-link>     
    </div>
</template>
<script>
export default {
    data() {
        return {
            message:'login'
        }
    },
}
</script>
<style>

</style>
