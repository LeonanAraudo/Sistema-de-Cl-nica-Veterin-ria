<script setup>
    import { Column, DataTable } from 'primevue';
    import { ref, onMounted, computed } from 'vue';
    import { useConsultaAuthStore } from '@/stores/consultaStore';

    const authConsultaStore = useConsultaAuthStore()
    const isLoading = computed(() => authConsultaStore.isLoading)

    const loadConsultas = async () => {
        const result = await authConsultaStore.allConsultas()
        if (!result.success) {
            console.error('Erro ao carregar consultas:', result.error);
        }
    }
    onMounted(async () => {
        await loadConsultas()
    })
</script>
<template>
 <div class="card">
        <div v-if="isLoading">⏳ Carregando consultas...</div>

        <DataTable v-else :value="authConsultaStore.Consulta" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="pet" header="Pet" style="width: 25%"></Column>
            <Column field="veterinario" header="Veterinário" style="width: 25%"></Column>
            <Column field="data" header="Data" style="width: 25%"></Column>
            <Column field="motivo" header="Motivo" style="width: 25%"></Column>
        </DataTable>
    </div>
</template>
<style scoped>

</style>