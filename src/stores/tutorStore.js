import { defineStore } from "pinia";
import { authTutorService } from "@/service/tutorService";

export const useTutorAuthStore = defineStore("authTutor",{
    state: ()  => ({
        Tutors: [],
        TutorName: [],
        isLoading: false
    }),
    actions: {
        async allTutors(){
            this.isLoading = true
            try{
                const result = await authTutorService.getAllTutor()
                if(result.success){
                    this.Tutors = result.data
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
                    error: error.message || "Erro inesperado ao buscar tutores"
                }
            }finally{
             this.isLoading = false
            }
        },

        async cadTutor(tutorData){
            this.isLoading = true
            try{
                const result = await authTutorService.postTutor(tutorData)
                if(result.success){
                    this.Tutors.push(result.data)
                }
                return result
            }finally{
                this.isLoading = false
            }
        },

        async searchTutorName(){
            this.isLoading = true
            try{
                const result = await authTutorService.getTutorName()
                if(result.success){
                    this.TutorName = result.data
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