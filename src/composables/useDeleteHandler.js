import { toast } from 'vue3-toastify'

export function useDeleteHandler(deleteAction) {
  const handleDelete = async (id) => {
    try {
      const result = await deleteAction(id)
      if (result.success) {
        toast.success('Item deletado com sucesso!')
      } else {
        toast.error(result.error || 'Erro ao deletar item')
      }
    } catch (error) {
      toast.error('Erro inesperado ao deletar item')
    }
  }

  return { handleDelete }
}
