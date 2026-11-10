import searchIcon from "./../../assets/search.png";
import exitIcon from "./../../assets/exit.png";

export default function Header() {
  return (
    <div className="flex h-[52px] items-center justify-between border-b border-[#e4e8ef] bg-white px-[0.5%]">

      {/* Logo */}
      <div className="flex w-[20%] items-center justify-center">
        <span className="flex items-center">
          <img
            src="https://i.postimg.cc/4yDV3nny/logo-Mascote1.png"
            alt="Logo"
            className="h-[45px] w-[45px] rounded-lg object-contain"
          />
        </span>

        <span className="text-[15px] font-bold tracking-[1px] text-[#1a202c]">
          DARUTASK
        </span>
      </div>

      {/* Pesquisa */}
      <div className="flex h-[91%] w-[30%] items-center justify-between rounded-md border border-[#e4e8ef] bg-[#f1f3f7] p-[1%]">

        <img
          src={searchIcon}
          alt="Buscar"
          className="h-5 w-5"
        />

        <input
          type="text"
          placeholder="Buscar projetos..."
          className="my-[4%] ml-2 w-[96%] bg-transparent outline-none placeholder:text-[#9aa5b8]"
        />
      </div>

      {/* Ações à direita */}
      <div className="flex w-[10%] items-center gap-3">

        <button
          id="btnSairProjetos"
          title="Sair"
          className="border-0 bg-transparent"
        >
          <img
            src={exitIcon}
            alt="Sair"
            className="h-5 w-5"
          />
        </button>

      </div>
    </div>
  );
}
