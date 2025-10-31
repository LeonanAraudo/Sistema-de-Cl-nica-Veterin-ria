import { authVetService } from "@/service/veterinarioService";
import { defineStore } from "pinia";

export const useVetAuthStore = defineStore("authVet",{
    state: ()  => ({
        veterinarios: [],
        isLoading: false
    }),
    actions: {
        async allVets(){
            this.isLoading = true
            try{
                const result = await authVetService.getAllVet()
                if(result.success){
                    this.veterinarios = result.data
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
                    error: error.message || "Erro inesperado ao buscar veterinarios"
                }
            }finally{
             this.isLoading = false
            }
        },
    }
})