"use strict";

/* Page functions */
var PERSON_LIST = create();

function cleanData() {
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("pos").value = "";
}

function add(name, surname, pos) {
    var error = document.getElementById("error");
    var oList = document.getElementById("oList");
    error.innerHTML = "";
    try {
        add(PERSON_LIST, num);
        oList.innerHTML = toString(PERSON_LIST);
    } catch (err) {
        error.innerHTML = err;
    }
}

function removeByIndex(pos) {
    var error = document.getElementById("error");
    var oList = document.getElementById("oList");
    error.innerHTML = "";
    try {
        (pos == "") ? remove(PERSON_LIST, lastElement(PERSON_LIST))
            : remove(PERSON_LIST, pos);
        oList.innerHTML = toString(PERSON_LIST);
    } catch (err) {
        error.innerHTML = err;
    }
}

/* Person constructor */
function Person(name, surname) {
    this.name = name || "John";
    this.surname = surname || "Doe";
    this.fullname = function () {
        return this.name + " " + this.surname;
    }
}

/* OList Functions */
var MAX_ELEM_OLIST = 5;

function create() {
    var oList = [];
    return oList;
}

function isEmpty(oList) {
    return (oList.length === 0);
}

function isFull(oList) {
    return (oList.length === MAX_ELEM_OLIST);
}

function size(oList) {
    return oList.length;
}

/* add elem to the list and return size of list.
use of localeCompare to sort the oList ( surname > name) */
function add(oList, elem) {
    if (!(elem instanceof Person)) throw new NotInstanceOf_Ex();
    if (!isFull(oList)) {
        oList.push(elem);
        oList.sort(function (a, b) {
             var r = a.surname.localeCompare(b.surname);
             return (r == 0)? a.name.localeCompare(b.name) : r;
            });
    } else throw new ListFull_Ex();
    return size(oList);
}

function get(oList, index) {
    index = parseInt(index);
    if ((index >= size(oList) || (index < 0))) throw new IOB_Ex;
    return oList[index];
}

function toString(oList) {
    var str = "";
    if (!isEmpty(oList)) {
        var length = size(oList);
        for (var i = 0; i < length - 1; i++) {
            str = str + oList[i].name + " " + oList[i].surname + " - ";
        }
        str = str + oList[i].name + " " + oList[i].surname;
    }
    return str;
}

function indexOf(oList, elem) {
    if (!(elem instanceof Person)) throw new NotInstanceOf_Ex();
    return oList.indexOf(elem);
}

function capacity(oList) {
    return MAX_ELEM_OLIST;
}

function clear(oList) {
    if (!isEmpty(oList)) {
        oList.splice(0, oList.length);
    }
}

function firstElement(oList) {
    var first;
    if (!isEmpty(oList)) {
        first = oList[0];
    } else throw new ListEmpty_Ex();
    return first;
}

function lastElement(oList) {
    var last;
    if (!isEmpty(oList)) {
        last = oList[size(oList) - 1];
    } else throw new ListEmpty_Ex();
    return last;
}

function remove(oList, index) {
    var index = parseInt(index);
    if ((index >= size(oList) || (index < 0))) throw new IOB_Ex();
    if (isEmpty(oList)) throw new ListEmpty_Ex();
    return oList.splice(index, 1);
}

function removeElement(oList, elem) {
    if (!(elem instanceof Person)) throw new NotInstanceOf_Ex();
    if (isEmpty(oList)) throw new ListEmpty_Ex();
    var pos = indexOf(oList, elem); //return -1 if elem not in oList
    if (pos != -1) oList.splice(pos, 1); //delete elem if its in oList
    return size != oList.length;
}


function testoList() {
    //var oList = create (); 	
    var oList = [];

    var p1 = new Person("Juan", "Cuesta");
    var p2 = new Person("Antonio", "Recio");
    var p3 = new Person("Carlos", "Alcántara");
    var p4 = new Person("Enjuto", "Mojamuto");
    var p5 = new Person("Paco", "Gimeno");
    var p6 = new Person("Michael", "Scott");
    

    console.log("Capacidad: " + capacity(oList));
    console.log("Es vacía: " + isEmpty(oList));
    console.log("Longitud: " + size(oList));

    try {
        console.log("Nº de elementos: " + add(oList, p1));
        console.log("Nº de elementos: " + add(oList, p2));
        console.log("Nº de elementos: " + add(oList, p3));
        console.log("Nº de elementos: " + add(oList, p4));
       
        console.log("The full oList: " + toString(oList));
        console.log("Añado a la persona: Paco Gimeno. Deberá ordenarse como el resto de elementos: " + add(oList, p5));
        add(oList, p6); //It will generate an exception.
    } catch (err) {
        console.log(err.toString());
    }

    console.log("Busco la persona Paco Gimeno desde el principio: " + indexOf(oList, p5));
    console.log("The full oList: " + toString(oList));
    console.log("The first element oList: " + firstElement(oList).fullname());
    console.log("The last element oList: " + lastElement(oList).fullname());
    console.log("The element at index 3: " + get(oList, 3).fullname());

    //clear(oList);

    try {
        while (true) {
            console.log("Elimino elemento en index 3: " + remove(oList, 3));
            console.log("Elimino la persona: Paco Gimeno si lo encuentra: " + removeElement(oList, p5));
            console.log("The oList: " + toString(oList));
        }
    } catch (err) {
        console.log(err.toString()); //When the oList is empty, an exception will be catched.
    }

    console.log("The oList: " + toString(oList));
}
window.onload = testoList;