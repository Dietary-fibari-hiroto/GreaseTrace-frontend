using Microsoft.MixedReality.WebRTC;
using Microsoft.UI;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

/*
 * WebRTCまわりだお
 */

/**
 * -----俺の学習ノート-----
 * SDP=SessionDescriptionProtcolの略で"通信の説明書"
 *  この端末がどういう映像・音声・通信方式を使えるのか、どこに送ったらいのか
 *  など通信の設定の一覧を文字列で表したもの
 */
namespace audience_software
{
    public class StrokeData
    {
        public float X1 { get; set; }
        public float Y1 { get; set; }
        public float X2 { get; set; }
        public float Y2 { get; set; }
    }

    public partial class Audience 
    {
        private PeerConnection _peer;
        private DataChannel _dataChannel;
        //コネクション用url
        private string connectionUrls = "stun:stun.l.google.com:19302";

        //RTCの初期化関数。これを呼べば接続できるようにしたい
        private async Task InitPeerConnectionAsync()
        {
            _peer = new PeerConnection();

            var config = new PeerConnectionConfiguration
            {
                IceServers = new List<IceServer>
            {
                new IceServer { Urls = { connectionUrls } }
            }
            };

            //InitializeAsync呼び出して～
            await _peer.InitializeAsync(config);

            //説明書を接続相手に送る
            _peer.LocalSdpReadytoSend += (SdpMessage message) =>
            {
                var obj = new { type = message.Type.ToString().ToLower(), sdp = message.Content };
                _ = SendSignalingMessageAsync(JsonSerializer.Serialize(obj));
            };

            //ICEcandidateを送るハンドラ
            /*
             * ICEcandidateっていうのは
             * 「相手と通信するために使えるネットワーク経路の候補」
             * らしい
             */
            _peer.IceCandidateReadytoSend += (IceCandidate candidate) =>
            {
                var obj = new
                {
                    candidate = candidate.Content,
                    sdpMid = candidate.SdpMid,
                    sdpMlineIndex = candidate.SdpMlineIndex
                };
                _ = SendSignalingMessageAsync(JsonSerializer.Serialize(obj));
            };

            //DataChannelを作る
            //文字列メッセージを送受信するためらしい
            _dataChannel = await _peer.AddDataChannelAsync("stroke", ordered: true, reliable: true);
            _dataChannel.MessageReceived += (byte[] data) =>
            {
                var msg = System.Text.Encoding.UTF8.GetString(data);
                HandleStrokeMessage(msg);
            };

            //相手とWebRTC接続が確立したときに発火するイベント
            _peer.Connected += () =>
            {
                Debug.WriteLine("PeerConnection connected.");
            };
        }

        //接続相手から呼ばれる関数。相手のSDP読むみたいなイメージだと思う
        public async Task OnSignalingMessageReceivedAsync(string json)
        {
            //受取ったJSON解析するぶぶんだ
            using var doc = JsonDocument.Parse(json);
            var root = doc.RootElement;

            //SDPメッセージを受信したときの処理(こっちのSDP送った後にOfferかAnswerを返信されたときこの関数に入るのかな)
            if (root.TryGetProperty("type", out var typeEl) && root.TryGetProperty("sdp", out var sdpEl))
            {
                string typeStr = typeEl.GetString();
                string sdp = sdpEl.GetString();

                var msg = new SdpMessage
                {
                    Type = typeStr == "offer" ? SdpMessageType.Offer : SdpMessageType.Answer,
                    Content = sdp
                };

                await _peer.SetRemoteDescriptionAsync(msg);
                return;
            }

            //IceCandidateを受信したときはこっちに入る
            /**
             * 通信経路の候補を全部WebRTCに渡して接続を確立させる
             */
            if (root.TryGetProperty("candidate", out var candEl))
            {
                var candidate = new IceCandidate
                {
                    Content = candEl.GetString(),
                    SdpMid = root.GetProperty("sdpMid").GetString(),
                    SdpMlineIndex = root.GetProperty("sdpMlineIndex").GetInt32()
                };

                //経路を確定させて、せつぞおく
                _peer.AddIceCandidate(candidate);
            }
        }

        private async Task SendSignalingMessageAsync(string message)
        {
            Debug.WriteLine("SendSignalingMessage: " + message);
            //TODO:peer.jskana?で送信する実装
        }

    }
}