export function executeTutorial() {


    //  go through list of the possible IndexedDB in use by client browser
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    if (!indexedDB) {
        console.log("IndexedDB could not be found in this browser.");
    }

    // open the db - 1 is the version, needs to be incremented if structure is changed
    const request = indexedDB.open("VehichlesDatabase", 1);

    // listen for and handle error event
    request.onerror = function (event) {
        console.error("An error occurred with IndexedDB");
        console.error(event);
    };

    // listen for and handle upgradeneeded eventn - triggered when the database version is incrementing or a new db is being created
    request.onupgradeneeded = function () {
        // result is db object
        const db = request.result;

        // create cars object store (table) and assign keyPath (primary key)
        const cars = db.createObjectStore("cars", { keyPath: "id" });
        // add index to allow for searching object store 
        cars.createIndex("colorIndex", ["color"], { unique: false }); // createIndex(indexName, valueToIndex, requireUniqueValue)
        // add compound index to search by more than one term
        cars.createIndex("colorMakeIndex", ["color", "make"], {
            unique: false,
        });
        // create suvs object store (table) and assign keyPath (primary key)
        const suvs = db.createObjectStore("suvs", { keyPath: "id" });
        // add index to allow for searching object store 
        suvs.createIndex("colorIndex", ["color"], { unique: false }); // createIndex(indexName, valueToIndex, requireUniqueValue)
        // add compound index to search by more than one term
        suvs.createIndex("colorMakeIndex", ["color", "make"], {
            unique: false,
        });
    };

    // listen for and handle onsuccess event - triggered that db has been successfuly opened
    request.onsuccess = function () {
        console.log("Database opened successfully");

        const db = request.result;

        // start transaction to modify cars store (table) data
        const carsTransaction = db.transaction("cars", "readwrite");
        // open transaction for cars store (table)
        const cars = carsTransaction.objectStore("cars");
        // get cars store (table) schema
        const carsColorIndex = cars.index("colorIndex");
        const carsMakeModelIndex = cars.index("colorMakeIndex");
        // start transaction to modify suvs store (table) data
        const suvsTransaction = db.transaction("suvs", "readwrite");
        // open transaction for suvs store (table)
        const suvs = suvsTransaction.objectStore("suvs");
        // get suvs store (table) schema
        const suvsColorIndex = suvs.index("colorIndex");
        const suvsMakeModelIndex = suvs.index("colorMakeIndex");

        // add new data to cars store (table) using the indices we created as the data fields for the new data object
        cars.put({ id: 1, color: "Red", make: "Toyota" });
        cars.put({ id: 2, color: "Red", make: "Kia" });
        cars.put({ id: 3, color: "Blue", make: "Honda" });
        cars.put({ id: 4, color: "Silver", make: "Subaru" });

        // add new data to suvs store (table) using the indices we created as the data fields for the new data object
        suvs.put({ id: 1, color: "Red", make: "Toyota" });
        suvs.put({ id: 2, color: "Red", make: "Kia" });
        suvs.put({ id: 3, color: "Blue", make: "Honda" });
        suvs.put({ id: 4, color: "Silver", make: "Subaru" });

        // query the car data objects just added to the db
        const idQuery = cars.get(4);
        const colorQuery = carsColorIndex.getAll(["Red"]);
        const colorMakeQuery = carsMakeModelIndex.get(["Blue", "Honda"]);

        // onsuccess of car data query completion log query results to console
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
        const subaruCars = cars.get(4);
        // listen for and handle onsuccess event - triggered when data object requested is found
        subaruCars.onsuccess = function () {
            subaruCars.result.color = "Green";
            cars.put(subaruCars.result);
        }
        // listen for and handle error event - triggered when data object is not found

        // delete data from db using id
        const deleteCar = cars.delete(1);
        deleteCar.onsuccess = function () {
            console.log("Red Toyota has been removed");
        };
        // listen for and handle error event - triggered when data object is not deleted or found

        // delete data from db using index (delete all red cars)
        const redCarKey = carsColorIndex.getKey(["Red"]);
        redCarKey.onsuccess = function () {
            const deleteCar = cars.delete(redCarKey.result);
            deleteCar.onsuccess = function () {
                console.log("Red car has been removed");
            };
            // listen for and handle error event - triggered when data object is not deleted or found 
        };
        // listen for and handle error event - triggered when index key is not found


        // listen for and handle oncomplete event - triggered when transaction has successfully completed
        carsTransaction.oncomplete = function () {
            db.close();   // close db
        };
    };

    return true;
}




