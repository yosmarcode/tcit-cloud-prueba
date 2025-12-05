import React from "react";
import { InputComponets } from "./ui/InputComponets";
import type { Contact } from "../../stores/contact";

export const FormContact = ({ formValue, setFormValue }: { formValue: Contact, setFormValue: React.Dispatch<React.SetStateAction<Contact>> }) => {

    return (
        <div className="flex flex-col gap-2">


            <div className="flex flex-col gap-2">
                <div className="flex ml-1 items-center">
                    <label htmlFor="name" className="text-sm font-light">Nombre</label>
                </div>
                <InputComponets
                    value={formValue.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValue({ ...formValue, name: e.target.value })}
                    type="text"
                    placeholder="Nombre"
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex ml-1 items-center">
                    <label htmlFor="descriptions" className="text-sm font-light">Descripción</label>
                </div>
                <InputComponets
                    value={formValue.descriptions}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValue({ ...formValue, descriptions: e.target.value })}
                    type="text"
                    placeholder="Descripción"
                />
            </div>
        </div >
    )
}