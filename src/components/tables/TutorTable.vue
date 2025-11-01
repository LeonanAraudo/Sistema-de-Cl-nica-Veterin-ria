<script setup>
    import { Button, Column, DataTable, Dialog, InputText } from 'primevue';
    import { onMounted, computed, inject } from 'vue';
    import { useTutorAuthStore } from '@/stores/tutorStore';
    import { useTableFilter } from '@/composables/useTableFilter';
    import { useDeleteHandler } from '@/composables/useDeleteHandler';
    import { useEditEntity } from '@/composables/useEditHandler';

    const authTutorStore = useTutorAuthStore();
    const isLoading = computed(() => authTutorStore.isLoading);
    const searchTerm = inject('searchTerm');
    const tutors = computed(() => authTutorStore.tutors);
    const loadTutors = async () => {
        const result = await authTutorStore.allTutors();
        if (!result.success) {
            console.error('Erro ao carregar tutores:', result.error);
        }
    };
    
    const {
        isEditDialog,
        editForm,
        handleEditSave,
        openEditDialog
    } = useEditEntity(authTutorStore, 'tutor');

    const { handleDelete } = useDeleteHandler(authTutorStore.delTutor);
    const filteredTutor = useTableFilter(tutors, searchTerm);

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
            <Column  style="width: 20%">
                <template #body="slotProps">
                    <Button
                        icon="pi pi-trash"
                        class="p-button-rounded p-button-danger"
                        @click="handleDelete(slotProps.data.id)"
                        />
                </template>
            </Column>
            <Column  style="width: 20%">
                <template #body="slotProps">
                   <Button
                        icon="pi pi-pencil"
                        class="p-button-rounded p-button-warning mr-2"
                        @click="openEditDialog(slotProps.data)"
                        />
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
                Atualize as informações do tutor.
            </span>
            <div class="inptboxMo">
                <label for="nome" class="labelE">Nome</label>
                <InputText v-model="editForm.nome" id="nome" class="inptMo" autocomplete="off" />
            </div>

            <div class="inptboxMo">
                <label for="email" class="labelE">Email</label>
                <InputText v-model="editForm.email" id="email" class="inptMo" autocomplete="off" />
            </div>

            <div class="inptboxMo">
                <label for="telefone" class="labelE">Telefone</label>
                <InputText v-model="editForm.telefone" id="telefone" class="inptMo" autocomplete="off" />
            </div>

            <div class="inptboxMo">
                <label for="endereco" class="labelE">Endereço</label>
                <InputText v-model="editForm.endereco" id="endereco" class="inptMo" autocomplete="off" />
            </div>

            <div class="buttoBox">
                <Button type="button" label="Cancelar" severity="secondary" @click="isEditDialog = false" />
                <Button type="button" label="Salvar" @click="handleEditSave" />
            </div>
            </Dialog>
        </div>
    </div>
</template>
<style >
.inptboxMo{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 10px;
}
.labelE{
    font-weight: 600;
    margin-right: 230px;
}
.inptMo{
    width: 80%;
}
.buttoBox{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
</style>