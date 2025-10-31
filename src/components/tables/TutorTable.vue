<script setup>
    import { Column, DataTable } from 'primevue';
    import { ref, onMounted, computed } from 'vue';
    import { useTutorAuthStore } from '@/stores/tutorStore';

    const authTutorStore = useTutorAuthStore()
    const isLoading = computed(() => authTutorStore.isLoading)

    const loadTutors = async () => {
        const result = await authTutorStore.allTutors()
        if (!result.success) {
            console.error('Erro ao carregar tutores:', result.error);
        }
    }
    onMounted(async () => {
        await loadTutors()
    })
</script>
<template>
 <div class="card">
        <div v-if="isLoading">⏳ Carregando pets...</div>
        <DataTable v-else :value="authTutorStore.tutors" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="nome" header="Nome" style="width: 25%"></Column>
            <Column field="telefone" header="Telefone" style="width: 25%"></Column>
            <Column field="email" header="Email" style="width: 25%"></Column>
            <Column field="endereco" header="Endereço" style="width: 25%"></Column>
        </DataTable>
    </div>
</template>
<style scoped>

</style>