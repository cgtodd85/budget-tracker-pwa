let db;

const request = window.indexedDB.open("BudgetDB", 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;
  const BudgetStore = db.createObjectStore("BudgetDB", {
    autoIncrement: true,
  });
};

request.onerror = function (event) {
  console.log(`Woopsie Doopsy! ${e.target.errorCode}`);
};

function checkDatabase() {
  console.log("check db invoked");

  // Open a transaction on your BudgetStore db
  let transaction = db.transaction(["BudgetStore"], "readwrite");

  // access your BudgetStore object
  const store = transaction.objectStore("BudgetStore");

  // Get all records from store and set to a variable
  const getAll = store.getAll();

  // If the request was successful
  getAll.onsuccess = function () {
    // If there are items in the store, we need to bulk add them when we are back online
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          // If our returned response is not empty
          if (res.length !== 0) {
            // Open another transaction to BudgetStore with the ability to read and write
            transaction = db.transaction(["BudgetStore"], "readwrite");

            // Assign the current store to a variable
            const currentStore = transaction.objectStore("BudgetStore");

            // Clear existing entries because our bulk add was successful
            currentStore.clear();
            console.log("Clearing store 🧹");
          }
        });
    }
  };
}

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

function saveRecord(record) {
  const transaction = db.transaction(["BudgetDB"], "readwrite");
  const BudgetStore = transaction.objectStore("BudgetDB");
  BudgetStore.add(record);
}

window.addEventListener("online", checkDatabase);
