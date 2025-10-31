
const API_BASE = "http://localhost:3000"

export const authTutorService = {
    async getAllTutor(){
        try{
            const response = await fetch(`${API_BASE}/tutores`)
            if(!response.ok){
                throw new Error(`Erro ao buscar todos os tutores ${response.status}`)
            }
            const data = await response.json();
            return{
                success:true,
                data: data
            }
        }catch(error){
            return{
                success:false,
                error: error.message || "Erro inesperado ao buscar tutores"
            }
        }
    },
    async postTutor(tutorData){
        try{
            const response = await fetch(`${API_BASE}/tutores`, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(tutorData)
            })
            if(!response.ok){
                throw new Error(`Erro ao cadastrar tutor ${response.status}`)
            }
            const data = await response.json()
            return{
                success: true,
                data: data
            }
        }catch(error){
            return{
                success: false,
                error: error.message || "Erro inesperado ao cadastrar tutor"
            }
        }
    },
   
}