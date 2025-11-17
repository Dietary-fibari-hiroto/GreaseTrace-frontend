import Header from "../components/Header";
export default function Connect(){
    return(
        <div className="h-screen flex flex-col">
            <Header/>
            <div className="flex-grow flex flex-col h-screen justify-between">
                <div className="flex-1 flex flex-col justify-center items-center">
                    <p className="text-xl font-bold pb-11 text-center">以下URLをオーディエンスに共有してください。</p>
                    <div className="w-[500px] flex justify-between px-[11px] py-[18px] bg-black">
                        <p className="text-xs text-white">dawn-waiting.com/greasetraice/session/...</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1.33325V9.99992" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10.6668 3.99992L8.00016 1.33325L5.3335 3.99992" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.6665 8V13.3333C2.6665 13.687 2.80698 14.0261 3.05703 14.2761C3.30708 14.5262 3.64622 14.6667 3.99984 14.6667H11.9998C12.3535 14.6667 12.6926 14.5262 12.9426 14.2761C13.1927 14.0261 13.3332 13.687 13.3332 13.3333V8" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <p className="text-xs text-[var(--color-deep-gray)] text-center pb-[25px]">オーディエンスの接続および認証が完了すると画面が切り替わります。</p>
            </div>
        </div>
    );
}