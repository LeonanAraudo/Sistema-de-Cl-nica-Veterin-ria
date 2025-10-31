
export const authConsultaService = {
    async getAllConsultas(){
        try{
            const response = await fetch("http://localhost:3000/consultas")
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
                error: error.message | "Erro inesperado ao buscar consultas"
            }
        }
    }
}