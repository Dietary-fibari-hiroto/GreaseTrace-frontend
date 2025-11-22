import Header from "../components/Header";
import FunctionCard from "../components/FunctionCard"
import { cable,fullScreen,monitor_down } from "../Assets/Images/ImagesRoute";

const icons ={
    fullScreen,
    cable,
    monitor_down
}

export default function Dashboard(){
    return(
        <div>
            <Header/>
            <div className="flex-grow flex justify-around items-center">
                <div className="pt-[52px]">
                    <div className="text-center pb-9 relative">
                        <p className="text-md absolute top-[-10px] left-1/2 -translate-x-1/2">ダッシュボード</p>
                        <p className="text-section-label">Dashboard</p>
                    </div>
                    
                    <p className="text-3xl pl-[7px] pb-[15px]">ファンクション</p>
                    <div className="flex justify-center pb-[29px]"> 
                        <FunctionCard 
                            link={`/connect`}
                            img={icons.cable} 
                            text="コネクトを開始する" 
                            description={`コネクトは、相手の画面をリアルタイムで確認しながら、ブラウザ上で線やマーカーを描くことができる機能です。\n離れた場所にいても、画面上で視覚的に操作説明や指示を行うことができます。`} />
                        <FunctionCard 
                            link={`/home`}
                            img={icons.fullScreen} 
                            style="ml-[25px]"
                            color="bg-[var(--color-secondary)]" 
                            text="画面を共有する" 
                            subText="GreaseTrace Desktopへ"
                            description={`コントローラー（描画者）がWeb上で描いた線や図形をリアルタイムで受信し、Windowsデスクトップ上に直接重ねて表示する機能です。\n ユーザーの操作を妨げることなく、画面上に半透明のオーバーレイを表示し、描画内容を即座に反映します。\n※この機能を使用するには専用ソフトのインストールが必要です。`}
                               
                        />
                    </div>
                    <p className="text-3xl pl-[7px] pb-[15px]">ダウンロード</p>
                    <FunctionCard 
                        link={`/home`}
                        img={icons.monitor_down} 
                        text="デスクトップ版ダウンロードページ" 
                        description="GreaseTraceのデスクトップ版ダウンロードページへ移動します。"
                    />
                    
                </div>
            </div>
        </div>
    );
}