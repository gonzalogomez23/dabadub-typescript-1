import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "@/axios-client";
import { useStateContext } from "@contexts/ContextProvider";
import LogoDabadub from "@assets/LogoDabadub";
import PrimaryButton from "@components/PrimaryButton";

export default function Signup() {
    
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    
    const [errors, setErrors] = useState(null)
    const {setUser, setToken} = useStateContext()

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        
        axiosClient.post('/signup', payload)
            .then(({data}) => {
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
                <h1 className="title">Login into your account</h1>
                {errors && <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>}
                <input className="w-96 max-w-full border rounded-lg px-4 py-2 focus:outline-primary" ref={nameRef} placeholder="Full Name"/>
                <input className="w-96 max-w-full border rounded-lg px-4 py-2 focus:outline-primary" ref={emailRef} type="email" placeholder="Email Adress"/>
                <input className="w-96 max-w-full border rounded-lg px-4 py-2 focus:outline-primary" ref={passwordRef} type="password" placeholder="Password"/>
                <input className="w-96 max-w-full border rounded-lg px-4 py-2 focus:outline-primary" ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation"/>
                <PrimaryButton className="ms-auto" onClick={handleSubmit} type="submit">
                    Signup
                </PrimaryButton>
                <p className="w-full text-end">
                    Already Registered? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
                </p>
            </form>
        </div>
    )
}