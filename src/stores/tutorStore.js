import { defineStore } from "pinia";
import { authTutorService } from "@/service/tutorService";

export const useTutorAuthStore = defineStore("authTutor", {
    state: () => ({
        tutors: [],
        isLoading: false
    }),
    actions: {
        async allTutors() {
            this.isLoading = true
            try {
                const result = await authTutorService.getAllTutor()
                if (result.success) {
                    this.tutors = result.data
                    return {
                        success: true,
                    }
                } else {
                    return {
                        success: false,
                        error: result.error
                    }
                }
            } catch (error) {
                return {
                    success: false,
                    error: error.message || "Erro inesperado ao buscar tutores"
                }
            } finally {
                this.isLoading = false
            }
        },

        async cadTutor(tutorData) {
            this.isLoading = true
            try {
                const result = await authTutorService.postTutor(tutorData)
                if (result.success) {
                    this.tutors.push(result.data)
                }
                return result
            } finally {
                this.isLoading = false
            }
        },
        async delTutor(id) {
            this.isLoading = true
            try {
                const result = await authTutorService.deleteTutor(id)
                if (result.success) {
                    this.tutors = this.tutors.filter(t => t.id !== id);
                }
                return result;
            } finally {
                this.isLoading = false
            }
        },
        async editTutor(id, updatedData) {
            this.isLoading = true
            try {
                const result = await authTutorService.updateTutor(id, updatedData)

                if (result.success) {
                    this.tutors = this.tutors.map(t => t.id === id ? { ...t, ...result.data } : t)
                }

                return result
            } catch (error) {
                return {
                    success: false,
                    error: error.message || "Erro inesperado ao editar tutor"
                }
            } finally {
                this.isLoading = false
            }
        }
    }

})