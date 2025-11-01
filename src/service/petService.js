
const API_BASE = "http://localhost:3000"

export const authPetService = {
    async getAllPets(){
        try{
            const response = await fetch(`${API_BASE}/pets`)
            if(!response.ok){
                throw new Error(`Erro ao buscar todos os pets ${response.status}`)
            }
            const data = await response.json();
            return{
                success:true,
                data: data
            }
        }catch(error){
            return{
                success:false,
                error: error.message || "Erro inesperado ao buscar pets"
            }
        }
    },
    async postPet(petData){
        try{
        const response = await fetch(`${API_BASE}/pets`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(petData)
        })
        if(!response.ok){
            throw new Error(`Erro ao criar pet ${response.status}`)
        }
        const data = await response.json()
        return{
            success:true,
            data: data
        }
    }catch(error){
        return{
            success: false,
            error: error.message || "Erro inesperado ao buscar pets"
        }
    }
    },
    async deletePet(id){
        try{
            const response = await fetch(`${API_BASE}/pets/${id}`, {
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
     async updatePet(id,updatePet){
        try{
            const response = await fetch(`${API_BASE}/pets/${id}`, {
                method: "PATCH",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(updatePet)
            })
            if(!response.ok){
                throw new Error("Erro ao editar dados do pet")
            }
            const data = await response.json()
            return{
                success: true,
                data: data
            }
        }catch(error){
            return{
                success: false,
                error: error.message || "Erro inesperado ao tentar editar pet"
            }
        }
    }
}