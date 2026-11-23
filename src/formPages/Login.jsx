import { Link } from "react-router"

import AuthCard from "../components/authCard/AuthCard";
import FormField from "../components/formField/FormField";

export default function Login(){
    return(
        <div className="
            flex
            items-center
            justify-center
            bg-red-500
            min-h-screen"
        >
            <AuthCard>
                <FormField label = "email" type= "email" id= "idEmail" placeholder= "exemplo@gmail.com"/>

                <FormField label = "senha" type= "password" id= "idSenha" placeholder= "senha"/>

                <div className="flex justify-between gap-8 mt-1">
                    <label className="flex items-center gap-3 cursor-pointer text-sm text-[#64748B]">
                        
                        <input
                        type="checkbox"
                        defaultChecked
                        className="w-[18px] h-[18px] accent-[#F0442E] cursor-pointer"
                        />
                        <span>Lembrar de mim</span>
                    </label>

                    <a href="#" className="text-sm text-[#8B9BB5] hover:text-[#7183A3] transition-colors">esqueci minha senha</a>
                </div>

                <button
                    id="btnEntrar"
                    className="
                        w-full
                        bg-[#E8442A]
                        hover:bg-[#C93820]
                        text-white
                        font-semibold
                        py-3
                        rounded-md
                        transition-colors
                        cursor-pointer
                        mt-3
                    "
                >
                    ENTRAR
                </button>

                <p className="text-center text-sm text-gray-500 mt-1">
                    Não tem uma conta?{" "}
                    <Link
                        to="/cadastro"
                        className="text-[#E8442A] font-medium hover:underline"
                    >
                        Cadastre-se
                    </Link>
                </p>

            </AuthCard>
        </div>
    )
}