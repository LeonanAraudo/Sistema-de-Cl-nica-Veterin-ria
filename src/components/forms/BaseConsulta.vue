<script setup>
    import { useConsultaAuthStore } from '@/stores/consultaStore';
    import { usePetAuthStore } from '@/stores/petStore';
    import { useVetAuthStore } from '@/stores/veterinarioStore';
    import { computed, onMounted, reactive } from 'vue';
    import { toast } from 'vue3-toastify'
    import InputText from 'primevue/inputtext';
    import Select from 'primevue/select';
    import Button from 'primevue/button';
    import '../../assets/form.css'

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
        hora: consuData.hora
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

    onMounted(async () => {
       await loadData()
    })
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
                            optionLabel="nome"       
                            optionValue="nome"       
                            placeholder="Selecione um pet"
                    />
                    </div>
                    <div>
                        <div class="conjunBox">                            
                            <label for="veterinario" class="label">Veterinário</label>
                        </div>
                        <Select
                            id="veterinario"
                            v-model="consuData.veterinario"
                            :options="vetName"
                            optionLabel="nome"       
                            optionValue="nome"       
                            placeholder="Selecione um Veterinário"
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
                            placeholder="(00) 00000-0000"
                            required
                            />
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
                            required
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
                        placeholder="Digite o motivo do agendamento"
                        required
                        />
                </div>
                <Button class="button" type="submit" :disabled="isLoading">{{ isLoading ? 'Agendando...' : 'Agendar Consulta' }}</Button>
            </form>
        </div>
    </div>
</template>
<style>
.p-select,
input[type="date"],
input[type="time"] {
  width: 205px;
}
</style>