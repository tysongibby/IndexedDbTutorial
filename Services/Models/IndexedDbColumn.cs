using Microsoft.JSInterop;

namespace IndexedDbTutorial.Services.Models
{
    public class IndexedDbColumn
    {
        public string Name { get; set; } 
        public bool Unique { get; set; }
        public bool Index { get; set; }

        [JSInvokable]
        public object GetColumnJS()
        {
            object obj = new { Name, Unique, Index };
            return obj;
        }
    }
}
