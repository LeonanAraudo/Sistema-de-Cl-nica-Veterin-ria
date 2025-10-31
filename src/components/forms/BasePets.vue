<script setup>
    import { usePetAuthStore } from '@/stores/petStore';
    import { useTutorAuthStore } from '@/stores/tutorStore';
    import { computed, onMounted, reactive } from 'vue';
    import { toast } from 'vue3-toastify'
    import InputText from 'primevue/inputtext';
    import Select from 'primevue/select';
    import Button from 'primevue/button';

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
<style scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.formBox{
    width: 70%;
    height: 70%;
    border: solid #D8D8D8 1px;
    border-radius: 20px;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.3);

}
.boxLine{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 70px;
}
.line{
    width: 90%;
    height: 1px;
    background-color: #B7B7B7;
}
.boxTitle{
    width: 100%;
    display: flex;
    padding-left: 50px;
}
.title{
    font-family: "Poppins";
    font-weight: bold;
    font-size: 28px;
}
.formulario{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
}
.label{
    font-family: "Roboto";
    font-weight:600;
}
.iptNome{
    width: 80%;
}
.inptBox{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.labelBox{
    display: flex;
    width: 80%;
}
.reBox{
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
}
.conjunBox{
    width: 10%;
}
.itBox{
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.button{
    background-color: #1DA9CF;
    width: 25%;
}
.button:hover{
    background-color: #7bd9f3 !important;
}
</style>