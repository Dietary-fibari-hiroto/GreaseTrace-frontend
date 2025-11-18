using Microsoft.MixedReality.WebRTC;
using System;
using Windows.Graphics.DirectX;
using System.Threading.Tasks;
using Windows.Graphics.Capture;
using Windows.Graphics.DirectX.Direct3D11;

namespace audience_software
{

    /*
     *画面キャプチャ周りお
     */
    public partial class Audience
    {
        private Direct3D11CaptureFramePool _framePool;
        private GraphicsCaptureSession _session;
        private IDirect3DDevice _d3dDevice;

        private ExternalVideoTrackSource _externalVideoSource;
        private LocalVideoTrack _localVideoTrack;

        private async Task StartCaptureAsync()
        {
            var picker = new GraphicsCapturePicker();//キャプチャ対象を選ぶためのUI用Pickerを作ってる(テスト用あとで自動でデスクトップ全体をキャプチャする設定にする)
            var item = await picker.PickSingleItemAsync();//Pickerで選ばれた対象を取得
            if (item == null) return;

            // d3dDeviceの初期化は環境依存
            var size = item.Size;

            //選んだキャプチャ対象のサイズを取得
            _framePool = Direct3D11CaptureFramePool.Create(
                _d3dDevice,
                DirectXPixelFormat.B8G8R8A8UIntNormalized,
                2,
                size
            );

            //キャプチャされた映像フレームを一時的にためておくバッファ作成
            _framePool.FrameArrived += FramePool_FrameArrived;
            _session = _framePool.CreateCaptureSession(item);
            _session.StartCapture();

            //WebRTC 用の映像トラックの元をつくる
            _externalVideoSource = ExternalVideoTrackSource.CreateFromI420ACallback((in FrameRequest request) =>
            {
                //今回はpush型なので未使用。何で作ったんってはなしやけど
            });

            //_externalVideoSourceから映像を取得
            var init = new LocalVideoTrackInitConfig { trackName = "screen" };
            _localVideoTrack = LocalVideoTrack.CreateFromSource(_externalVideoSource, init);

            //送受信の窓口作成
            var transceiver = _peer.AddTransceiver(MediaKind.Video);

            //窓口にLocalVideoTrackを割り当てる
            transceiver.LocalVideoTrack = _localVideoTrack;
        }


        private void FramePool_FrameArrived(Direct3D11CaptureFramePool sender, object args)
        {
            using var frame = sender.TryGetNextFrame();
            if (frame == null) return;

            // TODO: D3D テクスチャ -> I420 変換を実装して
            //       ExternalVideoTrackSource の API でフレームを push する
        }


    }

}
