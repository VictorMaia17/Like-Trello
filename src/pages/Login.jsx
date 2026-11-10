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
                <FormField/>
            </AuthCard>
        </div>
    )
}