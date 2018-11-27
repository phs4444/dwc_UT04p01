"use strict";

/* Ours Exceptions */

function BaseException() {
}

BaseException.prototype = new Error();
BaseException.prototype.constructor = BaseException;
BaseException.prototype.toString = function(){
    return this.name + ": " + this.message;
};

function NotInstanceOf_Ex() {
    this.name = "NotInstanceOf_Ex";
    this.message = "The element is not a type of the list content";
}
NotInstanceOf_Ex.prototype = new BaseException();
NotInstanceOf_Ex.prototype.constructor = NotInstanceOf_Ex;

function ListFull_Ex() {
    this.name = "ListFull_Ex";
    this.message = "The list is Full. You can't put the element in it";
}
ListFull_Ex.prototype = new BaseException();
ListFull_Ex.prototype.constructor = ListFull_Ex;

function IOB_Ex() {
    this.name = "IOB_Ex";
    this.message = "Index Out of Bounds";
}
IOB_Ex.prototype = new BaseException();
IOB_Ex.prototype.constructor = IOB_Ex;

function ListEmpty_Ex() {
    this.name = "ListEmpty_Ex";
    this.message = "The list is empty. You can't remove any element";
}
ListEmpty_Ex.prototype = new BaseException();
ListEmpty_Ex.prototype.constructor = ListEmpty_Ex;