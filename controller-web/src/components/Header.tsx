import logo from "../Assets/Images/icons/GreaseTraiceIcon.png"

export default function Header(){
    return(
        <header className="bg-[var(--color-bg-gray)]">
            <div className="flex flex-row items-center">
                <img src={logo} alt=""  className=" h-[70px] "/>
                <p className="text-xl-bold">Grease Trace</p>
            </div>
        </header>
    );
}