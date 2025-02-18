// If internet is OFF, progress is saved locally and syncs later when online.
export const saveScoreOffline = (name, score) => {
    const request = indexedDB.open("EduSpinDB", 1);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore("scores", { keyPath: "id", autoIncrement: true });
    };
  
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("scores", "readwrite");
      const store = transaction.objectStore("scores");
      store.add({ name, score });
    };
  };
  