$(document).ready(function () {
    var adder = CreateBooksAdder();
    var editor = CreateBooksEditor();
    var deleter = CreateBooksDeleter(adder, editor);

    adder.otherBlock = editor;
    editor.otherBlock = adder;

    var onListUpdate = function () {
        editor.SetupEvents();
        deleter.SetupEvents();
    }

    adder.onListUpdate = onListUpdate;
    editor.onListUpdate = onListUpdate;
    deleter.onListUpdate = onListUpdate;
});

function CreateBooksEditor() {
    var editor = new BooksChanger();
    editor.container = '#edit-boxes';
    editor.openButton = '#edit-button';
    editor.slider = '.extremum-slide';
    editor.action = 'Home/EditBook';
    editor.submitButton = '#edit-submit';
    editor.cancelButton = '#edit-cancel';
    editor.needCreateParameters = true;
    editor.otherBlock = null;
    editor.parentClass = '.books';
    editor.SetupEvents();
    return editor;
}

function CreateBooksAdder() {
    var adder = new BooksAdder();
    adder.container = '#add-boxes';
    adder.openButton = '#add-button';
    adder.slider = '.extremum-slide-adding';
    adder.action = 'Home/AddBook';
    adder.submitButton = '#add-submit';
    adder.cancelButton = '#add-cancel';
    adder.needCreateParameters = false;
    adder.otherBlock = null;
    adder.parentClass = '.adding';
    adder.SetupEvents();
    return adder;
}

function CreateBooksDeleter(adder, editor) {
    var deleter = new BooksDeleter();
    deleter.adder = adder;
    deleter.editor = editor;
    deleter.parentClass = '.books';
    deleter.openButton = '#delete-button';
    deleter.SetupEvents();
    return deleter;
}