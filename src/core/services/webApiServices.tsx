import type { Contact } from "../../stores/contact"

const URL_API = "http://localhost:4001/api/contacts" as string


const webApiServices = {
    getListContactServices: async () => {
        const results = fetch(`${URL_API}/list`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return results
    },
    getContactByNameServices: async (name: string) => {
        const results = fetch(`${URL_API}/contact/${name}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return results
    },
    createContactServices: async (contact: Contact) => {
        const results = fetch(`${URL_API}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        })
        return results
    },
    updateContactServices: async (contact: Contact) => {
        const results = fetch(`${URL_API}/contact/${contact.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        })
        return results
    },
    deleteContactServices: async (id: number) => {
        const results = fetch(`${URL_API}/contact/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        return results
    }
}
export default webApiServices