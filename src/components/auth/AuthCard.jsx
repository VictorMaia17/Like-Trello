export default function AuthCard({children}){
    
    return(
    <div className="
        bg-white
        rounded-[10px]
        px-6
        pt-9
        pb-5
        w-[360px]
        flex
        flex-col
        items-center
        min-h-[450px]"
    >
        <div>
            <img 
            src="https://i.postimg.cc/4yDV3nny/logo-Mascote1.png"
            alt="Logo"
            className="w-12 "
            />
        </div>

        <div className="font-bold">
            DARUTASK
        </div>

        <div className="text-gray-400">
            Organize suas tarefas de forma simples
        </div>
        {children}
        <div className="flex justify-between items-center text-xs text-[#8B9BB5] mt-1 gap-3">
            <span className="flex items-center gap-2">
                <i className="fas fa-shield-alt"></i>
                    Acesso Seguro
            </span>

            <span className="flex items-center gap-2">
                <i className="fas fa-globe"></i>
                    Português (BR)
                </span>
            </div>
    </div>
    )
}