using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace audience_software
{
    // MainWindow.StrokeHandling.cs
    using System.Diagnostics;

    public partial class Audience
    {
        private void HandleStrokeMessage(string json)
        {
            Debug.WriteLine("Stroke message: " + json);
            // TODO: Overlay 描画など
        }
    }


}
