
const URL_API = "http://localhost:4001/api/contacts" as string


 const webApiServices = {
    getListContactServices: async () => {
        const results = fetch(`${URL_API}/list`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return results
    }   
}
export default webApiServices