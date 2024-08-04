import { useState } from "react";

export const useForm = (initialObject = {}) => {
    const [form, setForm] = useState(initialObject);
    
    const serializeForm = (form) => {
        const formData = new FormData(form);
        const finalObject = {};
        for (let [name, value] of formData){
            finalObject[name] = value;
        };
        return finalObject;
    };

    const send = (e) => {
        e.preventDefault();
        const serializedForm = serializeForm(form);
        setForm(serializedForm);
        e.target.classList.add("sent");
    };

    const change = ({target}) => {
        const {name, value} = target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const clear = () => {
        console.log(form);
    };


    return {
        form,
        send,
        change,
        clear
    };
};