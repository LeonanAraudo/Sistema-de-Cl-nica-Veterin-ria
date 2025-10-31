<script setup>
    import { useTutorAuthStore } from '@/stores/tutorStore';
    import { computed, reactive,  } from 'vue';
    import { toast } from 'vue3-toastify'
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';

    const authTutorStore = useTutorAuthStore()
    const isLoading = computed(() => authTutorStore.isLoading)
    const tutorData = reactive({
        nome: "",
        telefone: "",
        email: "",
        endereco: "",
    })

    const cadTutor = async () => {
        const tutorDataToSend = {
            nome: tutorData.nome,
            telefone: tutorData.telefone,
            email: tutorData.email,
            endereco: tutorData.endereco
        }
        
        const result = await authTutorStore.cadTutor(tutorDataToSend)
        if (result.success) {
            toast.success('Tutor cadastrado com sucesso!')
        } else {
            toast.error(result.error || 'Erro ao cadastrar tutor')
        }
    }

</script>
<template>
     <div class="container">
        <div class="boxLine">
            <div class="boxTitle">
                <p class="title">Cadastro de Tutor</p>
            </div>
            <div class="line"></div>
        </div>
        <div class="formBox">
            <form @submit.prevent="cadTutor" class="formulario">
                <div class="inptBox">
                    <div class="labelBox">
                        <label for="nome" class="label">Nome Completo</label>
                    </div>
                    <InputText 
                        class="iptNome" 
                        v-model="tutorData.nome" 
                        name="nome"
                        id="nome"
                        type="text"
                        placeholder="Digite o nome do pet" />
                </div>
                <div class="reBox">
                    <div>
                        <div class="conjunBox">
                            <label for="telefone" class="label">Telefone</label>
                        </div>
                        <InputText 
                            v-model="tutorData.telefone" 
                            name="telefone"
                            id="telefone"
                            type="text" 
                            placeholder="(00) 00000-0000" />
                    </div>
                    <div>
                        <div class="conjunBox">
                            <label for="email" class="label">E-mail</label>                            
                        </div>
                        <InputText
                            v-model="tutorData.email"  
                            name="email" 
                            id="email" 
                            type="text" 
                            placeholder="Gato,Cachorro,Ave etc" />
                    </div>
                </div>
                <div class="inptBox">
                        <div class="labelBox">
                            <label for="endereco" class="label">Endereço</label>
                        </div>
                        <InputText
                        class="iptNome"
                            v-model="tutorData.endereco" 
                            name="endereco"
                            id="endereco"
                            type="text" 
                            placeholder="Digite o endereço" />
                </div>
                <Button class="button" type="submit" :disabled="isLoading">{{ isLoading ? 'Cadastrando...' : 'Cadastrar Tutor' }}</Button>
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
    width: 30%;
}
.button{
    background-color: #1DA9CF;
    width: 25%;
}
.button:hover{
    background-color: #7bd9f3 !important;
}
</style>