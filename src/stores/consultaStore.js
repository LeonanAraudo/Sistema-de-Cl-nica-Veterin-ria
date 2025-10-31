import { authConsultaService } from "@/service/consultaService";
import { defineStore } from "pinia";

export const useConsultaAuthStore = defineStore("authConsulta",{
    state: ()  => ({
        consulta: [],
        isLoading: false
    }),
    actions: {
        async allConsultas(){
            this.isLoading = true
            try{
                const result = await authConsultaService.getAllConsultas()
                if(result.success){
                    this.consulta = result.data
                    return{
                        success:true,
                    }
                }else{
                    return{
                        success:false,
                        error: result.error
                    }
                }
            }catch(error){
                return{ 
                    success:false,
                    error: error.message || "Erro inesperado ao buscar consultas"
                }
            }finally{
             this.isLoading = false
            }
        },
        async cadConsulta(consultaData){
            this.isLoading = true
            try{
                const result = await authConsultaService.postConsultas(consultaData)
                if(result.success){
                    this.consulta.push(result.data)
                }
                return result
            }finally{
                this.isLoading = false
            }
        }
    }

})