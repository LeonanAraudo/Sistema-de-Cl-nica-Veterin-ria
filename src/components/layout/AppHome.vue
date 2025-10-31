<script setup>
    import { provide, ref } from 'vue';
    import BaseLateral from '../common/BaseLateral.vue';
    import BasePets from '../forms/BasePets.vue';
    import BaseConsulta from '../forms/BaseConsulta.vue';
    import BaseTutor from '../forms/BaseTutor.vue';
    import BaseTableUnion from '../tables/BaseTableUnion.vue';
    
    const activeItem = ref('Cadastrar Pet')
    provide('activeItem',activeItem)

    const components = {
        Home: BasePets,
       'Cadastrar Pet': BasePets,
        'Cadastrar Tutor': BaseTutor,
        'Agendar Consulta': BaseConsulta,
        'Tabelas': BaseTableUnion
    }
</script>
<template>
    <div class="conteiner">
        <div class="lateral">
            <BaseLateral/>
        </div>
        <div class="componentes">
            <component :is="components[activeItem]"/>
        </div>
    </div>
</template>
<style scoped>
.conteiner{
    display: flex;
    width: 100vw;
    height: 100vh;
}
.lateral{
    width: 23%;
    height: 100%;
}
.componentes{
    width: 77%;
    height: 100%;
}
</style>