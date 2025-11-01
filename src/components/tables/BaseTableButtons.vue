<script setup>
    import { Button } from 'primevue'
    import { inject } from 'vue'

    const data = [
    { label: "Lista de Pets" },
    { label: "Lista de Tutores" },
    { label: "Lista de Consultas" },
    ]
    
    const activeItem = inject('activeItem')

    function setActive(label) {
        if (activeItem?.value !== undefined) {
            activeItem.value = label
        } else {
            activeItem = label
        }
    }
</script>

<template>   
    <div class="listButtons">
      <div
        v-for="(item, index) in data"
        :key="index"
        @click="setActive(item.label)"
        class="mix"
      >
          <Button class="btForce">{{ item.label }}</Button>
      </div>
    </div>
</template>

<style scoped>
.listButtons{
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
}
.btForce{
    width: 230px !important;
    font-size: 19px !important;
    background-color: #1DA9CF !important;
}
.btForce:hover{
    background-color: #7bd9f3 !important;
}
@media (max-width: 768px) {
  .listButtons {
    flex-direction: column; 
    gap: 10px; 
    align-items: center; 
  }

  .btForce {
    width: 200px !important; 
    font-size: 16px !important; 
  }
}
</style>
