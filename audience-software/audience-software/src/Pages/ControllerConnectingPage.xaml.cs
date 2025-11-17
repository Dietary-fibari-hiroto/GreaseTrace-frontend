
using Microsoft.UI.Xaml.Controls;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace audience_software.src.Pages
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class ControllerConnectingPage : Page
    {
        public ControllerConnectingPage()
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


    }
}
