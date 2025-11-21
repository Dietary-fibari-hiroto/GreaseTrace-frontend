using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using System;
using System.Threading.Tasks;

namespace audience_software.src.Pages
{
    public sealed partial class AudienceConnectionPage : Page
    {
        private Audience? _audienceWindow;

        public enum ViewState
        {
            Setting,
            Loading,
            Completed,
            Failed,
            Running,
            End
        }

        private ViewState _state = ViewState.Setting;

        public AudienceConnectionPage()
        {
            InitializeComponent();
            Loaded += Page_Loaded;
        }

        private async void Page_Loaded(object sender, RoutedEventArgs e)
        {
            await RenderState();
        }

        private async Task SetState(ViewState newState)
        {
            _state = newState;
            await RenderState();
        }

        private async Task RenderState()
        {
            HiddenAllUI();

            switch (_state)
            {
                case ViewState.Setting:
                    MainContent.Visibility = Visibility.Visible;
                    break;

                case ViewState.Loading:
                    LoadingContent.Visibility = Visibility.Visible;
                    await Task.Delay(2000);
                    //以下に接続処理を書き、接続できたらconnectSuccessをtrueにして次へ進む
                    bool connectSuccess = false;
                    connectSuccess = true;

                    await SetState(connectSuccess ? ViewState.Completed : ViewState.Failed);
                    break;

                    //接続が失敗したら戻る
                case ViewState.Failed:
                    MainContent.Visibility = Visibility.Visible;
                    ExceptionText.Visibility = Visibility.Visible;
                    break;

                    //接続が確立したときの処理
                case ViewState.Completed:
                    CompletedContent.Visibility = Visibility.Visible;
                    await Task.Delay(2000);
                    OpenAudienceWindow();
                    await SetState(ViewState.Running);
                    break;

                    //画面共有中の処理
                case ViewState.Running:
                    RunningContent.Visibility = Visibility.Visible;
                    break;

                    //終わったらそれ用のUI表示
                case ViewState.End:
                    EndContent.Visibility = Visibility.Visible;
                    break;
            }
        }

        private void OpenAudienceWindow()
        {
            if (_audienceWindow != null)
                return; //すでに作られてる場合は再生成しない

            _audienceWindow = new Audience();
            _audienceWindow.Closed += (_, _) =>
            {
                _audienceWindow = null;
                _ = SetState(ViewState.End);
            };

            _audienceWindow.Activate();
        }

        //UIのコネクトボタンの処理
        private async void ConnectionSubmit(object sender, RoutedEventArgs e)
        {
            await SetState(ViewState.Loading);
        }

        //UIの戻るボタンの処理
        private void ReturnPage(object sender, Microsoft.UI.Xaml.Input.TappedRoutedEventArgs e)
        {
            var frame = (App.Current as App)?._mainWindow?.NavFrame;
            if (frame != null && frame.CanGoBack)
                frame.GoBack();
        }

        //全UI非表示
        private void HiddenAllUI()
        {
            MainContent.Visibility = Visibility.Collapsed;
            LoadingContent.Visibility = Visibility.Collapsed;
            ExceptionText.Visibility = Visibility.Collapsed;
            CompletedContent.Visibility = Visibility.Collapsed;
            RunningContent.Visibility = Visibility.Collapsed;
            EndContent.Visibility = Visibility.Collapsed;
        }
    }
}
