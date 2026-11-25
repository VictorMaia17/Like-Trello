import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../../services/userService";
import AuthCard from "../../components/auth/AuthCard";
import FormField from "../../components/auth/FormField";

export default function Register() {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleFormChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    };

     const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            await registerUser(form);

            navigate("/login", {
                state: {
                    message: "Cadastro realizado com sucesso!"
                }
            });

        } catch (error) {
            console.error("Erro:", error);
        }
    }
    
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
                <form onSubmit={handleSubmit}>
                    <FormField
                        label="usuário"
                        type="text"
                        id="idUsername"
                        placeholder="seu_usuario"
                        value={form.username}
                        onChange={handleFormChange("username")}
                        icon="fa-user"
                    />

                    <FormField
                        label="email"
                        type="email"
                        id="idEmail"
                        placeholder="exemplo@gmail.com"
                        value={form.email}
                        onChange={handleFormChange("email")}
                        icon="fa-envelope"
                    />

                    <FormField
                        label="senha"
                        type="password"
                        id="idSenha"
                        placeholder="senha"
                        value={form.password}
                        onChange={handleFormChange("password")}
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
                        type="submit"
                        >
                        CADASTRAR
                    </button>
                </form>

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