<script setup>
    import { Button, Column, DataTable, Dialog, InputText, Select } from 'primevue';
    import { onMounted, computed, inject } from 'vue';
    import { usePetAuthStore } from '../../stores/petStore';
    import { useTableFilter } from '@/composables/useTableFilter';
    import { useDeleteHandler } from '@/composables/useDeleteHandler';
    import { useTutorAuthStore } from '@/stores/tutorStore';
    import { useEditEntity } from '@/composables/useEditHandler';

    const authPetStore = usePetAuthStore();
    const authTutorStore = useTutorAuthStore();
    const isLoading = computed(() => authPetStore.isLoading);
    const searchTerm = inject('searchTerm');
    const pets = computed(() => authPetStore.pets);

    const loadPets = async () => {
    const result = await authPetStore.allPets();

    if (!result.success) {
        console.error('Erro ao carregar pets:', result.error);
    }
    };
    const { handleDelete } = useDeleteHandler(authPetStore.delPet);
    const filteredPets = useTableFilter(pets, searchTerm);
    const tutorName = computed(() => authTutorStore.tutors)
    const {
        isEditDialog,
        editForm,
        handleEditSave,
        openEditDialog
    } = useEditEntity(authPetStore, 'pet');

    onMounted(async () => {
     await loadPets();
     await authTutorStore.allTutors(); 
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
      <Column style="width: 20%">
        <template #body="slotProps">
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"  @click="handleDelete(slotProps.data.id)" />
        </template>
       </Column>
       <Column  style="width: 20%">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="openEditDialog(slotProps.data)" />
            </template>
       </Column>
    </DataTable>
     <div >
            <Dialog
                v-model:visible="isEditDialog"
                modal
                header="Editar Tutor"
                :style="{ width: '25rem' }"
            >
            <span >
                Atualize as informações do pet.
            </span>
            <div class="inptboxMo">
                <label for="nome" class="labelE">Nome</label>
                <InputText v-model="editForm.nome" id="nome" class="inptMo" autocomplete="off" />
            </div>

            <div class="inptboxMo">
                <label for="raca" class="labelE">raca</label>
                <InputText v-model="editForm.raca" id="raca" class="inptMo" autocomplete="off" />
            </div>

            <div class="inptboxMo">
                <label for="especie" class="labelE">especie</label>
                <InputText v-model="editForm.especie" id="especie" class="inptMo" autocomplete="off" />
            </div>

            <div class="inptboxMo">
                <label for="idade" class="labelE">Idade</label>
                <InputText v-model="editForm.idade" id="idade" class="inptMo" autocomplete="off" />
            </div>
            <div class="inptboxMo">
                <label for="tutor" class="labelE">Tutor</label>
                <Select
                    id="tutor"
                    v-model="editForm.tutor"
                    :options="tutorName"
                    optionLabel="nome"       
                    optionValue="nome"       
                    placeholder="Selecione um tutor"
                    class="inptMo"
            />
            </div>

            <div class="buttoBox">
                <Button type="button" label="Cancelar" severity="secondary" @click="isEditDialog = false" />
                <Button type="button" label="Salvar" @click="handleEditSave" />
            </div>
            </Dialog>
        </div>
  </div>
</template>

<style scoped>
.card {
  margin-top: 1rem;
}

</style>
