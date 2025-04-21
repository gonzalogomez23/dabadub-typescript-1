import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client.js";
import DabadubBox from "../assets/DabadubBox";
import PrimaryButton from "components/PrimaryButton";
import LogoDabadub from "/src/assets/LogoDabadub";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    
    const [errors, setErrors] = useState(null)
    const {setUser, setToken} = useStateContext()

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        setErrors(null)
        
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message]
                        });
                    }
                }
            })
    }

    return (
        <div className="flex bg-white bg-gradient-to-br from-light1 to-transparent min-h-screen w-full flex-col items-center justify-center gap-8 p-4">
            <LogoDabadub className="w-24"/>
            <form className="max-w-full flex flex-col items-start bg-white/60 border border-border1 shadow-sm rounded-xl gap-4 py-6 px-4 lg:p-8" action="" onSubmit={handleSubmit}>
                <h1 className="title">Login into your account</h1>
                
                <input className="w-96 max-w-full border rounded-lg px-4 py-2 focus:outline-primary" ref={emailRef} type="email" placeholder="Email"/>
                <input className="w-96 max-w-full border rounded-lg px-4 py-2 focus:outline-primary" ref={passwordRef} type="password" placeholder="Password"/>
                {errors && <ul className="text-red-700">
                    {Object.keys(errors).map(key => (
                        <li key={key}>{errors[key][0]}</li>
                    ))}
                </ul>}
                <PrimaryButton className="ms-auto" onClick={handleSubmit} type="submit">
                    Login
                </PrimaryButton>
                <p className="w-full text-end">
                    Not Registered? <Link to="/signup" className="text-primary hover:underline">Create an acount</Link>
                </p>
            </form>
        </div>
    )
}