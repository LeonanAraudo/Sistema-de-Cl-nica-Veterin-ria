<script setup>
    import { Column, DataTable } from 'primevue';
    import { ref, onMounted, computed } from 'vue';
    import { usePetAuthStore } from '../../stores/petStore'

    const authPetStore = usePetAuthStore()
    const isLoading = computed(() => authPetStore.isLoading)

    const loadPets = async () => {
        const result = await authPetStore.allPets()
        if (!result.success) {
            console.error('Erro ao carregar pets:', result.error);
        }
    }
    onMounted(async () => {
        await loadPets()
    })
</script>
<template>
 <div class="card">
        <div v-if="isLoading">⏳ Carregando pets...</div>

        <DataTable v-else :value="authPetStore.Pets" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="nome" header="Nome" style="width: 20%"></Column>
            <Column field="raca" header="Raça" style="width: 20%"></Column>
            <Column field="especie" header="Espécie" style="width: 20%"></Column>
            <Column field="idade" header="idade" style="width: 20%"></Column>
            <Column field="tutor" header="Tutor" style="width: 20%"></Column>
        </DataTable>
    </div>
</template>
<style scoped>

</style>