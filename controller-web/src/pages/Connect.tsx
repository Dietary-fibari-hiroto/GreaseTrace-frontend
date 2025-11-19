import Header from "../components/Header";
import { chevron_left,share } from "../Assets/Images/ImagesRoute";

export default function Connect(){
    return(
        <div className="h-screen flex flex-col">
            <Header/>
            <div className="flex-grow flex flex-col h-screen justify-between">
                <img src={chevron_left} alt="" className="pt-6 w-[64px] " />
                <div className="flex-1 flex flex-col justify-center items-center">
                    <p className="text-xl font-bold pb-11 text-center">以下URLをオーディエンスに共有してください。</p>
                    <div className="w-[500px] flex justify-between px-[11px] py-[18px] bg-black border border-[var(--color-deepgray)] rounded-[10px]">
                        <p className="text-xs text-white">dawn-waiting.com/greasetraice/session/...</p>
                        <img src={share} alt="" />
                    </div>
                </div>
                <p className="text-xs text-[var(--color-deep-gray)] text-center pb-[25px]">オーディエンスの接続および認証が完了すると画面が切り替わります。</p>
            </div>
        </div>
    );
}