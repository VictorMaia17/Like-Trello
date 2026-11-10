export default function FormField(){
    return(
        <div className="login-field">
            <label>E-mail</label>
            <div className="input-icon">
                <i className="fas fa-envelope"></i>
                <input 
                    type="email"
                    id="loginEmail"
                    placeholder="seu@email.com"/>
            </div>
        </div>
    )
}