import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../../services/userService";
import { useAsync } from "../hooks/useAsync";
import { useToast } from "../hooks/useToast";
import AuthCard from "../../components/auth/AuthCard";
import FormField from "../../components/auth/FormField";
import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function Register() {
    const { mostrarToast } = useToast();
    const { executar, loading, erro: erroApi } = useAsync(enviarCadastro);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [errosCampos, setErrosCampos] = useState({});

    const handleFormChange = (field) => (e) => {
        setForm((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
        // some com o erro do campo assim que a pessoa volta a digitar
        setErrosCampos((prev) => ({ ...prev, [field]: undefined }));
    };

     function validar({ username, email, password }) {
    const erros = {};

    if (!username.trim()) {
        erros.username = "Informe um nome de usuário.";
    } else if (username.trim().length < 3) {
        erros.username = "O usuário precisa ter pelo menos 3 caracteres.";
    }

    if (!email.trim()) {
        erros.email = "Informe seu e-mail.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        erros.email = "E-mail inválido.";
    }

    if (!password) {
        erros.password = "Informe uma senha.";
    } else if (password.length < 6) {
        erros.password = "A senha precisa ter pelo menos 6 caracteres.";
    }

    return erros;
}

    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();

        try 
        {

            const novosErros = validar(form);
            setErrosCampos(novosErros);
            if (Object.keys(novosErros).length > 0) return;

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
                <form onSubmit={handleSubmit} noValidate className="w-full">
                    <FormField
                        label="usuário"
                        type="text"
                        id="idUsername"
                        placeholder="seu_usuario"
                        value={form.username}
                        onChange={handleFormChange("username")}
                        icon="fa-user"
                        error={errosCampos.username}
                        disabled={loading}
                    />

                    <FormField
                        label="email"
                        type="email"
                        id="idEmail"
                        placeholder="exemplo@gmail.com"
                        value={form.email}
                        onChange={handleFormChange("email")}
                        icon="fa-envelope"
                        error={errosCampos.email}
                        disabled={loading}
                    />

                    <FormField
                        label="senha"
                        type="password"
                        id="idSenha"
                        placeholder="senha"
                        value={form.password}
                        onChange={handleFormChange("password")}
                        icon="fa-lock"
                        error={errosCampos.password}
                        disabled={loading}
                    />

                    {erroApi && (
                        <div className="mt-3">
                            <ErrorMessage mensagem={erroApi} />
                        </div>
                    )}

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
                            flex
                            items-center
                            justify-center
                            gap-2
                            disabled:opacity-70
                            disabled:cursor-not-allowed
                        "
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner tamanho="h-4 w-4" cor="border-white/40 border-t-white" />
                                CADASTRANDO...
                            </>
                        ) : (
                            "CADASTRAR"
                        )}
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