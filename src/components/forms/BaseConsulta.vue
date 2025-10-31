<script setup>
    import { useConsultaAuthStore } from '@/stores/consultaStore';
    import { usePetAuthStore } from '@/stores/petStore';
    import { useVetAuthStore } from '@/stores/veterinarioStore';
    import { computed, onMounted, reactive } from 'vue';
    import { toast } from 'vue3-toastify'
    import InputText from 'primevue/inputtext';
    import Select from 'primevue/select';
    import Button from 'primevue/button';

    const authPetStore = usePetAuthStore()
    const authVetStore = useVetAuthStore()
    const authConsultaStore = useConsultaAuthStore()
    const isLoading = computed(() => authConsultaStore.isLoading)
    const vetName = computed(() => authVetStore.veterinarios)
    const petName = computed(() => authPetStore.pets)
    const consuData = reactive({
        pet: "",
        veterinario: "",
        data: "",
        motivo: "",
        hora:"",
    })

    const cadConsulta = async () => {
      const result = await authConsultaStore.cadConsulta({
        pet: consuData.pet,
        veterinario: consuData.veterinario,
        data: consuData.data,
        motivo: consuData.motivo,
        motivo: consuData.hora
      })
      if (result.success) {
            toast.success('Consulta agendada com sucesso!')
        } else {
            toast.error(result.error || 'Erro ao agendar consulta')
        }
    }

    const loadData = async () => {
        const [vetResult, petResult] = await Promise.all([
            authVetStore.allVets(),
            authPetStore.allPets()
        ])

        if (!vetResult.success) console.error('Erro ao carregar veterinários:', vetResult.error)
        if (!petResult.success) console.error('Erro ao carregar pets:', petResult.error)
    }

    onMounted(loadData)
</script>
<template>
     <div class="container">
        <div class="boxLine">
            <div class="boxTitle">
                <p class="title">Agendar Consulta</p>
            </div>
            <div class="line"></div>
        </div>
        <div class="formBox">
            <form @submit.prevent="cadConsulta" class="formulario">
                <div class="reBox">
                    <div>
                        <div class="conjunBox">                            
                            <label for="pet" class="label">Pet</label>
                        </div>
                        <Select
                        id="pet"
                        v-model="consuData.pet"
                        :options="petName"
                        optionLabel="pet"       
                        optionValue="pet"       
                        placeholder="Selecione um pet"
                    />
                    </div>
                    <div>
                        <div class="conjunBox">                            
                            <label for="tutor" class="label">Tutor</label>
                        </div>
                        <Select
                        id="tutor"
                        v-model="consuData.veterinario"
                        :options="vetName"
                        optionLabel="veterinario"       
                        optionValue="veterinario"       
                        placeholder="Selecione um tutor"
                    />
                    </div>
                </div>
                <div class="reBox">
                    <div>
                        <div class="conjunBox">
                            <label for="hora" class="label">Hora</label>
                        </div>
                        <InputText 
                            v-model="consuData.hora" 
                            name="hora"
                            id="hora"
                            type="time" 
                            placeholder="(00) 00000-0000" />
                    </div>
                    <div>
                        <div class="conjunBox">
                            <label for="data" class="label">Data</label>                            
                        </div>
                        <InputText
                            v-model="consuData.data"  
                            name="data" 
                            id="data" 
                            type="date" 
                          />
                    </div>
                </div>
                <div class="inptBox">
                    <div class="labelBox">
                        <label for="motivo" class="label">Motivo</label>
                    </div>
                    <InputText 
                        class="iptNome" 
                        v-model="consuData.motivo" 
                        name="motivo"
                        id="motivo"
                        type="text"
                        placeholder="Digite o motivo do agendamento" />
                </div>
                <Button class="button" type="submit" :disabled="isLoading">{{ isLoading ? 'Agendando...' : 'Agendar Consulta' }}</Button>
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