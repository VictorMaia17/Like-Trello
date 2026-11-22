import { useState } from "react";
import { Link, useNavigate } from "react-router";
import AuthCard from "../components/authCard/AuthCard";
import FormField from "../components/formField/FormField";
import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useAsync } from "../hooks/useAsync";
import { useToast } from "../hooks/useToast";

// Fica FORA do componente (o useAsync precisa de uma função que não muda a cada renderização)
async function enviarCadastro(dados) {
    let response;
    try {
        response = await fetch("http://localhost:8080/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
    } catch {
        throw new Error("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
    }

    if (!response.ok) {
        throw new Error(`Erro ao realizar cadastro (código ${response.status}). Tente novamente.`);
    }

    // se a API não devolver corpo, devolve um objeto vazio pra não contar como erro
    return response.json().catch(() => ({}));
}

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

export default function Register() {
    const navigate = useNavigate();
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novosErros = validar(form);
        setErrosCampos(novosErros);
        if (Object.keys(novosErros).length > 0) return;

        const data = await executar(form);

        if (data) {
            mostrarToast("Cadastro realizado com sucesso!");
            navigate("/login");
        }
    };

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