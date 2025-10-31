import { defineStore } from "pinia";
import { authPetService } from "@/service/petService";

export const usePetAuthStore = defineStore("authPet",{
    state: ()  => ({
        pets: [],
        petNames: [],
        isLoading: false
    }),
    actions: {
        async allPets(){
            this.isLoading = true
            try{
                const result = await authPetService.getAllPets()
                if(result.success){
                    this.pets = result.data
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
                    error: error.message || "Erro inesperado ao buscar pets"
                }
            }finally{
             this.isLoading = false
            }
        },
        async cadPet(petData){
            this.isLoading= true
            try{
                const result = await authPetService.postPet(petData)
                if(result.success){
                    this.pets.push(result.data)
                } 
                return result
            }finally{
                this.isLoading= false
            }
        },
        async searchPetName(){
            this.isLoading=true
            try{
                const result = await authPetService.getPetName()
                if(result.success){
                    this.petNames = result.data
                }
                return {
                    success: true
                }
            }catch(error){
                return{
                        success:false,
                        error: result.error
                    }
            }finally{
                this.isLoading = false
            }
        }
    }

})