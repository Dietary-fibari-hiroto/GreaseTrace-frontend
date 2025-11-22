import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Endview(){
    return(
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-grow flex flex-col justify-between">
                <div className="flex-1 flex flex-col justify-center items-center">
                    <p className="text-xl font-bold pb-11 text-center">画面共有を終了しました。</p>
                    <p className="bg-[var(--color-secondary)] px-[90px] py-2 text-white"><Link to="/dashboard">ホームへ戻る</Link></p>
                </div>
                <p className="text-xs text-[var(--color-deep-gray)] text-center pb-[25px]">オーディエンスの接続および認証が完了すると画面が切り替わります。</p>
            </div>
        </div>
    );
}