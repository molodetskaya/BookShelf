$(document).ready(function () {
    SetEvents();
    function SetEvents() {
        $('.books').on('click', '#delete-button', function delete_book(event) {
            event.stopImmediatePropagation();
            if ($('#edit-boxes').html() != '') {
                $('.extremum-slide').slideToggle(500, function () {
                    $('#edit-boxes').html('');
                });
            }
            if ($('#add-boxes').html() != '') {
                $('.extremum-slide-adding').slideToggle(0, function () {
                    $('#add-boxes').html('');
                });
            }
            var options = {
                "backdrop": "static"
            }
            $('#basicModal').modal(options);
            var bookId = $(this).attr("data-content");
            var params = 'id=' + bookId;
            var xmlhttp = getXmlHttp();
            xmlhttp.open("GET", "Home/GetName?" + params);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    $('#myModalLabel').text("Delete " + xmlhttp.responseText);
                }
            }
            xmlhttp.send(null);
            $('.js-btn-confirm').on('click', function () {
                var xmlhttp = getXmlHttp();
                xmlhttp.open("POST", "Home/DeleteBook", true);
                xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xmlhttp.setRequestHeader('Content-length', params.length);
                xmlhttp.setRequestHeader('Accept-Language', 'en-US,en;q=0.9');
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4) {
                        UpdateList()
                    }
                }
                xmlhttp.send(params);
            });
        });
        

        $('.books').on('click', '#edit-button', function edit_book() {
            if ($('#add-boxes').html() != '') {
                $('.extremum-slide-adding').slideToggle(0, function () {
                    $('#add-boxes').html('');
                });
            }
            if ($('#edit-boxes').html() == '') {
                $('.extremum-slide').slideToggle(0);
            }
            var xmlhttp = getXmlHttp();
            xmlhttp.open("GET", "Home/EditBook?id=" + $(this).attr("data-content"));
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    $('#edit-boxes').html('');
                    $('#edit-boxes').html(xmlhttp.responseText);
                    $('#edit-name').focus();
                    $('.form-control').on('input', function () {
                        IsValide('#edit-boxes');
                    });

                    $('#edit-cancel').on('click', function () {
                        $('.extremum-slide').slideToggle(500, function () {
                            $('#edit-boxes').html('');
                        });
                    });
                    $('#edit-submit').on('click', function () {
                        if (!IsValide('#edit-boxes')) {
                            return;
                        }
                        $('.extremum-slide').slideToggle(500, function () {
                            $('#edit-boxes').html('');
                        });
                        var id = $('#edit-id');
                        var name = $('#edit-name');
                        var author = $('#edit-author');
                        var book = 'BookId=' + id.val() + '&BookName=' + name.val() + '&BookAuthor=' + author.val();
                        var xmlhttp = getXmlHttp();
                        xmlhttp.open("POST", "Home/EditBook", true);
                        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        xmlhttp.setRequestHeader('Content-length', book.length);
                        xmlhttp.setRequestHeader('Accept-Language', 'en-US,en;q=0.9');
                        xmlhttp.send(book);
                        xmlhttp.onreadystatechange = function () {
                            if (xmlhttp.readyState == 4) {
                                if (xmlhttp.responseText == 'True') {
                                    UpdateList();
                                }
                                else {
                                    $('.text-danger').removeClass('hidden');
                                }
                            }
                        }
                    });
                }
            }
            xmlhttp.send(null); 
        });
    }
    

    $('#add-button').on('click', function () {
        if ($('#edit-boxes').html() != '') {
            $('.extremum-slide').slideToggle(500, function () {
                $('#edit-boxes').html('');
            });
        }
        if ($('#add-boxes').html() != '') {
            return;
        }
        $('#add-button').disabled = true;

        var xmlhttp = getXmlHttp();
        xmlhttp.open("GET", "Home/AddBook", true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                $('#add-boxes').html('');
                $('#add-boxes').html(xmlhttp.responseText);
                $('#add-name').focus();
                $('.form-control').on('input', function () {
                    IsValide('#add-boxes');
                });
                
                $('.extremum-slide-adding').slideToggle(500);

                $('#add-cancel').on('click', function () {
                    if ($('#add-boxes').html() != '') {
                        $('.extremum-slide-adding').slideToggle(500, function () {
                            $('#add-boxes').html('');
                        });
                    }
                });
                $('#add-submit').on('click', function () {
                    if (!IsValide('#add-boxes')) {
                        return;
                    }
                    event.stopImmediatePropagation();
                    var name = $('#edit-name');
                    var author = $('#edit-author');
                    var book = 'BookName=' + name.val() + '&BookAuthor=' + author.val();
                    var xmlhttp = getXmlHttp();
                    xmlhttp.open("POST", "Home/AddBook", true);
                    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    xmlhttp.setRequestHeader('Content-length', book.length);
                    xmlhttp.setRequestHeader('Accept-Language', 'en-US,en;q=0.9');
                    xmlhttp.send(book);
                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == 4) {
                            if (xmlhttp.responseText == 'True') {
                                $('.extremum-slide-adding').slideToggle(500, function () {
                                    $('#add-boxes').html('');
                                    UpdateList();
                                });
                            }
                            else {
                                $('.text-danger').removeClass('hidden');
                                alert(xmlhttp.responseText);
                            }
                        }
                    }
                });
            }
        }
        xmlhttp.send(null);
    });
    
    function IsValide(object) {
        var result = true;
        if (!CheckFields(object+' #edit-name')) {
            SetError(object + ' #group-name', true);
            LabelVisibility(object + ' #label-name', true);
            result = false;
        } else {
            SetError(object + ' #group-name', false);
            LabelVisibility(object + ' #label-name', false);
        }
        if (!CheckFields(object+' #edit-author')) {
            SetError(object + ' #group-author', true);
            LabelVisibility(object + ' #label-author', true);
            result = false;
        } else {
            SetError(object + ' #group-author', false);
            LabelVisibility(object + ' #label-author', false);
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

    function UpdateList() {
        var xmlhttp = getXmlHttp();
        xmlhttp.open("GET", "Home/List", true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                $('#list-block').html('');
                $('#list-block').html(xmlhttp.responseText);
                SetEvents();
            }
        }
        xmlhttp.send(null);
    }
    function getXmlHttp() {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (ee) {
            }
        }
        if (typeof XMLHttpRequest != 'undefined') {
            return new XMLHttpRequest();
        }
    }
});