interface formProps{
    label:string;
    type:string;
    name:string;
    id:string;
    className?:string;
}

export default function Form(props:formProps){
    return(
       <div className={`flex flex-col pb-7 ${props.className ||""} `}>
            <label>{props.label}</label>
            <input type={props.type} name={props.name} id={props.id} className="bg-[var(--color-bg-gray)] py-3 px-3"/>
        </div>
    );
}