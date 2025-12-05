import type { Contact } from "../../stores/contact"

export const validateFormContact = (formValue: Contact, setError: React.Dispatch<React.SetStateAction<{ isError: boolean, message: string }>>): boolean => {
    if (!formValue.name || !formValue.descriptions) {
        setError({ isError: true, message: 'Todos los campos son obligatorios' })
        return false
    }
    setError({ isError: false, message: '' })
    return true
}