function BooksChangerBasic() {
    var self = this;

    this.SetupEvents = function () {
        $(self.parentClass).on('click', self.openButton, self.EditBook);
    }

    this.UpdateList = function () {
        $.get('Home/List', function (response) {
            $('#list-block').html('');
            $('#list-block').html(response);
            self.onListUpdate();
        });
    }
    this.EditBook = function () { }
}


function BooksChanger() {
    BooksChangerBasic.call(this);
    var self = this;


    this.HideAndClearBlock = function (speed) {
        if ($(self.container).html() != '') {
            $(self.slider).slideToggle(speed, function () {
                $(self.container).html('');
            });
        }
    };

    this.EditCancel = function () {
        self.HideAndClearBlock(500);
    }

    this.EditConfirm = function() {
        if (!self.editValidator.IsValide()) {
            return;
        }
        var id = $('#edit-id');
        var name = $('#edit-name');
        var author = $('#edit-author');
        var book = 'BookId=' + id.val() + '&BookName=' + name.val() + '&BookAuthor=' + author.val();
        $.post(self.action, book, function (data) {
            self.HideAndClearBlock(500);
            self.UpdateList();
        });
    }

    this.EditBook = function () {
        self.otherBlock.HideAndClearBlock(0);

        if ($(self.container).html() == '') {
            $(self.slider).slideToggle(500);
        }

        $.get(self.action, self.CreateParameters.call(this), function (data) {
            $(self.container).html('');
            $(self.container).html(data);
            $('#edit-name').focus();
            self.editValidator = new BooksValidator(self.container);
            $('.form-control').on('input', function () {
                self.editValidator.IsValide();
            });
            $(self.cancelButton).on('click', self.EditCancel);
            $(self.submitButton).on('click', self.EditConfirm);
        });
    }

    this.CreateParameters = function () {
        if (self.needCreateParameters) {
            return 'id=' + $(this).attr("data-content");
        }
        return null;
    }
}


function BooksAdder() {
    BooksChanger.call(this);
    self = this;

    this.EditBook = function () {
        self.otherBlock.HideAndClearBlock(0);

        if ($(self.container).html() != '') {
            return;
        }

        $.get(self.action, self.CreateParameters.call(this), function (data) {
            $(self.container).html('');
            $(self.container).html(data);
            $('#edit-name').focus();
            self.editValidator = new BooksValidator(self.container);
            $('.form-control').on('input', function () {
                self.editValidator.IsValide();
            });
            $(self.slider).slideToggle(500);
            $(self.cancelButton).on('click', self.EditCancel);
            $(self.submitButton).on('click', self.EditConfirm);
        });
    }
}


function BooksDeleter()
{
    BooksChangerBasic.call(this);
    var self = this;

    this.EditBook = function (event) {
        event.stopImmediatePropagation();
        self.editor.HideAndClearBlock(500);
        self.adder.HideAndClearBlock(500);

        var options = {
            "backdrop": "static"
        }
        $('#basicModal').modal(options);
        var bookId = $(this).attr("data-content");
        var params = 'id=' + bookId;
        $.get('Home/GetName', params, function (data) {
            $('#myModalLabel').text("Delete " + data);
        });
        $('.js-btn-confirm').on('click', function () {
            $.post('Home/DeleteBook', params, function () {
                self.UpdateList();
            });
        });
    }

}

