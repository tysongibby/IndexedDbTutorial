using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
//using static IndexedDbTutorial.IndexedDb;

namespace IndexedDbTutorial
{
    // requires IndexedDb.js
    public class IndexedDb : JSModuleBase
    {
        public IndexedDb(IJSRuntime js) : base(js, "/js/IndexedDb.js")
        {
        }

        // Get operations
        public async ValueTask<JSDirectory> ShowDirectoryPickerAsync()
        {
            try
            {
                return await InvokeAsync<JSDirectory>("showDirectoryPicker");
            }
            catch (Exception e)
            {
                throw new DirectoryNotFoundException(e.Message, e);
            }
        }

        public async ValueTask<JSDirectory> ReopenLastDirectoryAsync()
        {
            try
            {
                return await InvokeAsync<JSDirectory>("reopenLastDirectory");
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
        public record JSDirectory(string Name, IJSObjectReference Instance) : IAsyncDisposable
        {
            // When .NET is done with this JSDirectory, also release the underlying JS object            
            public ValueTask DisposeAsync()
            {
                return Instance.DisposeAsync();
            }
        }
        public record ClientFile(string Name, long Size, string RelativePath);
    }
}
