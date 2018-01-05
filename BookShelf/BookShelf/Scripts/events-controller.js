$(document).ready(function () {
    SetEvents();
    function SetEvents() {
        $('.books').on('click', '#delete-button', function delete_book() {
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
                        $('#tr-' + bookId).remove();
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
                    $('.form-control').on('change', function () {
                        CheckFields('#edit-boxes');
                    });
                }
            }
            xmlhttp.send(null);
        });
    }
    $('#edit-cancel').on('click', function () {
        $('.extremum-slide').slideToggle(500, function () {
            $('#edit-boxes').html('');
        });
    });
    $('#edit-submit').on('click', function () {
        if (CheckFields('#edit-boxes') == 'False')
            return;
        $('.extremum-slide').slideToggle(500, function () {
            $('#edit-boxes').html('');
        });
        var id = $('#edit-id');
        var name = $('#edit-name');
        var author = $('#edit-author');
        var book = 'BookId='+id.val() + '&BookName=' + name.val() + '&BookAuthor=' + author.val();
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

    $('#add-button').on('click', function () {
        if ($('#edit-boxes').html() != '') {
            $('.extremum-slide').slideToggle(500, function () {
                $('#edit-boxes').html('');
            });
        }
        if ($('#add-boxes').html() == '') {
            $('.extremum-slide-adding').slideToggle(500);
        }

        var xmlhttp = getXmlHttp();
        xmlhttp.open("GET", "Home/AddBook", true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                $('#add-boxes').html('');
                $('#add-boxes').html(xmlhttp.responseText);
                $('#add-name').focus();
                $('.form-control').on('change', function () {
                    CheckFields('#add-boxes');
                });
            }
        }
        xmlhttp.send(null);
    });
    $('#add-cancel').on('click', function () {
        if ($('#add-boxes').html() != '') {
            $('.extremum-slide-adding').slideToggle(500, function () {
                $('#add-boxes').html('');
            });
        }
    });
    $('#add-submit').on('click', function () {
        if (CheckFields('#add-boxes') == 'False')
            return;
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

    function CheckFields(container) {
        if ($(container + ' #edit-name').val() == '' || $(container + ' #edit-author').val() == '') {
            $('.text-danger').removeClass('hidden');
            return 'False';
        }
        else {
            $('.text-danger').addClass('hidden');
            return 'True';
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






//$(document).ready(function () {
//    function getXmlHttp() {
//        try {
//            return new ActiveXObject("Msxml2.XMLHTTP");
//        } catch (e) {
//            try {
//                return new ActiveXObject("Microsoft.XMLHTTP");
//            } catch (ee) {
//            }
//        }
//        if (typeof XMLHttpRequest != 'undefined') {
//            return new XMLHttpRequest();
//        }
//    }
//    function getUrl() {
//        var xmlhttp = getXmlHttp();
//        alert('alert test before');
//        xmlhttp.open("GET", "Home/AddBook");
//        alert('alert test outside');
//        xmlhttp.onreadystatechange = function () {
//            if (xmlhttp.readyState == 4) {
//                $('#test-button').html(xmlhttp.responseText);
//                alert('alert test inside');
//                //cb(
//                //xmlhttp.status,
//                //xmlhttp.getAllResponseHeaders(),
//                //xmlhttp.responseText
//                //);
//            }
//        }
//        xmlhttp.send(null);
//    }

//    $('#test-button').on('click', function () {
//        alert('alert test before111');
//        getUrl();
//    });
//});