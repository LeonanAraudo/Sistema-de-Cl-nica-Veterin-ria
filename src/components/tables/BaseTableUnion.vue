<script setup>
    import { provide, ref } from 'vue'
    import '../../assets/form.css'
    import BaseTableButtons from './BaseTableButtons.vue'
    import ConsultasTable from './ConsultasTable.vue'
    import PetTable from './PetTable.vue'
    import TutorTable from './TutorTable.vue'
    import InputText from 'primevue/inputtext'
    import IconField from 'primevue/iconfield';
    import InputIcon from 'primevue/inputicon';
    

    const activeItem = ref('Lista de Pets')
    provide('activeItem', activeItem)

    const components = {
    'Lista de Pets': PetTable,
    'Lista de Tutores': TutorTable,
    'Lista de Consultas': ConsultasTable,
    }

    const searchTerm = ref('')
    provide('searchTerm', searchTerm)

</script>

<template>
  <div class="container">
    <div class="boxLine">
      <div class="boxTitle">
        <p class="title">Tabelas</p>
      </div>
      <div class="line"></div>
    </div>

    <div class="botoes">
      <BaseTableButtons />
    </div>
    <div class="pesquisa">
        <IconField class="boxPan">
            <InputIcon class="pi pi-search" />
            <InputText 
                v-model="searchTerm" 
                class="iptPesquisa"
                placeholder="Search" />
        </IconField>
    </div>

    <div class="compo">
            <component :is="components[activeItem]" />
    </div>
  </div>
</template>

<style>
.botoes {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pesquisa {
  width: 50%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.iptPesquisa {
  width: 100% !important;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.boxPan{
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.compo{
    flex:1;
    overflow-y: auto;
    overflow-x: auto;
}

@media (max-width: 768px) {
  .botoes {
    flex-direction: column;
    gap: 10px;
  }
  .pesquisa {
    width: 90%;
    margin-top: 20px;
  }
  .compo {
    overflow-x: auto; 
    display: block; 
    padding: 0 0.5rem; 
  }
  .iptPesquisa {
    font-size: 0.9rem;
  }
  table {
    min-width: 600px; 
  }
}
</style>
