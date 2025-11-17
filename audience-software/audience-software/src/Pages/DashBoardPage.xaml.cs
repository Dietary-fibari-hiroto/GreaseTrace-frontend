using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Controls.Primitives;
using Microsoft.UI.Xaml.Data;
using Microsoft.UI.Xaml.Input;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace audience_software.src.Pages
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class DashBoardPage : Page
    {
        public DashBoardPage()
        {
            InitializeComponent();
        }

        //コネクトを開始するボタンの処理だぜ
        private void NavigateToController(object sender, TappedRoutedEventArgs e)
        {
            Frame?.Navigate(typeof(ControllerConnectingPage));
        }
        //画面を共有するボタンの処理だぜ
        private void NavigateToAudience(object sender, TappedRoutedEventArgs e)
        {
            Frame?.Navigate(typeof(AudienceConnectionPage));
        }
    }



       
}
