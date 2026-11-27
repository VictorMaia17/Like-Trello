
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { registerUser } from "../../services/userService";
import { useAsync } from "../../hooks/useAsync";
import { useToast } from "../../hooks/useToast";

import AuthCard from "../../components/auth/AuthCard";
import FormField from "../../components/auth/FormField";
import Spinner from "../../components/ui/Spinner";
import ErrorMessage from "../../components/ui/ErrorMessage";

function validateForm({ username, email, password }) {
    const errors = {};

    if (!username.trim()) {
        errors.username = "Informe um nome de usuário.";
    } else if (username.trim().length < 3) {
        errors.username = "O usuário precisa ter pelo menos 3 caracteres.";
    }

    if (!email.trim()) {
        errors.email = "Informe seu e-mail.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.email = "E-mail inválido.";
    }

    if (!password) {
        errors.password = "Informe uma senha.";
    } else if (password.length < 6) {
        errors.password = "A senha precisa ter pelo menos 6 caracteres.";
    }

    return errors;
}

export default function Register() {
    const navigate = useNavigate();

    const { showToast } = useToast();

    const {
        executar: execute,
        loading,
        erro: apiError
    } = useAsync(registerUser);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [fieldErrors, setFieldErrors] = useState({});

    const handleFormChange = (field) => (e) => {
        setForm((prev) => ({
            ...prev,
            [field]: e.target.value
        }));

        setFieldErrors((prev) => ({
            ...prev,
            [field]: undefined
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm(form);

        setFieldErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        const result = await execute(form);

        if (result !== undefined) {
            showToast("Cadastro realizado com sucesso!");

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
                min-h-screen
            "
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
                        error={fieldErrors.username}
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
                        error={fieldErrors.email}
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
                        error={fieldErrors.password}
                        disabled={loading}
                    />

                    {apiError && (
                        <div className="mt-3">
                            <ErrorMessage mensagem={apiError} />
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
                                <Spinner
                                    tamanho="h-4 w-4"
                                    cor="border-white/40 border-t-white"
                                />
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
