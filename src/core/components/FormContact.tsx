import React from "react";
import { InputComponets } from "./ui/InputComponets";
import type { Contact } from "../../stores/contact";
import ImgProfile from '../../assets/default-avatar-profile-icon-social-600nw-1906669723.webp'; export const FormContact = ({ formValue, setFormValue, error, setError }: { formValue: Contact, setFormValue: React.Dispatch<React.SetStateAction<Contact>>, error: { isError: boolean, message: string }, setError: React.Dispatch<React.SetStateAction<{ isError: boolean, message: string }>> }) => {

    return (
        <div className="flex flex-col gap-2 border border-gray-200 p-4 rounded-2xl">
            <div className="flex justify-center items-center">
                <img src={ImgProfile} alt="profile" className="w-20 h-20 rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex ml-1 items-center">
                    <label htmlFor="name" className="text-sm font-light">Nombres</label>
                </div>
                <InputComponets
                    value={formValue.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValue({ ...formValue, name: e.target.value })}
                    type="text"
                    placeholder="Nombres"
                    isError={error.isError}
                    message={error.message}
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex ml-1 items-center">
                    <label htmlFor="description" className="text-sm font-light">Descripción</label>
                </div>
                <InputComponets
                    value={formValue.descriptions}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValue({ ...formValue, descriptions: e.target.value })}
                    type="text"
                    placeholder="Descripción"
                    isError={error.isError}
                    message={error.message}
                />
            </div>
        </div >
    )
}