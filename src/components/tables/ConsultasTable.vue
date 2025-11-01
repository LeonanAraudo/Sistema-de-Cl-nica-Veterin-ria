<script setup>
    import { Button, Column, DataTable } from 'primevue';
    import { onMounted, computed, inject } from 'vue';
    import { useConsultaAuthStore } from '@/stores/consultaStore';
    import { useTableFilter } from '@/composables/useTableFilter';
    import { useDeleteHandler } from '@/composables/useDeleteHandler';

    const authConsultaStore = useConsultaAuthStore();
    const isLoading = computed(() => authConsultaStore.isLoading);
    const searchTerm = inject('searchTerm');
    const consultas = computed(() => authConsultaStore.consulta);

    const loadConsultas = async () => {
        const result = await authConsultaStore.allConsultas();
        if (!result.success) {
            console.error('Erro ao carregar consultas:', result.error);
        }
    };
    const { handleDelete } = useDeleteHandler(authConsultaStore.delConsulta);
    const filteredConsulta = useTableFilter(consultas, searchTerm);
    onMounted(async () => {
        await loadConsultas()
    })
</script>
<template>
 <div class="card">
        <div v-if="isLoading">⏳ Carregando consultas...</div>
        <DataTable v-else :value="filteredConsulta" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="pet" header="Pet" style="width: 25%"></Column>
            <Column field="veterinario" header="Veterinário" style="width: 25%"></Column>
            <Column field="data" header="Data" style="width: 25%"></Column>
            <Column field="motivo" header="Motivo" style="width: 25%"></Column>
            <Column  style="width: 20%">
             <template #body="slotProps">
                '  <Button
                        icon="pi pi-trash"
                        class="p-button-rounded p-button-danger"
                        @click="handleDelete(slotProps.data.id)"
                        />
                    </template>
            </Column>'
        </DataTable>
    </div>
</template>
<style scoped>

</style>