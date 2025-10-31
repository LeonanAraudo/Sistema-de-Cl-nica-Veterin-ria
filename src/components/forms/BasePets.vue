<script setup>
    import { usePetAuthStore } from '@/stores/petStore';
    import { useTutorAuthStore } from '@/stores/tutorStore';
    import { computed, onMounted, reactive } from 'vue';
    import { toast } from 'vue3-toastify'
    import InputText from 'primevue/inputtext';
    import Select from 'primevue/select';
    import Button from 'primevue/button';
    import '../../assets/form.css'
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
    const tutorName = computed(() => authTutorStore.tutors)
    const cadPet = async () => {
        const petDataToSend = {
            nome: petData.nome,
            raca: petData.raca,
            idade: petData.idade,
            especie: petData.especie,
            tutor: petData.tutor
        }
        
        const result = await authPetStore.cadPet(petDataToSend)
        if (result.success) {
            toast.success('Pet cadastrado com sucesso!')
        } else {
            toast.error(result.error || 'Erro ao cadastrar pet')
        }
    }

    const loadTutor = async () => {
        const result = await authTutorStore.allTutors()
        if(!result.success){
            console.error(result.error)
        }
    }
    onMounted(() => loadTutor())
</script>
<template>
    <div class="container">
        <div class="boxLine">
            <div class="boxTitle">
                <p class="title">Cadastro de Pet</p>
            </div>
            <div class="line"></div>
        </div>
        <div class="formBox">
            <form @submit.prevent="cadPet" class="formulario">
                <div class="inptBox">
                    <div class="labelBox">
                        <label for="name" class="label">Nome do Pet</label>
                    </div>
                    <InputText 
                        class="iptNome" 
                        v-model="petData.nome" 
                        name="name"
                        id="name"
                        type="text"
                        placeholder="Digite o nome do pet" />
                </div>
                <div class="reBox">
                    <div>
                        <div class="conjunBox">
                            <label for="raca" class="label">Raça</label>
                        </div>
                        <InputText 
                            v-model="petData.raca" 
                            name="raca"
                            id="raca"
                            type="text" 
                            placeholder="Golden,Shiba,Ararinha etc" />
                    </div>
                    <div>
                        <div class="conjunBox">
                            <label for="especie" class="label">Espécie</label>                            
                        </div>
                        <InputText
                            v-model="petData.especie"  
                            name="especie" 
                            id="especie" 
                            type="text" 
                            placeholder="Gato,Cachorro,Ave etc" />
                    </div>
                </div>
                <div class="itBox">
                    <div>
                        <div class="conjunBox">
                            <label for="idade" class="label">Idade</label>
                        </div>
                        <InputText 
                            v-model="petData.idade" 
                            name="idade"
                            id="idade"
                             type="number" 
                            placeholder="Username" />
                    </div>
                    <div>
                        <div class="conjunBox">                            
                            <label for="tutor" class="label">Tutor</label>
                        </div>
                        <Select
                        id="tutor"
                        v-model="petData.tutor"
                        :options="tutorName"
                        optionLabel="nome"       
                        optionValue="nome"       
                        placeholder="Selecione um tutor"
                    />
                    </div>
                </div>
                <Button class="button" type="submit" :disabled="isLoading">{{ isLoading ? 'Cadastrando...' : 'Cadastrar Pet' }}</Button>
            </form>
        </div>
    </div>
</template>
<style>
</style>