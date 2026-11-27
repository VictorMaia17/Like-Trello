import { useState } from "react"
import { loginUser } from "../../services/userService";
import { Link,  useNavigate } from "react-router"
import AuthCard from "../../components/auth/AuthCard";
import FormField from "../../components/auth/FormField";
import { setAuthToken } from "../../services/storage/auth";
import { useToast } from "../../hooks/useToast";

export default function Login(){

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const { showToast } = useToast();

    const handleFormChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    };

    const navigate = useNavigate();
    const destination = location.state?.from?.pathname || "/dashboard";

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{
            const response = await loginUser(form);
            setAuthToken(response.accessToken);
            console.log("Usuário logado!", response);
            showToast("Cadastro realizado com sucesso!");

            navigate(destination);
        }
        catch (error) {
            console.error("Erro ao realizar login", error);
        }
    }

    return(
        <div className="
            flex
            items-center
            justify-center
            bg-red-500
            min-h-screen"
        >
            <AuthCard>
                <form onSubmit={handleSubmit}>
                    <FormField 
                        label = "email" 
                        type= "email" 
                        id= "idEmail" 
                        placeholder= "exemplo@gmail.com"
                        value={form.email}
                        onChange={handleFormChange("email")}
                    />

                    <FormField 
                        label = "senha"
                        type= "password"
                        id= "idSenha"
                        placeholder= "senha"
                        value={form.password}
                        onChange={handleFormChange("password")}
                    />

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
                        type="submit"
                    >
                        ENTRAR
                    </button>

                </form>

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