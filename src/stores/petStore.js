import { defineStore } from "pinia";
import { authPetService } from "@/service/petService";

export const usePetAuthStore = defineStore("authPet", {
    state: () => ({
        pets: [],
        isLoading: false
    }),
    actions: {
        async allPets() {
            this.isLoading = true
            try {
                const result = await authPetService.getAllPets()
                if (result.success) {
                    this.pets = result.data
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
                    error: error.message || "Erro inesperado ao buscar pets"
                }
            } finally {
                this.isLoading = false
            }
        },
        async cadPet(petData) {
            this.isLoading = true
            try {
                const result = await authPetService.postPet(petData)
                if (result.success) {
                    this.pets.push(result.data)
                }
                return result
            } finally {
                this.isLoading = false
            }
        },
        async delPet(id) {
            this.isLoading = true
            try {
                const result = await authPetService.deletePet(id)
                if (result.success) {
                    this.pets = this.pets.filter(t => t.id !== id);
                }
                return result;
            } finally {
                this.isLoading = false
            }
        },
        async editPet(id, updatedData) {
            this.isLoading = true
            try {
                const result = await authPetService.updatePet(id, updatedData)

                if (result.success) {
                    this.pets = this.pets.map(t => t.id === id ? { ...t, ...result.data } : t)
                }

                return result
            } catch (error) {
                return {
                    success: false,
                    error: error.message || "Erro inesperado ao editar pet"
                }
            } finally {
                this.isLoading = false
            }
        }

    }

})