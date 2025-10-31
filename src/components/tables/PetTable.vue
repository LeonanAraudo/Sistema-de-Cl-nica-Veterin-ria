<script setup>
import { Column, DataTable } from 'primevue';
import { onMounted, computed, inject } from 'vue';
import { usePetAuthStore } from '../../stores/petStore';

const authPetStore = usePetAuthStore();
const isLoading = computed(() => authPetStore.isLoading);
const searchTerm = inject('searchTerm');

const loadPets = async () => {
  const result = await authPetStore.allPets();
  if (!result.success) {
    console.error('Erro ao carregar pets:', result.error);
  }
};

const filteredPets = computed(() => {
  const term = searchTerm?.value?.toLowerCase() || '';
  return authPetStore.pets.filter(pet =>
    Object.values(pet).some(value =>
      String(value).toLowerCase().includes(term)
    )
  );
});

onMounted(async () => {
  await loadPets();
});
</script>

<template>
  <div class="card">
    <div v-if="isLoading">⏳ Carregando pets...</div>
    <DataTable
      v-else
      :value="filteredPets"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
    >
      <Column field="nome" header="Nome" style="width: 20%" />
      <Column field="raca" header="Raça" style="width: 20%" />
      <Column field="especie" header="Espécie" style="width: 20%" />
      <Column field="idade" header="Idade" style="width: 20%" />
      <Column field="tutor" header="Tutor" style="width: 20%" />
    </DataTable>
  </div>
</template>

<style scoped>
.card {
  margin-top: 1rem;
}
</style>
