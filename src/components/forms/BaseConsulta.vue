<script setup>
    import { usePetAuthStore } from '@/stores/petStore';
    import { useTutorAuthStore } from '@/stores/tutorStore';
    import { computed, onMounted, reactive } from 'vue';
    import { toast } from 'vue3-toastify'

    const authPetStore = usePetAuthStore()
    const authTutorStore = useTutorAuthStore()
    const isLoading = computed(() => authPetStore.isLoading)
    const petData = reactive({
        nome: "",
        raca: "",
        idade: "",
        especie: "",
        tutor: ""
    })
    const tutorName = computed(() => authTutorStore.tutorName)
    const cadPet = async () => {
      
    }

    const loadTutor = async () => {
        const result = await authTutorStore.searchTutorName()
        if(!result.success){
            console.error(result.error)
        }
    }
    onMounted(() => loadTutor())
</script>
<template>
    <div>
        <form @submit.prevent="cadPet">
            <input v-model="petData.idade" type="number" placeholder="idade"/>
            <input v-model="petData.nome" type="text" placeholder="nome"/>
            <input v-model="petData.raca" type="text" placeholder="raça"/>
            <input v-model="petData.especie" type="text" placeholder="especie"/>
            <select v-model="petData.tutor">
                  <option disabled value="">Selecione um tutor</option>
                <option v-for="(name,index) in tutorName" :key="index" :value="name">
                    {{ name }}
                </option>
            </select>
          <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Cadastrando...' : 'Cadastrar' }}</button>
        </form>
    </div>
</template>
<style scoped>
</style>