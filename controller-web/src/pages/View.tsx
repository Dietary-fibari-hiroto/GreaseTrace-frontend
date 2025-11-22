import React, { useState, useRef,useEffect } from 'react';
import Peer from 'peerjs';
import { Stage, Layer, Line } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import Menu from '../components/menu';
import { useSearchParams } from 'react-router-dom';

//線データ変更
type LineData ={
    color:string;
    points:number[];
};


const GO_API_BASE = "http://localhost:8800/api/session";
const PEERJS_CONFIG = { host: "localhost", port: 9000, path: "/" };

export default function View(){
    //状態定義
    const [penColor, setPenColor] = useState("#FFFFFF");
    const [lines, setLines] = useState<LineData[]>([]); // 描画された全ての線（線は点の配列）
    const [isEraserMode, setIsEraserMode] = useState(false); //消しゴムモードの状態
    const [stageSize, setStageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    // useRef を使用して、再レンダリングなしで状態を追跡
    const isDrawing = useRef(false);
    
    //描画ロジック
    /**
     * 1. マウスダウン: 新しい線の描画を開始
     */
    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        const point = stage?.getPointerPosition();
        if(!point) return; 
        
        // 描画開始フラグをON
        isDrawing.current = true;
        
        // linesに新しい線の配列（始点のみ含む）を追加
        // この新しい配列に、MouseMoveで点が追加されていく
        setLines((prev) => [
            ...prev,
            { color: penColor, points: [point.x, point.y] },
          ]);
    };

    /**
     * 2. マウス移動: 現在の線に点を追加
     */
    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
        // マウスが押されていなければ処理を終了 (修正1: isDrawing.currentがtrueのときのみ実行)
        if (!isDrawing.current) return;

        const stage = e.target.getStage();
        const point = stage?.getPointerPosition();
        if(!point) return; 

        isDrawing.current = true;
        /**
         * 消しゴムモード
         * 近くの線を削除
         * ERASER_RADIUS削除する範囲(px)で指定
         */
        if(isEraserMode) {
            const ERASER_RADIUS = 20;
            setLines((prev) =>{
                return prev.filter((line) =>{
                    // 線の各点が消しゴムの範囲内かチェック
                    for(let i = 0;i < line.points.length; i += 2){
                        const x = line.points[i];
                        const y = line.points[i + 1];
                        const distance = Math.sqrt(
                            Math.pow(x - point.x,2) + Math.pow(y - point.y,2)
                        );
                         // 範囲内の点があれば、その線全体を削除
                        if(distance < ERASER_RADIUS){
                            return false; //この線を削除
                        }
                    }
                    return true;
                });
            });
        }else{
            setLines((prev) => {
                if (!prev.length) return prev;
                const lastIndex = prev.length - 1;
                const lastLine = prev[lastIndex];
                const updated = {
                    ...lastLine,
                    points: [...lastLine.points, point.x, point.y],
                };
                return [...prev.slice(0, lastIndex), updated];
            });
        }
    };
    
    /**
     * 3. マウスアップ: 描画終了
     */
    const handleMouseUp = () => {
        // 描画開始フラグをOFF
        isDrawing.current = false;
    }

    //最後に書いたものを削除
    const handleUndo = () =>{
        setLines((prev) =>{
            if(prev.length === 0) return prev;
            return prev.slice(0,-1);    //最後の線を削除
        })
    }

    //消しゴムモード
    const handleEraserSelect = () => {
        setIsEraserMode(true);
        setPenColor("transparent");
    };

    const handlePenColorSelect = (color: string) => {
        setIsEraserMode(false); // 消しゴムモード解除
        setPenColor(color);
    };


    //ペンモード選択時に消しゴムモード解除
    const handlePenSelect = () =>{
        setIsEraserMode(false);
        setPenColor("#FFFFFF");
    }

    // リサイズハンドラー
    useEffect(() => {
        const handleResize = () =>{
            setStageSize({
                width: window.innerWidth, 
                height: window.innerHeight 
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    //画面状態管理
    const [params] = useSearchParams();
    const sessionIdParam = params.get("session");
    const [sessionId,setSessionId] = useState<string>(sessionIdParam || "");
    //画面取得ロジック
    const getView = async () =>{
        const [status,setStatus] = useState("");
        const [target,setTarget] = useState("");

        setTarget("Go APIにセッション検証をリクエスト中...");
        try{
            const res = await fetch(`${GO_API_BASE}/validate/${sessionId}`);
            const data = res.json();
            if(!sessionId) throw new Error("無効なセッションです");
            
            

        }catch(err:any){
            setStatus(`エラー: ${err.message}`)
        }

    }
    
    return(
      <div className="relative bg-black">
        <Menu 
            onPenColorSelect={handlePenColorSelect} 
            onUndo={handleUndo} 
            onEraserSelect={handleEraserSelect}
            onPenSelect={handlePenSelect}
        />
        <Stage 
            width={stageSize.width} 
            height={stageSize.height} 
            onMouseDown={handleMouseDown} 
            onMouseMove={handleMouseMove} 
            onMouseUp={handleMouseUp}
        >
          
            <Layer>
                {/* lines の各配列が1つの線を描画 */}
                {lines.map((line,i) =>(
                    // line は [x1, y1, x2, y2, x3, y3, ...] の形式
                    <Line key={i} points={line.points} stroke={line.color} strokeWidth={5} lineCap="round" lineJoin="round" />
                ))}
            </Layer>
            
        </Stage>
        <video autoPlay />
      </div>
    );
}