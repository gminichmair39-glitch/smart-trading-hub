const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  db: {
    query: (query, params) => ipcRenderer.invoke('db:query', query, params),
    run: (query, params) => ipcRenderer.invoke('db:run', query, params),
    exec: (query) => ipcRenderer.invoke('db:exec', query),
  },
});
