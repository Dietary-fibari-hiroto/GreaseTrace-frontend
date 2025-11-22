import { useState, useEffect, useRef } from "react";
import Peer from "peerjs";
import Header from "../components/Header";
import { chevron_left, share } from "../Assets/Images/ImagesRoute";
import { Link,useNavigate } from "react-router-dom";

const GO_API_BASE = "http://localhost:8800/api/session";
const PEERJS_CONFIG = { host: "localhost", port: 9000, path: "/" };

export default function Connect() {
  const [sessionId, setSessionId] = useState<string>("");
  const [status, setStatus] = useState("待機中...");
  const [peerId, setPeerId] = useState("");
  const peerRef = useRef<Peer | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();  


  const handleCreateSession = async () => {
    setStatus("PeerJSに接続中...");

    const peer = new Peer(PEERJS_CONFIG);
    peerRef.current = peer;

    peer.on("open", async (id) => {
      setPeerId(id);
      setStatus("Go APIに登録中...");

      try {
        // Go APIにセッション作成リクエスト
        const res = await fetch(`${GO_API_BASE}/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ peerId: id }),
        });

        const data = await res.json();
        if (!data.sessionId) {
          throw new Error("sessionIdが取得できませんでした");
        }

        const newSessionId = data.sessionId;
        setSessionId(newSessionId);

        // // 画面キャプチャを開始
        // const stream = await navigator.mediaDevices.getDisplayMedia({
        //   video: true,
        //   audio: true,
        // });
        // streamRef.current = stream;

        setStatus(`セッション ${newSessionId.substring(0, 8)}... を作成しました`);
      } catch (err: any) {
        setStatus(`エラー: ${err.message}`);
      }
    });

    peer.on("connection", (conn) => {
      setStatus("接続試行中...ストリーム送信中...");
      if (streamRef.current) {
        // 接続してきたピアに対してストリームをコール
        const call =  peer.call(conn.peer, streamRef.current);
       ;
        call.on("stream",(remoteStream) => {})
        setStatus("画面共有とP2P接続を確立しました");
        navigate(`/view?session=${sessionId}`);
      }
    });

    peer.on("error", (err) => {
      setStatus(`PeerJSエラー: ${err.message}`);
    });
  };

  useEffect(() => {
    handleCreateSession();
    return () => {
      peerRef.current?.destroy();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleCopy = async () =>{
      await navigator.clipboard.writeText(sessionId); 
      alert("セッションIDをコピーしました")
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col h-screen justify-between">
       <Link to="/dashboard" > <img src={chevron_left} alt="" className="pt-6 w-[64px]" /> </Link>
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="text-xl font-bold pb-11 text-center">
            以下URLをオーディエンスに共有してください。
          </p>
          <div className="w-[500px] flex justify-between px-[11px] py-[18px] bg-black border border-[var(--color-deepgray)] rounded-[10px]">
            <p className="text-xs text-white">
              {sessionId || "セッションID生成中..."}
            </p>
            <img src={share} alt="" onClick={handleCopy}/>
            
          </div>
        </div>
        <p className="text-xs text-[var(--color-deep-gray)] text-center pb-[25px]">
          オーディエンスの接続および認証が完了すると画面が切り替わります。
        </p>
      </div>
    </div>
  );
}