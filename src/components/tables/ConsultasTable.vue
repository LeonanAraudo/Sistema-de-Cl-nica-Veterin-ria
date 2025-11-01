<script setup>
    import { Button, Column, DataTable, Dialog, InputText, Select } from 'primevue';
    import { onMounted, computed, inject } from 'vue';
    import { useConsultaAuthStore } from '@/stores/consultaStore';
    import { useTableFilter } from '@/composables/useTableFilter';
    import { useDeleteHandler } from '@/composables/useDeleteHandler';
    import { useVetAuthStore } from '@/stores/veterinarioStore';
    import { usePetAuthStore } from '@/stores/petStore';
    import { useEditEntity } from '@/composables/useEditHandler';

    const authConsultaStore = useConsultaAuthStore();
    const authVetStore = useVetAuthStore();
    const authPetStore = usePetAuthStore();
    const searchTerm = inject('searchTerm');

    const isLoading = computed(() => authConsultaStore.isLoading);
    const consultas = computed(() => authConsultaStore.consulta);
    const vetName = computed(() => authVetStore.veterinarios)  ; 
    const petName = computed(() => authPetStore.pets);


    const loadConsultas = async () => {
        const result = await authConsultaStore.allConsultas();
        if (!result.success) {
            console.error('Erro ao carregar consultas:', result.error);
        }
    };
    const { handleDelete } = useDeleteHandler(authConsultaStore.delConsulta);
    const filteredConsulta = useTableFilter(consultas, searchTerm);
    const {
        isEditDialog,
        editForm,
        handleEditSave,
        openEditDialog
    } = useEditEntity(authConsultaStore, 'consulta');

    onMounted(async () => {
        await loadConsultas();
        await authPetStore.allPets();
        await authVetStore.allVets();

    })
</script>
<template>
 <div class="card">
        <div v-if="isLoading">⏳ Carregando consultas...</div>
        <DataTable v-else :value="filteredConsulta" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
            <Column field="pet" header="Pet" style="width: 25%"></Column>
            <Column field="veterinario" header="Veterinário" style="width: 25%"></Column>
            <Column field="data" header="Data" style="width: 25%"></Column>
            <Column field="hora" header="Hora" style="width: 25%"></Column>
            <Column field="motivo" header="Motivo" style="width: 25%"></Column>
            <Column  style="width: 20%">
             <template #body="slotProps">
                  <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="handleDelete(slotProps.data.id)"/>
             </template>
            </Column>
            <Column  style="width: 20%">
                <template #body="slotProps">
                   <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="openEditDialog(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <div >
            <Dialog v-model:visible="isEditDialog"  modal  header="Editar Consulta"  :style="{ width: '25rem' }">
            <span >
                Atualize as informações da consulta.
            </span>
            <div class="inptboxMo">
                <label for="veterinario" class="labelE">Veterinário</label>
                <Select
                id="tutor"
                v-model="editForm.veterinario"
                :options="vetName"
                optionLabel="nome"       
                optionValue="nome"       
                placeholder="Selecione um veterinario"
                class="inptMo"
            />
            </div>
            <div class="inptboxMo">
                <label for="tutor" class="labelE">Pet</label>
                <Select
                id="tutor"
                v-model="editForm.pet"
                :options="petName"
                optionLabel="nome"       
                optionValue="nome"       
                placeholder="Selecione um tutor"
                class="inptMo"
            />
            </div>
            
            <div class="inptboxMo">
                <label for="data" class="labelE">Data</label>
                <InputText v-model="editForm.data" id="data" type="date" class="inptMo3" autocomplete="off" />
            </div>

            <div class="inptboxMo">
                <label for="hora" class="labelE">Hora</label>
                <InputText v-model="editForm.hora" id="hora" class="inptMo3" type="time" autocomplete="off" />
            </div>

            <div class="inptboxMo">
                <label for="motivo" class="labelE">Motivo</label>
                <InputText v-model="editForm.motivo" id="motivo" class="inptMo" autocomplete="off" />
            </div>
        
            <div class="buttoBox">
                <Button type="button" label="Cancelar" severity="secondary" @click="isEditDialog = false" />
                <Button type="button" label="Salvar" @click="handleEditSave" />
            </div>
            </Dialog>
        </div>
    </div>
</template>
<style>
.inptMo3{
    width: 80% !important;
}
</style>