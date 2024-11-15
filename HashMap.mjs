import { Node, LinkedList } from "./linkedList.mjs";

class HashMap {

    constructor(size = 16) {
        this.size = size;
        this.buckets = Array.from({length: size}, () => new LinkedList());
        this.elements = 0;
        this.loadFactor = 0.75; 
        this.storedKeys = 0;
    }

    hash(key) {

        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++){
            hashCode = hashCode * primeNumber + key.charCodeAt(i); 
        }

        return hashCode % this.size;

    }

    set(key, value) {
        const index = this.hash(key);

        const valueOfKey = this.buckets[index].getValueOfKey(key);

        if ((this.storedKeys < this.loadFactor * this.size) || valueOfKey !== null){

            console.log(this.buckets[index].size());

            if (valueOfKey !== null) {
                this.remove(key);
                this.buckets[index].prepend([key, value]);
                this.storedKeys++;
            }
            else {
                this.buckets[index].prepend([key, value]);
                this.storedKeys++;
            }
            
        } else {
            const entries = this.entries();
            this.size = this.size * 2;
            this.storedKeys = 0
            this.buckets = Array.from({length: this.size}, () => new LinkedList());

            entries.forEach((entry) => {
                this.set(entry[0], entry[1]);

            })

            this.set(key, value);
        }


    }

    getSize() {
        return this.size;
    }

    getNumberOfKeys() {
        return this.storedKeys;
    }

    get(key) {

        const index = this.hash(key);

        return this.buckets[index].getValueOfKey(key);

    }

    has(key) {

        const index = this.hash(key);

        if (this.buckets[index].getValueOfKey(key) === null){
            return false;
        } else {
            return true;
        }

    }

    remove(key) {

        const index = this.hash(key)
        const linkedList = this.buckets[index];

        if (linkedList.size() === 0) return;

        const response = linkedList.removeKey(key);

        if (response !== "fail") {
            this.storedKeys--;
        }

        return;

    }

    length() {
        return this.storedKeys;
    }

    clear() {
        this.buckets = Array(16).fill(new LinkedList());
        this.storedKeys = 0;
    }

    keys() {
        let keys = []

        for (let i = 0; i < this.size; i++) {
            let keysInBucket = this.buckets[i].getAllKeys();
            if (keysInBucket.length !== 0){
                let temp = [];
                temp = keys.concat(keysInBucket);
                keys = temp;
            }
        }

        return keys;
    }

    entries() {
        let entries = [];

        for (let i = 0; i < this.size; i++) {
            let entriesInBucket = this.buckets[i].getEntries();
            if (entriesInBucket.length !== 0){
                let temp = [];
                temp = entries.concat(entriesInBucket);
                entries = temp;
            }
        }

        return entries;
    }

    values() {
        let values = []

        for (let i = 0; i < this.size; i++) {
            let valuesInBucket = this.buckets[i].getAllValues();
            if (valuesInBucket.length !== 0){
                let temp = [];
                temp = values.concat(valuesInBucket);
                values = temp;
            }
        }

        return values;
    }


}

// set( key, value ) | hash( key ) | get( key ) | has( key ) | remove( key )
// length() | clear() | keys() | values() | entries()













