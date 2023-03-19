using IndexedDbTutorial.Services.Models;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Threading.Tasks;

namespace IndexedDbTutorial.Services
{
    // requires IndexedDb.js
    public class IndexedDbApi : JSModuleBase
    {
        //[Inject]
        //private IJSRuntime JsRuntime { get; set; }
        public IndexedDbApi(IJSRuntime js) : base(js, "/js/IndexedDb.js")
        {
        }

        // Get operations
        /// <summary>
        /// Creates IndexedDb database (do not add "Database" to the end of the name of the database to be created).
        /// </summary>
        /// <param name="name"></param>
        /// <param name="column"></param>
        /// <returns>Returns true is successfull and false if not successful.</returns>
        /// <exception cref="DirectoryNotFoundException"></exception>
        public async ValueTask createDb(string name, IndexedDbColumn column)
        {
            try
            {
                string jsColumn = JsonConvert.SerializeObject(column);
                await InvokeVoidAsync("createDb");
                
            }
            catch (Exception e)
            {
                throw new DirectoryNotFoundException(e.Message, e);
            }
        }

        public async ValueTask<bool> ExecuteTutorial()
        {
            try
            {
                return await InvokeAsync<bool>("executeTutorial");
            }
            catch (Exception e)
            {
                throw new DirectoryNotFoundException(e.Message, e);
            }

        }

        // Records
        

    }
}
