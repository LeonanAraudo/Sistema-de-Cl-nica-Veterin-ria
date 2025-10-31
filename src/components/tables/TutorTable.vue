<script setup>
    import { Column, DataTable } from 'primevue';
    import { onMounted, computed, inject } from 'vue';
    import { useTutorAuthStore } from '@/stores/tutorStore';

    const authTutorStore = useTutorAuthStore()
    const isLoading = computed(() => authTutorStore.isLoading)
    const searchTerm = inject('searchTerm');

    const loadTutors = async () => {
        const result = await authTutorStore.allTutors()
        if (!result.success) {
            console.error('Erro ao carregar tutores:', result.error);
        }
    }
    const filteredTutor = computed(() => {
    const term = searchTerm?.value?.toLowerCase() || '';
    return authTutorStore.tutors.filter(tutor =>
        Object.values(tutor).some(value =>
        String(value).toLowerCase().includes(term)
        )
    );
    });
    onMounted(async () => {
        await loadTutors()
    })
</script>
<template>
 <div class="card">
        <div v-if="isLoading">⏳ Carregando tutores...</div>
        <DataTable v-else :value="filteredTutor" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="nome" header="Nome" style="width: 25%"></Column>
            <Column field="telefone" header="Telefone" style="width: 25%"></Column>
            <Column field="email" header="Email" style="width: 25%"></Column>
            <Column field="endereco" header="Endereço" style="width: 25%"></Column>
        </DataTable>
    </div>
</template>
<style scoped>

</style>