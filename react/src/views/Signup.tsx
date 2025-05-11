import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "@/axios-client";
import { useStateContext } from "@contexts/ContextProvider";
import LogoDabadub from "@assets/LogoDabadub";
import PrimaryButton from "@components/PrimaryButton";
import { type User as UserType } from "@/types";

export default function Signup() {
    
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);
    
    const [errors, setErrors] = useState<Record<string, string[]> | null>(null)
    const {setUser, setToken} = useStateContext()

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current?.value || "",
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || "",
            password_confirmation: passwordConfirmationRef.current?.value || "",
        }
        
        axiosClient.post('/signup', payload)
            .then(({ data }: { data: { user: UserType; token: string } }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            })
    }

    return (
        <div className="flex bg-white bg-gradient-to-br from-light1 to-transparent min-h-screen w-full flex-col items-center justify-center gap-8 p-4">
            <LogoDabadub className="w-24"/>
            <form className="max-w-full flex flex-col items-start bg-white/60 border border-border1 shadow-sm rounded-xl gap-4 py-6 px-4 lg:p-8" action="" onSubmit={handleSubmit}>
                <h1 className="title">Create your account</h1>
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key]?.[0] || "Unknown error"}</p>
                    ))}
                </div>}
                <input className="w-96 max-w-full border rounded-lg px-4 py-2 focus:outline-primary" ref={nameRef} placeholder="Full Name"/>
                <input className="w-96 max-w-full border rounded-lg px-4 py-2 focus:outline-primary" ref={emailRef} type="email" placeholder="Email Adress"/>
                <input className="w-96 max-w-full border rounded-lg px-4 py-2 focus:outline-primary" ref={passwordRef} type="password" placeholder="Password"/>
                <input className="w-96 max-w-full border rounded-lg px-4 py-2 focus:outline-primary" ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation"/>
                <PrimaryButton className="ms-auto" type="submit">
                    Signup
                </PrimaryButton>
                <p className="w-full text-end">
                    Already Registered? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
                </p>
            </form>
        </div>
    )
}