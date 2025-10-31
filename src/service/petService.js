
export const authPetService = {
    async getAllPets(){
        try{
            const response = await fetch("http://localhost:3000/pets")
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
                error: error.message | "Erro inesperado ao buscar pets"
            }
        }
    },
    async postPet(petData){
        try{
        const response = await fetch("http://localhost:3000/pets", {
            method: 'POST',
            headers: {'Content-Type' : 'aplication/json'},
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
    async getPetName(){
        try{
            const response = await fetch("http://localhost:3000/pets")
            if(!response.ok){
                throw new Error(`Erro ao pegar nome de pet ${response.status}`)
            }
            const data = await response.json()

            const nomes = data.map(pet => pet.nome)
            return{
                success: true,
                data: nomes
            }
        }catch(error){
            return{
                success:false,
                error: error.message || "Erro inesperado ao pegar nome de pet"
            }
        }
    }
}