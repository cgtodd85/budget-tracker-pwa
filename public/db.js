let db;

const request = window.indexedDB.open("BudgetDB", 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;
  const BudgetStore = db.createObjectStore("BudgetDB", {
    autoIncrement: true,
  });
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.log(event.target.errorCode);
};

function saveRecord(record) {
  const transaction = db.transaction(["BudgetDB"], "readwrite");
  const BudgetStore = transaction.objectStore("BudgetDB");
  BudgetStore.add(record);
}

function checkDatabase() {
  let transaction = db.transaction(["BudgetDB"], "readwrite");
  const BudgetStore = transaction.objectStore("BudgetDB");
  var getAll = BudgetStore.getAll();

  getAll.onsuccess = function () {
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
        .then((data) => {
          if (data.length > 0) {
            transaction = db.transaction(["BudgetDB"], "readwrite");
            const newStore = transaction.objectStore("BudgetDB");
            newStore.clear();
          }
        });
    }
  };
}

window.addEventListener("online", checkDatabase);
