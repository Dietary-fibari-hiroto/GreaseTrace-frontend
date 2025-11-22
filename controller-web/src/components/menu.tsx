import { Link } from "react-router-dom";
import { use, useState } from "react";
import logo from "../Assets/Images/icons/logo2.svg"
import { hand,pen,rotateCcw,eraser,whitepen,redpen,yellowpen,greenpen,bluepen } from "../Assets/Images/ImagesRoute"

//props型定義
type MenuProps ={
    onPenColorSelect?:(color:string) => void;
    onUndo?: () => void;
    onEraserSelect?: () => void;
    onPenSelect?: () => void;
};

//ペンのデータ
const penData = [
    {icon:whitepen,color:"#FFFFFF"},
    {icon:redpen,color:"#FF0000"},
    {icon:yellowpen,color:"#FFFF00"},
    {icon:greenpen,color:"#1EFF00"},
    {icon:bluepen,color:"#00D9FF"},
]

export default function Menu({onPenColorSelect,onUndo,onEraserSelect,onPenSelect}:MenuProps) {
    const [isClickMenu,setIsClickMenu] = useState(false);
    const [isClickPenMenu,setIsClickPenMenu] = useState(false);

    //ロゴを押すと表示,非表示切り替え
    const handleMenuClick = () => {
        setIsClickMenu((prev) =>{
            const next = !prev;
            if(!next){
                setIsClickPenMenu(false);
            }
            return next;
        })
    }

    //ペンメニュー表示
    const handleClickPenMenu = () =>{
        setIsClickPenMenu(!isClickPenMenu);
    }

    return(
        <div className="absolute inline-flex z-20 items-center px-[15px] py-3 bg-slate-400 rounded-[10px]">
            <img src={logo} alt="" className="h-[49px]" onClick={handleMenuClick}/>
            {isClickMenu && (
                <div className="flex">
                    <img src={pen} className="pl-[34px]" onClick={handleClickPenMenu} />
                    <img src={eraser} className="pl-[34px]" onClick={() => {onEraserSelect?.();}}/>
                    <img src={rotateCcw} className="pl-[34px]" onClick={() => onUndo?.()}/>
                    <img src={hand} className="pl-[34px]" onClick={() => {}}/>
                </div>
            )}
            <Link to={'/endview'} className="bg-[var(--color-deep-gray)] text-white text-md-bold px-11 py-[13px] ml-[34px]">切断</Link>     
            {isClickPenMenu &&(
                <div className="absolute top-full left-0 translate-x-[80px]">
                    {penData.map((color,i) =>(
                        <img key={i} src={color.icon} onClick={() => onPenColorSelect?.(color.color)} />
                    ))}
                </div>
            )}       
        </div>
        
    );
}



