using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using System;
using System.Threading.Tasks;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace audience_software.src.Pages
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class AudienceConnectionPage : Page
    {
        //上体管理のためのENUM
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
        private Window newWindow = new Audience();
        public AudienceConnectionPage()
        {
            InitializeComponent();
        }

        private void ReturnPage(object sender, Microsoft.UI.Xaml.Input.TappedRoutedEventArgs e)
        {
            var frame = (App.Current as App)?._mainWindow?.NavFrame;
            if (frame != null && frame.CanGoBack)
            {
                frame.GoBack();
            }


        }
        //ページ描画時の処理
        private async void Page_Loaded(object sender,RoutedEventArgs e)
        {
            await UpdateView();
            //以下に接続処理記述(Delayはハリボテ)
        }
        private async Task UpdateView()
        {
            MainContent.Visibility = Visibility.Collapsed;
            LoadingContent.Visibility = Visibility.Collapsed;
            ExceptionText.Visibility = Visibility.Collapsed;
            CompletedContent.Visibility = Visibility.Collapsed;
            RunningContent.Visibility = Visibility.Collapsed;
            EndContent.Visibility = Visibility.Collapsed;

            switch (_state) {
                case ViewState.Setting:
                    MainContent.Visibility = Visibility.Visible;
                    break;
                case ViewState.Loading:
                    LoadingContent.Visibility = Visibility.Visible;
                    await Task.Delay(2000);//ハリボテ
                    /*
                     * ここに接続処理を書く。
                     */
                    _state = ViewState.Completed;
                    await UpdateView();
                    break;
                case ViewState.Failed:
                    MainContent.Visibility = Visibility.Visible;
                    ExceptionText.Visibility = Visibility.Visible;
                    break;
                case ViewState.Completed:
                    
                    CompletedContent.Visibility = Visibility.Visible;
                    await Task.Delay(2000);
                    //新しいウィンドウをひらきつつ？？？
                    
                    newWindow.Activate();
                    
                    _state = ViewState.Running;
                    await UpdateView();
                    break;
                case ViewState.Running:
                    RunningContent.Visibility = Visibility.Visible;
                    break;
                case ViewState.End:
                    EndContent.Visibility = Visibility.Visible;
                    break;

            }

            newWindow.Closed += (s, args) =>
            {
                _state = ViewState.End;
                UpdateView();
            };

        }
        private async void ConnectionSubmit(object sender, RoutedEventArgs e)
        {
            _state = ViewState.Loading;
            await UpdateView();

            //以下に接続時の処理

        }

    }
}
