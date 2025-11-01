import { ref } from 'vue'
import { toast } from 'vue3-toastify'

export function useEditEntity(store, entityName = 'item') {
  const isEditDialog = ref(false)
  const editForm = ref({})

  const openEditDialog = (entity) => {
    editForm.value = { ...entity }
    isEditDialog.value = true
  }

  const handleEditSave = async () => {
    if (!editForm.value.id) {
      toast.error(`ID do ${entityName} não encontrado.`)
      return
    }

    const result = await store[`edit${capitalize(entityName)}`](
      editForm.value.id,
      editForm.value
    )

    if (result.success) {
      toast.success(`${capitalize(entityName)} atualizado com sucesso!`)
      isEditDialog.value = false
    } else {
      toast.error(result.error || `Erro ao atualizar ${entityName}`)
    }
  }

  return {
    isEditDialog,
    editForm,
    openEditDialog,
    handleEditSave
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
