const API_BASE = "http://localhost:3000"

export const authVetService = {
    async getAllVet(){
        try{
        const response = await fetch(`${API_BASE}/veterinarios`)
        if(!response.ok){
            throw new Error(`Erro ao buscar veterinarios: ${response.status}`)
        }
        const data = await response.json()
        return{
            success: true,
            data: data
        }
        }catch(error){
            return{
                success: false,
                error: error.message || "Erro inesperado ao buscar veterinarios"
            }
        }   
     }
}