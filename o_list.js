"use strict";

/* Page functions */
var PERSONS_LIST = create();

function cleanData() {
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("pos").value = "";
}

function add(name, surname, pos) {
    var error = document.getElementById("error");
    var list = document.getElementById("list");
    error.innerHTML = "";
    try {
        add(PERSONS_LIST, num);
        list.innerHTML = toString(PERSONS_LIST);
    } catch (err) {
        error.innerHTML = err;
    }
}

function removeByIndex(pos) {
    var error = document.getElementById("error");
    var list = document.getElementById("list");
    error.innerHTML = "";
    try {
        (pos == "") ? remove(PERSONS_LIST, lastElement(PERSONS_LIST))
            : remove(PERSONS_LIST, pos);
        list.innerHTML = toString(PERSONS_LIST);
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

/* List Functions */
var MAX_ELEM_LIST = 5;

function create() {
    var list = [];
    return list;
}

function isEmpty(list) {
    return (list.length === 0);
}

function isFull(list) {
    return (list.length === MAX_ELEM_LIST);
}

function size(list) {
    return list.length;
}

function add(list, elem) {
    if (!(elem instanceof Person)) throw new NotInstanceOf_Ex();
    if (!isFull(list)) {
        list.push(elem);
    } else throw new ListFull_Ex();
    return size(list);
}

function addAt(list, elem, index) {
    index = parseInt(index);
    if (!(elem instanceof Person)) throw new NotInstanceOf_Ex();
    if (isNaN(index)) throw new NaNIndex_Ex();
    if (!isFull(list)) {
        if ((index >= size(list) || (index < 0))) throw new IOB_Ex();
        list.splice(index, 0, elem);
    } else throw new ListFull_Ex();
    return size(list);
}

function get(list, index) {
    index = parseInt(index);
    if ((index >= size(list) || (index < 0))) throw new IOB_Ex();
    return list[index];
}

function toString(list) {
    var str = "";
    if (!isEmpty(list)) {
        var length = size(list);
        for (var i = 0; i < length - 1; i++) {
            str = str + list[i].name + " " + list[i].surname + " - ";
        }
        str = str + list[i].name + " " + list[i].surname;
    }
    return str;
}

function indexOf(list, elem) {
    if (!(elem instanceof Person)) throw new NotInstanceOf_Ex();
    return list.indexOf(elem);
}

function lastIndexOf(list, elem) {
    if (!(elem instanceof Person)) throw new NotInstanceOf_Ex();
    return list.lastIndexOf(elem);
}

function capacity(list) {
    return MAX_ELEM_LIST;
}

function clear(list) {
    if (!isEmpty(list)) {
        list.splice(0, list.length);
    }
}

function firstElement(list) {
    var first;
    if (!isEmpty(list)) {
        first = list[0];
    } else throw new ListEmpty_Ex();
    return first;
}

function lastElement(list) {
    var last;
    if (!isEmpty(list)) {
        last = list[size(list) - 1];
    } else throw new ListEmpty_Ex();
    return last;
}

/* No podemos devolver el elemento borrado tal cual. Devolveremos su toString */
function remove(list, index) {
    var index = parseInt(index);
    if ((index >= size(list) || (index < 0))) throw new IOB_Ex();
    if (isEmpty(list)) throw new ListEmpty_Ex();
    var elemRemoved = list[index].fullname();
    list.splice(index, 1);
    return elemRemoved;
}

function removeElement(list, elem) {
    if (!(elem instanceof Person)) throw new NotInstanceOf_Ex();
    if (isEmpty(list)) throw new ListEmpty_Ex();
    var pos = indexOf(list, elem); //return -1 if elem not in list
    if (pos != -1) list.splice(pos, 1); //delete elem if its in list
    return size != list.length;
}

/* put elem in list[index], return toString of previous content */
function set(list, elem, index) {
    var index = parseInt(index);
    if ((index >= size(list) || (index < 0))) throw new IOB_Ex();
    if (!(elem instanceof Person)) throw new NotInstanceOf_Ex();
        var elemAnt = list[index].fullname();
        list[index] = elem;
    return elemAnt;
}

function testlist() {
    //var list = create (); 	
    var list = [];

    var p1 = new Person("Juan", "Cuesta");
    var p2 = new Person("Antonio", "Recio");
    var p3 = new Person("Carlos", "Alcántara");
    var p4 = new Person("Enjuto", "Mojamuto");
    var p5 = new Person("Paco", "Gimeno");
    var p6 = new Person("Michael", "Scott");
    

    console.log("Capacidad: " + capacity(list));
    console.log("Es vacía: " + isEmpty(list));
    console.log("Longitud: " + size(list));

    try {
        console.log("Nº de elementos: " + add(list, p1));
        console.log("Nº de elementos: " + add(list, p2));
        console.log("Nº de elementos: " + add(list, p3));
        console.log("Nº de elementos: " + add(list, p4));
       
        console.log("The full list: " + toString(list));
        console.log("Añado a la persona: Paco Gimeno. Deberá ordenarse como el resto de elementos: " + add(list, p5));
        add(list, p6); //It will generate an exception.
    } catch (err) {
        console.log(err.toString());
    }

    console.log("Busco la persona Paco Gimeno desde el principio: " + indexOf(list, p5));
    console.log("Busco la persona Paco Gimeno desde el final: " + lastIndexOf(list, p5));
    console.log("The full list: " + toString(list));
    console.log("The first element list: " + firstElement(list).fullname());
    console.log("The last element list: " + lastElement(list).fullname());
    console.log("The element at index 3: " + get(list, 3).fullname());

    //clear(list);

    try {
        while (true) {
            console.log("Elimino elemento en index 3: " + remove(list, 3));
            console.log("Elimino la persona: Paco Gimeno si lo encuentra: " + removeElement(list, p5));
            console.log("The list: " + toString(list));
            console.log("Reemplazo elemento en index 1 por Michael Scott: " + set(list, p6, 1));
        }
    } catch (err) {
        console.log(err.toString()); //When the list is empty, an exception will be catched.
    }

    console.log("The list: " + toString(list));
}
window.onload = testlist;