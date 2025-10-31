
export const authTutorService = {
    async getAllTutor(){
        try{
            const response = await fetch("http://localhost:3000/tutores")
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
                error: error.message | "Erro inesperado ao buscar tutores"
            }
        }
    },
    async postTutor(tutorData){
        try{
            const response = await fetch("http://localhost:3000/tutores", {
                method: "POST",
                headers: {"Content-Type" : "aplication/json"},
                body: JSON.stringify(tutorData)
            })
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
    async getTutorName(){
        try{
            const response = await fetch("http://localhost:3000/tutores")
            if(!response.ok){
                throw new Error(`Erro ao pegar nome do tutor ${response.status}`)
            }
            const data = await response.json()
            const nomes = data.map(tutor => tutor.nome)
            return{
                success: true,
                data: nomes
            }
        }catch(error){
            return{
                success: false,
                error: error.message || "Erro inesperado ao buscar nomes de tutores"
            }
        }
    }
}