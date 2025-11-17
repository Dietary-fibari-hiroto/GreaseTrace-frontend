interface functionCardProps{
    link:string;
    style?:string;
    color?:string;
    img:string;
    text:string;
    subText?:string;
    description:string;
}

export default function FunctionCard(props:functionCardProps){
    return(
        <a href={props.link}>
            <div className={`w-[500px] ${props.style || ""}`} >
                <div className={`flex items-center px-[9px] py-[7px]  ${props.color || "bg-[var(--color-quatemary)]"}`}>
                    <img src={props.img} alt=""  className="w-9 h-9"/>
                    <div className="flex justify-between items-center px-[25px] w-full">
                        <p className=" text-xl text-white">{props.text}</p>
                        <p className=" text-sm text-white">{props.subText}</p>
                    </div> 
                </div>
                <p className="h-[200px] pl-[13px] pr-[13px] pt-[13px] pb-[31px] border-black border-l border-r border-b whitespace-pre-wrap text-[15px]">{props.description}</p>
            </div>
        </a>
    );
}