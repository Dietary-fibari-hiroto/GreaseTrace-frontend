using Microsoft.UI.Windowing;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Controls.Primitives;
using Microsoft.UI.Xaml.Data;
using Microsoft.UI.Xaml.Input;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Xaml.Navigation;
using Microsoft.UI.Xaml.Shapes;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Windows.ApplicationModel;
using Windows.ApplicationModel.Activation;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.Graphics;


// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace audience_software
{
    /// <summary>
    /// Provides application-specific behavior to supplement the default Application class.
    /// </summary>
    public partial class App : Application
    {

        private SplashWindow? _splashWindow;
        public MainWindow? _mainWindow;

        /// <summary>
        /// Initializes the singleton application object.  This is the first line of authored code
        /// executed, and as such is the logical equivalent of main() or WinMain().
        /// </summary>
        public App()
        {

            InitializeComponent();

        }

        /// <summary>
        /// Invoked when the application is launched.
        /// </summary>
        /// <param name="args">Details about the launch request and process.</param>
        protected override async void OnLaunched(Microsoft.UI.Xaml.LaunchActivatedEventArgs args)
        {
            //まずSplashWindow(ローディング画面)をリサイズして表示
            _splashWindow = new SplashWindow();
            var appWindow = _splashWindow.AppWindow;
            appWindow.Resize(new SizeInt32(800, 500));
            _splashWindow.Activate();

            //起動中に初期化したい処理
            await InitializeAppAsync();
            
            
            //メインの画面表示
            _mainWindow= new MainWindow();
            //splah閉じる(なんかwindow一つは表示しとかないと死ぬらしい)
            _splashWindow.Close();
            _mainWindow.Activate();

        }
        

        //ロード中に実行する処理
        private async Task InitializeAppAsync()
        {
            await Task.Delay(3000); //こいつはハリボテ
        }
    }
}
