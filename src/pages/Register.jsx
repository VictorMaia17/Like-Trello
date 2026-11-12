import { Link } from "react-router";
import AuthCard from "../components/authCard/AuthCard";
import FormField from "../components/formField/FormField";

export default function Register() {
    return (
        <div
            className="
                flex
                items-center
                justify-center
                bg-red-500
                min-h-screen"
        >
            <AuthCard>
                <FormField
                    label="usuário"
                    type="text"
                    id="idUsername"
                    placeholder="seu_usuario"
                    icon="fa-user"
                />

                <FormField
                    label="email"
                    type="email"
                    id="idEmail"
                    placeholder="exemplo@gmail.com"
                    icon="fa-envelope"
                />

                <FormField
                    label="senha"
                    type="password"
                    id="idSenha"
                    placeholder="senha"
                    icon="fa-lock"
                />

                <button
                    id="btnCadastrar"
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
                    CADASTRAR
                </button>

                <p className="text-center text-sm text-gray-500 mt-1">
                    Já tem uma conta?{" "}
                    <Link
                        to="/login"
                        className="text-[#E8442A] font-medium hover:underline"
                    >
                        Entrar
                    </Link>
                </p>

            </AuthCard>
        </div>
    );
}