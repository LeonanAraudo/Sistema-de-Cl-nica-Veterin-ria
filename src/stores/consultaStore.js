import { authConsultaService } from "@/service/consultaService";
import { defineStore } from "pinia";

export const useConsultaAuthStore = defineStore("authConsulta", {
    state: () => ({
        consulta: [],
        isLoading: false
    }),
    actions: {
        async allConsultas() {
            this.isLoading = true
            try {
                const result = await authConsultaService.getAllConsultas()
                if (result.success) {
                    this.consulta = result.data
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
                    error: error.message || "Erro inesperado ao buscar consultas"
                }
            } finally {
                this.isLoading = false
            }
        },
        async cadConsulta(consultaData) {
            this.isLoading = true
            try {
                const result = await authConsultaService.postConsultas(consultaData)
                if (result.success) {
                    this.consulta.push(result.data)
                }
                return result
            } finally {
                this.isLoading = false
            }
        },
        async delConsulta(id) {
            this.isLoading = true
            try {
                const result = await authConsultaService.deleteConsulta(id)
                if (result.success) {
                    this.consulta = this.consulta.filter(t => t.id !== id);
                }
                return result;
            } finally {
                this.isLoading = false
            }
        },
        async editConsulta(id, updatedData) {
            this.isLoading = true
            try {
                const result = await authConsultaService.updateConsulta(id, updatedData)
                if (result.success) {
                    this.consulta = this.consulta.map(t => t.id === id ? { ...t, ...result.data } : t)
                }
                return result
            } catch (error) {
                return {
                    success: false,
                    error: error.message || "Erro inesperado ao editar consulta"
                }
            } finally {
                this.isLoading = false
            }
        }
    }

})