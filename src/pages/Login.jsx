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
            
                <a href="#" className="text-gray-400">Esqueci minha senha</a>

                <FormField label = "senha" type= "password" id= "idSenha" placeholder= "senha"/>

            </AuthCard>
        </div>
    )
}