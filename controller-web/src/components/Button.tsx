interface buttonProps{
    value:string;
}

export default function Button(props:buttonProps){
    return(
        <div className="pb-8">
            <input type="submit" value={props.value} className="text-md text-white bg-[var(--color-primary)] w-full py-2"/>
        </div>
    );
}