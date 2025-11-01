
const API_BASE = "http://localhost:3000"

export const authConsultaService = {
    async getAllConsultas(){
        try{
            const response = await fetch(`${API_BASE}/consultas`)
            if(!response.ok){
                throw new Error(`Erro ao buscar todas as consultas ${response.status}`)
            }
            const data = await response.json();
            return{
                success:true,
                data: data
            }
        }catch(error){
            return{
                success:false,
                error: error.message || "Erro inesperado ao buscar consultas"
            }
        }
    },
    async postConsultas(consultaData){
        try{
            const response = await fetch(`${API_BASE}/consultas`, {
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(consultaData)
            })
            if(!response.ok){
                throw new Error(`Erro ao agendar consulta ${response.status}`)
            }
            const data = await response.json()
            return{
                success: true,
                data: data
            }
        }catch(error){
            return{
                success: false,
                error: error.message || "Erro inesperado ao tentar agendar consulta"
            }
        }
    },
    async deleteConsulta(id){
        try{
            const response = await fetch(`${API_BASE}/consultas/${id}`, {
                method: "DELETE"
            })
            if(!response.ok){
                throw new Error(`Erro ao deletar pet ${response.status}`)
            }
            return{
                success:true
            }
        }catch(error){
            return{
                success:false,
                error: error.message || "Erro inesperado ao deletar pet"
            }
        }
    },
     async updateConsulta(id,updateConsulta){
        try{
            const response = await fetch(`${API_BASE}/consultas/${id}`, {
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(updateConsulta)
            })
            if(!response.ok){
                throw new Error("Erro ao editar dados da consulta")
            }
            const data = await response.json()
            return{
                success: true,
                data: data
            }
        }catch(error){
            return{
                success: false,
                error: error.message || "Erro inesperado ao tentar editar consulta"
            }
        }
    }

}
