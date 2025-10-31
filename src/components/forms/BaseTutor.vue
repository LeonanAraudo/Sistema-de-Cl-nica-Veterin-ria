<script setup>
    import { useTutorAuthStore } from '@/stores/tutorStore';
    import { computed, reactive,  } from 'vue';
    import { toast } from 'vue3-toastify'

    const authTutorStore = useTutorAuthStore()
    const isLoading = computed(() => authTutorStore.isLoading)
    const tutorData = reactive({
        nome: "",
        telefone: "",
        email: "",
        endereco: "",
    })

    const cadTutor = async () => {
        const result = await authTutorStore.cadTutor(tutorData)
        if (result.success) {
            toast.success('Tutor cadastrado com sucesso!')
        } else {
            toast.error(result.error || 'Erro ao cadastrar tutor')
        }
    }

</script>
<template>
    <div>
        <form @submit.prevent="cadTutor">
            <input v-model="tutorData.nome" type="text" placeholder="Nome"/>
            <input v-model="tutorData.email" type="text" placeholder="email"/>
            <input v-model="tutorData.telefone" type="text" placeholder="telefone"/>
            <input v-model="tutorData.endereco" type="text" placeholder="Endereço"/>
            <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Cadastrando...' : 'Cadastrar' }}</button>
        </form>
    </div>
</template>
<style scoped>
</style>