<script setup>
    import { useTutorAuthStore } from '@/stores/tutorStore';
    import { computed, reactive,  } from 'vue';
    import { toast } from 'vue3-toastify'
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';
    import '../../assets/form.css'
    
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
<style>
</style>