$(document).ready(function() {

    $('#product-list').empty();

    var newItem = (item) => {
        var cart = "<div class=\"new-arrival-cart\"><p><span class=\"lnr lnr-cart\"></span><a href=\"#\">Add to Cart</a></p><p class=\"arrival-review pull-right\"><a href=\"#\"><span class=\"lnr lnr-heart\"></span></a><a href=\"#\"><span class=\"lnr lnr-frame-expand\"></span></a></p></div>"
        $img = $('<img>').attr('class', 'image').attr('src', item.image)
        $h4 = $('<h4>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('NT$' + item.price)
        $image = $('<div>').attr('class', 'single-new-arrival-bg').append($img).append(cart)
        $item = $('<div>').attr('class', 'single-new-arrival item').append($image).append($h4).append($p)
        $col = $('<div>').attr('class', 'col-md-3 col-sm-4').append($item)
        $('#product-list').append($col)
    }

    var items = null
    var pageCount = 20
    var showItems = (page) => {
        if (items == null) return
        var start = (page - 1) * pageCount
        if (page == lastPage) {
            var end = start + lastItem - 1
        } else {
            var end = start + pageCount - 1
        }
        $('#product-list').empty();
        for (var i = start; i <= end; i++) {
            newItem(items[i])
        }
    }

    var lastItem;
    var lastPage;
    var newPage = (n) => {
        var pageNum = n / 20
        lastItem = (n % 20)
        lastPage = (Math.ceil(pageNum))
        $('#page-number').empty()

        $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('«')
        $li_ = $('<li>').attr('class', 'page-item').addClass('disabled').append($la)
        $('#page-number').append($li_)
        $li_.click(function() {
            for (var i = 2; i <= pageNum + 1; i++) {
                if ($('.p' + i).hasClass('active')) {
                    $('.p' + (i - 1)).addClass('active')
                    $('.p' + i).removeClass('active')
                    showItems(Number(i) - 1)
                    $rli.removeClass('disabled')
                    if (i == 2) {
                        $li_.addClass('disabled')
                    }
                    break;
                }
            }
        })

        // 分頁數字
        for (var i = 1; i <= pageNum + 1; i++) {
            $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)



            var strActive = ((i == 1) ? ' active' : '')
            $li = $('<li>').attr('class', 'page-item' + strActive).append($a)
            $li_1 = $li.addClass('p' + i);
            $('#page-number').append($li_1)

            $li_1.on('click', function() {
                var i = $(this).text()
                if (i == 1) {
                    $li_.addClass('disabled')
                } else if (i == lastPage) {
                    $rli.addClass('disabled')
                } else {
                    $rli.removeClass('disabled')
                    $li_.removeClass('disabled')
                }

                if ($('.page-item').hasClass('active')) {
                    $('.page-item').removeClass('active')
                }
                $('.p' + i).addClass('active');
                showItems(Number(i))

            })
        }

        $ra = $('<a>').attr('class', 'page-link').attr('href', '#').text('»')
        $rli = $('<li>').attr('class', 'page-item').append($ra)
        $('#page-number').append($rli)
        $rli.click(function() {
            for (var i = 1; i < lastPage; i++) {
                if ($('.p' + i).hasClass('active')) {
                    $('.p' + (i + 1)).addClass('active')
                    $('.p' + i).removeClass('active')
                    $li_.removeClass('disabled')
                    showItems(Number(i) + 1)
                    if (i == (lastPage - 1)) {
                        $rli.addClass('disabled')
                    }
                    break;
                }
            }
        })
    }


    $.get('https://js.kchen.club/B05310001/query', function(response) {
        if (response) {
            // 伺服器有回傳資料
            if (response.result) {
                // 資料庫有回傳資料
                items = response.items

                newPage(items.length)
                showItems(1)
                    //for (var i = 0; i < items.length; i++) {
                    //    newItem(items[i])
            } else {
                $('#message').text('查無相關資料')
                $('#dialog').modal('show')
            }
        } else {
            $('#message').text('伺服器出錯')
            $('#dialog').modal('show')
        }
    }, "json")


    $('.add').on('click', function() {

        // 取得商品資料
        var data = {
            item: {
                name: $('#InputName').val(),
                price: Number($('#InputPrice').val()),
                count: +$('#InputCount').val(),
                image: $('#InputImage').val(),
            }
        }


        // 新增商品
        $.post('https://js.kchen.club/B05310001/insert', data, function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#message').text('新增成功')
                    alert("新增成功")

                    console.log(response.item)
                        //location.reload();
                        //$('#dialog').modal('show')
                } else {
                    $('#message').text('新增失敗')
                    console.log(response.message)
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }
        })

    })

})