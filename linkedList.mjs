class Node {

    constructor(data, nextNode = null){
        this.data = data;
        this.nextNode = nextNode;
    }


}

class LinkedList {

    constructor(listHead = null) {
        this.listHead = listHead;
        this.elements = 0;
    }

    // insert in front
    prepend(value) {

        if (this.listHead === null){
            this.append(value);
            return;
        }

        let temp = this.listHead;

        this.listHead = new Node(value);

        this.listHead.nextNode = temp;

        this.elements++; 
    }

    append(value) {

        if (this.listHead === null){
            this.listHead = new Node(value);

            this.elements++;

            return;
        }
        let tmp = this.listHead;
        while (tmp.nextNode !== null){
            tmp = tmp.nextNode;
        }

        tmp.nextNode = new Node(value);

        this.elements++;

    }


    size() {
        return this.elements;
    }

    head() {
        if (this.listHead === null){
            return null;
        }
        return this.listHead.data;
    }

    tail() {
        if (this.elements === 0) {
            return
        }

        let temp = this.listHead;

        while(temp.nextNode !== null){
            temp = temp.nextNode;
        }

        return temp.data;
    }

    at(index) {
        if (index > this.elements - 1 || index < 0){
            return
        }

        let counter = 0;

        let temp = this.listHead;

        while( counter !== index ){
            temp = temp.nextNode;
            counter++;
        }

        return temp.data;
    }

    pop() {

        if ( this.elements === 0 ){
            return;
        }

        let temp = this.listHead;
        let prev;

        while ( temp.nextNode !== null ) {
            prev = temp;
            temp = temp.nextNode;
        }

        prev.nextNode = null;

    }

    contains(value) {

        if ( this.elements === 0 ) {
            return;
        }

        let temp = this.listHead;

        while ( temp.nextNode !== null ) {

            if ( temp.data === value ) {
                return true;
            }

            temp = temp.nextNode;

        }

        if ( temp.data === value ) {
            return true;
        } else {
            return false;
        }

    }

    getValueOfKey(key) {

        if ( this.elements === 0 ) {
            return null;
        }

        let temp = this.listHead;

        while ( temp.nextNode !== null ) {

            if ( temp.data[0] === key ) {
                return temp.data[1];
            }

            temp = temp.nextNode;

        }

        if ( temp.data[0] === key ) {
            return temp.data[1];
        } else {
            return null;
        }

    }

    find(value) {

        let temp = this.listHead;

        let counter = 0;

        while ( temp.nextNode !== null ) {

            if (temp.data === value){
                return counter;
            }

            counter++;

            temp = temp.nextNode;

        }

        if (temp.data === value){
            return counter;
        } else {
            return null;
        }

    }

    toString() {

        let temp = this.listHead;

        let string = "";

        while (temp.nextNode !== null) {
            let text = `( ${temp.data} ) -> `;
            string = string.concat(text);

            temp = temp.nextNode;
        }

        string = string.concat(`( ${temp.data} ) -> NULL`);

        return string;
    }

    getAllKeys() {
        let temp = this.listHead;
        const keys = [];

        if (this.elements === 0 ) return keys;

        if (this.elements === 1) {
            keys.push(temp.data[0]);
            return keys;
        }
            

        while(temp.nextNode !== null) {
            keys.push(temp.data[0]);
            temp = temp.nextNode;
        }
        keys.push(temp.data[0]);
        return keys;
    }

    getAllValues() {
        let temp = this.listHead;
        const values = [];

        if (this.elements === 0 ) return values;

        if (this.elements === 1) {
            values.push(temp.data[1]);
            return values;
        }
            

        while(temp.nextNode !== null) {
            values.push(temp.data[1]);
            temp = temp.nextNode;
        }
        values.push(temp.data[1]);
        return values;
    }   

    getEntries() {
        let temp = this.listHead;
        const entries = [];

        if (this.elements === 0 ) return entries;

        if (this.elements === 1) {
            entries.push([temp.data[0], temp.data[1]]);
            return entries;
        }

        while (temp.nextNode !== null) {
            entries.push([temp.data[0], temp.data[1]]);

            temp = temp.nextNode; 
        }

        entries.push([temp.data[0], temp.data[1]]);

        return entries;

    }

    insertAt(value, index) {

        if ( index < 0 || index > this.elements - 1 ) return;

        if ( index === 0 ) {

            this.prepend(value);
            return;

        }

        if ( index === this.elements - 1) {

            this.append(value);
            return;

        }

        let temp = this.listHead;
        let counter = 0;
        let prev;

        while ( temp.nextNode !== null ) {
            
            if ( counter === index) {
                prev.nextNode = new Node(value);
                prev.nextNode.nextNode = temp;
                return;
            }

            prev = temp;

            temp = temp.nextNode;

            counter++;
        }

    }

    removeAt( index ) {

        if ( index < 0 || index > this.elements - 1 ) return;

        if ( index === 0 ) {

            this.listHead = this.listHead.nextNode;
            return;

        }

        if ( index === this.elements - 1) {

            this.pop();
            return;

        }

        let temp = this.listHead;
        let counter = 0;
        let prev;

        while ( temp.nextNode !== null ) {
            
            if (counter === index ) {
                prev.nextNode = temp.nextNode;
                return;
            }

            counter++;

            prev = temp;

            temp = temp.nextNode;

        }
    }

    removeKey( key ) {

        
        if (this.listHead.data[0] === key){
            this.listHead = this.listHead.nextNode;
            this.elements--;
            return "Key removed";
        }
        
        let temp = this.listHead;
        let prev;

        while ( temp.nextNode !== null ) {
            
            if (key === temp.data[0] ) {
                prev.nextNode = temp.nextNode;
                this.elements--;
                return "Key removed";
            }

            prev = temp;

            temp = temp.nextNode;

        }
        if (temp.data[0] === key){
            prev.nextNode = temp.nextNode;
            this.elements--;
            return "Key removed";
        }
        return "fail";
    }
    
}


export {Node, LinkedList};