function BooksValidator(container) {

    this.cantainer = container;

    this.IsValide = function() {
        var result = true;
        if (!CheckFields(this.cantainer + ' #edit-name')) {
            SetError(this.cantainer + ' #group-name', true);
            LabelVisibility(this.cantainer + ' #label-name', true);
            result = false;
        } else {
            SetError(this.cantainer + ' #group-name', false);
            LabelVisibility(this.cantainer + ' #label-name', false);
        }
        if (!CheckFields(this.cantainer + ' #edit-author')) {
            SetError(this.cantainer + ' #group-author', true);
            LabelVisibility(this.cantainer + ' #label-author', true);
            result = false;
        } else {
            SetError(this.cantainer + ' #group-author', false);
            LabelVisibility(this.cantainer + ' #label-author', false);
        }
        return result;
    }

    function CheckFields(field) {
        if ($(field).val() == '') {
            return false;
        }
        return true;
    }

    function SetError(field, isError) {
        var group = $(field);
        if (isError) {
            group.addClass('has-error');
        } else {
            group.removeClass('has-error');
        }
    }
    function LabelVisibility(field, isVisible) {
        var label = $(field);
        if (isVisible) {
            label.removeClass('invisible');
        } else {
            label.addClass('invisible');
        }
    }
}