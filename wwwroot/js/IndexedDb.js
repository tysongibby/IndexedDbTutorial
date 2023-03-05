// index = { name, columnToBeIndex }

// IndexedDB represents the database for this web application.
// Objectstores represent the tables of the database.
// An objectstore transatction must be used for requests made to the objectstore after the database is open.
// To make an objectstore searchable beyond the keypath (primary key), at least one index must be added.
export function createTable(name, columns) {    
    //  go through list of the possible IndexedDB in use by client browser
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    if (!indexedDB) {
        console.log("IndexedDB could not be found in this browser.");
    }

    // open the db - 1 is the version, needs to be incremented if structure is changed
    const request = indexedDB.open(name, 1);

    // listen for and handle error event
    request.onerror = function (event) {
        console.error("An error occurred with IndexedDB");
        console.error(event);
        return false;
    };

    // listen for and handle upgradeneeded eventn - triggered when the database version is incrementing or a new db is being created
    request.onupgradeneeded = function () {
        // result is db object
        const db = request.result;

        // create object store (table or collection) and assign keyPath (table primary key or collectin index key)
        // an object store works similar to a table with columns with the first column being the keyPath
        // with the keypath acting as the primary key for the table
        const store = db.createObjectStore(name, { keyPath: "id" });

        indices.forEach(function (index) {

        });
        // add index to allow for searching object store
        store.createIndex("car_color", ["color"], { unique: false });

        // add compound index to search by more than one term
        store.createIndex("color_and_make", ["color", "make"], { unique: false });
    };

    // listen for and handle onsuccess event - triggered that db has been successfuly opened
    request.onsuccess = function () {
        console.log("Database opened successfully");
        return true;     
    };
    
}

export function executeTutorial() {


    //  go through list of the possible IndexedDB in use by client browser
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    if (!indexedDB) {
        console.log("IndexedDB could not be found in this browser.");
    }

    // open the db - 1 is the version, needs to be incremented if structure is changed
    const request = indexedDB.open("CarsDatabase", 1);

    // listen for and handle error event
    request.onerror = function (event) {
        console.error("An error occurred with IndexedDB");
        console.error(event);
    };

    // listen for and handle upgradeneeded eventn - triggered when the database version is incrementing or a new db is being created
    request.onupgradeneeded = function () {
        // result is db object
        const db = request.result;

        // create object store (table) and assign keyPath (primary key)
        const store = db.createObjectStore("cars", { keyPath: "id" });

        // add index to allow for searching object store
        store.createIndex("car_color", ["color"], { unique: false });

        // add compound index to search by more than one term
        store.createIndex("color_and_make", ["color", "make"], {
            unique: false,
        });
    };

    // listen for and handle onsuccess event - triggered that db has been successfuly opened
    request.onsuccess = function () {
        console.log("Database opened successfully");

        const db = request.result;

        // start transaction to modify db data
        const transaction = db.transaction("cars", "readwrite");

        // get store reference and indices
        const store = transaction.objectStore("cars");
        const colorIndex = store.index("car_color");
        const makeModelIndex = store.index("color_and_make");

        // add new data to db using the indices we created as the data fields for the new data object
        store.put({ id: 1, color: "Red", make: "Toyota" });
        store.put({ id: 2, color: "Red", make: "Kia" });
        store.put({ id: 3, color: "Blue", make: "Honda" });
        store.put({ id: 4, color: "Silver", make: "Subaru" });

        // query the data objects just added to the db
        const idQuery = store.get(4);
        const colorQuery = colorIndex.getAll(["Red"]);
        const colorMakeQuery = makeModelIndex.get(["Blue", "Honda"]);

        // onsuccess of query completion log query results to console
        idQuery.onsuccess = function () {
            console.log('idQuery', idQuery.result);
        };
        colorQuery.onsuccess = function () {
            console.log('colorQuery', colorQuery.result);
        };
        colorMakeQuery.onsuccess = function () {
            console.log('colorMakeQuery', colorMakeQuery.result);
        };

        // update data in db
        const subaru = store.get(4);
        // listen for and handle onsuccess event - triggered when data object requested is found
        subaru.onsuccess = function () {
            subaru.result.color = "Green";
            store.put(subaru.result);
        }
        // listen for and handle error event - triggered when data object is not found

        // delete data from db using id
        const deleteCar = store.delete(1);
        deleteCar.onsuccess = function () {
            console.log("Red Toyota has been removed");
        };
        // listen for and handle error event - triggered when data object is not deleted or found

        // delete data from db using index
        const redCarKey = colorIndex.getKey(["Red"]);
        redCarKey.onsuccess = function () {
            const deleteCar = store.delete(redCarKey.result);
            deleteCar.onsuccess = function () {
                console.log("Red car has been removed");
            };
            // listen for and handle error event - triggered when data object is not deleted or found 
        };
        // listen for and handle error event - triggered when index key is not found


        // listen for and handle oncomplete event - triggered when transaction has successfully completed
        transaction.oncomplete = function () {
            db.close();   // close db
        };
    };

    return true;
}

export function executeTutorial() {


    //  go through list of the possible IndexedDB in use by client browser
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    if (!indexedDB) {
        console.log("IndexedDB could not be found in this browser.");
    }

    // open the db - 1 is the version, needs to be incremented if structure is changed
    const request = indexedDB.open("CarsDatabase", 1);

    // listen for and handle error event
    request.onerror = function (event) {
        console.error("An error occurred with IndexedDB");
        console.error(event);
    };

    // listen for and handle upgradeneeded eventn - triggered when the database version is incrementing or a new db is being created
    request.onupgradeneeded = function () {
        // result is db object
        const db = request.result;

        // create object store (table) and assign keyPath (primary key)
        const store = db.createObjectStore("cars", { keyPath: "id" });

        // add index to allow for searching object store
        store.createIndex("car_color", ["color"], { unique: false });

        // add compound index to search by more than one term
        store.createIndex("color_and_make", ["color", "make"], {
            unique: false,
        });
    };

    // listen for and handle onsuccess event - triggered that db has been successfuly opened
    request.onsuccess = function () {
        console.log("Database opened successfully");

        const db = request.result;

        // start transaction to modify db data
        const transaction = db.transaction("cars", "readwrite");

        // get store reference and indices
        const store = transaction.objectStore("cars");
        const colorIndex = store.index("car_color");
        const makeModelIndex = store.index("color_and_make");

        // add new data to db using the indices we created as the data fields for the new data object
        store.put({ id: 1, color: "Red", make: "Toyota" });
        store.put({ id: 2, color: "Red", make: "Kia" });
        store.put({ id: 3, color: "Blue", make: "Honda" });
        store.put({ id: 4, color: "Silver", make: "Subaru" });

        // query the data objects just added to the db
        const idQuery = store.get(4);
        const colorQuery = colorIndex.getAll(["Red"]);
        const colorMakeQuery = makeModelIndex.get(["Blue", "Honda"]);

        // onsuccess of query completion log query results to console
        idQuery.onsuccess = function () {
            console.log('idQuery', idQuery.result);
        };
        colorQuery.onsuccess = function () {
            console.log('colorQuery', colorQuery.result);
        };
        colorMakeQuery.onsuccess = function () {
            console.log('colorMakeQuery', colorMakeQuery.result);
        };

        // update data in db
        const subaru = store.get(4);
        // listen for and handle onsuccess event - triggered when data object requested is found
        subaru.onsuccess = function () {
            subaru.result.color = "Green";
            store.put(subaru.result);
        }
        // listen for and handle error event - triggered when data object is not found

        // delete data from db using id
        const deleteCar = store.delete(1);
        deleteCar.onsuccess = function () {
            console.log("Red Toyota has been removed");
        };
        // listen for and handle error event - triggered when data object is not deleted or found

        // delete data from db using index
        const redCarKey = colorIndex.getKey(["Red"]);
        redCarKey.onsuccess = function () {
            const deleteCar = store.delete(redCarKey.result);
            deleteCar.onsuccess = function () {
                console.log("Red car has been removed");
            };
            // listen for and handle error event - triggered when data object is not deleted or found 
        };
        // listen for and handle error event - triggered when index key is not found


        // listen for and handle oncomplete event - triggered when transaction has successfully completed
        transaction.oncomplete = function () {
            db.close();   // close db
        };
    };

    return true;
}




