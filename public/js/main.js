$(function() {
    template.defaults.imports.indexOf = function(arr, doc) {
        // console.log(arr);
        // console.log(doc);
        return arr.indexOf(doc);
    };
    var choose = $('#KLM-choose').val();
    $('#KLM-choose').on('change', function() {
        choose = $(this).val();
        if (choose == 'all') {
            $('#allemoji').text('所有表情');
            $('#allana').text('所有方案');
        } else if (choose == 'my') {
            $('#allemoji').text('我的表情');
            $('#allana').text('我的方案');
        } else if (choose == 'love') {
            $('#allemoji').text('收藏的表情');
            $('#allana').text('收藏的方案');
        } else {
            $('#allemoji').text('未知错误');
            $('#allana').text('未知错误');
        }
    });

    //所有表情按钮点击获取所有表情
    $('#allemoji').on('click', function() {
        //清空表情列表盒子所有内容
        $('.emojilist-box').empty()
        $('.close-btn').off();
        $('.love-btn').off();
        $('#main-left-main-emojilist').off('click', '.send-e');
        $.ajax({
            url: '/admin/getemoji',
            method: 'get',
            data: `page=1&choose=${choose}`,
            success: function(res) {
                if (res != '/admin/login') {
                    var html = template('m-emojilist-item', {
                        data: res
                    });
                    //将拼接好的字符串填充
                    $('.emojilist-box').append(html);
                    $('#main-left-main-emojilist .before').attr('data-page', res.page > 1 ? res.page - 1 : 1);
                    $('#main-left-main-emojilist .next').attr('data-page', res.page < res.pages ? parseInt(res.page) + 1 : parseInt(res.page));
                    $('#main-left-main-emojilist').on('click', '.send-e', function() {
                        var data = {
                            id: $(this).attr('data-id')
                        };
                        $.ajax({
                            url: '/admin/sende',
                            method: 'post',
                            data: JSON.stringify(data),
                            contentType: 'application/json',
                            success: function(res) {
                                if (res == 'ok') {
                                    alert('发送成功');
                                } else {
                                    location.assign(res);
                                }
                            }
                        })
                    });
                    $('.close-btn').on('click', function() {
                        $(this).parent().remove();
                    });
                    $('.love-btn').on('click', function() {
                        var thisbtn = $(this);
                        var data = {
                            id: $(this).attr('data-id')
                        };
                        $.ajax({
                            url: '/admin/loveemoji',
                            method: 'post',
                            data: JSON.stringify(data),
                            contentType: 'application/json',
                            success: function(res) {
                                if (res == 'delok') {
                                    thisbtn.text('收藏')
                                } else if (res == 'addok') {
                                    thisbtn.text('取消收藏')
                                } else {
                                    location.assign(res);
                                }
                            }
                        })
                    });
                } else {
                    location.assign(res);
                }
            }
        })
    });
    $('#main-left-main-emojilist .change-page').on('click', 'div', function() {
        // console.log(html);
        $('.emojilist-box').empty()
        $('.close-btn').off();
        $('.love-btn').off();
        $('#main-left-main-emojilist').off('click', '.send-e');
        $.ajax({
            url: '/admin/getemoji',
            method: 'get',
            data: `page=${$(this).attr('data-page')}&choose=${choose}`,
            success: function(res) {
                // console.log(res);
                var html = template('m-emojilist-item', {
                    data: res
                });
                $('.emojilist-box').append(html);
                $('#main-left-main-emojilist .before').attr('data-page', res.page > 1 ? res.page - 1 : 1);
                $('#main-left-main-emojilist .next').attr('data-page', res.page < res.pages ? parseInt(res.page) + 1 : parseInt(res.page));
                $('.close-btn').on('click', function() {
                    $(this).parent().hide();
                });
                $('.love-btn').on('click', function() {
                    var thisbtn = $(this);
                    var data = {
                        id: $(this).attr('data-id')
                    };
                    $.ajax({
                        url: '/admin/loveemoji',
                        method: 'post',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        success: function(res) {
                            if (res == 'delok') {
                                thisbtn.text('收藏')
                            } else if (res == 'addok') {
                                thisbtn.text('取消收藏')
                            } else {
                                location.assign(res);
                            }
                        }
                    })
                });
            }
        })
    });
    $('#allana').on('click', function() {
        $('.animationlist-box').empty();
        $('.close-btn').off();
        $('.love-btn').off();
        $('#main-left-main-animationlist').off('click', '.send-a');
        $.ajax({
            url: '/admin/getana',
            method: 'get',
            data: `page=1&choose=${choose}`,
            success: function(res) {
                if (res != '/admin/login') {
                    var html = template('m-analist-item', {
                        data: res
                    });
                    $('.animationlist-box').append(html);
                    $('#main-left-main-animationlist .before').attr('data-page', res.page > 1 ? res.page - 1 : 1);
                    $('#main-left-main-animationlist .next').attr('data-page', res.page < res.pages ? parseInt(res.page) + 1 : parseInt(res.page));
                    $('.close-btn').on('click', function() {
                        $(this).parent().remove();
                    });
                    $('.love-btn').on('click', function() {
                        var thisbtn = $(this);
                        var data = {
                            id: $(this).attr('data-id')
                        };
                        $.ajax({
                            url: '/admin/loveana',
                            method: 'post',
                            data: JSON.stringify(data),
                            contentType: 'application/json',
                            success: function(res) {
                                if (res == 'delok') {
                                    thisbtn.text('收藏')
                                } else if (res == 'addok') {
                                    thisbtn.text('取消收藏')
                                } else {
                                    location.assign(res);
                                }
                            }
                        })
                    });
                    $('.show-a').on('click', function() {
                        var thisbtn = $(this);
                        var data = {
                            id: $(this).attr('data-id')
                        };
                        $.ajax({
                            url: '/admin/showana',
                            method: 'post',
                            data: JSON.stringify(data),
                            contentType: 'application/json',
                            success: function(res) {
                                console.log(res);
                                var time = 0;

                                function setLed(time, i) {
                                    console.log(res.earr[i].img);
                                    setTimeout(function() {
                                        thisbtn.siblings('.animationlist-img').find('img').prop('src', res.earr[i].img);
                                    }, time)
                                };
                                for (var i = 0; i < res.earr.length; i++) {
                                    if (i < res.earr.length - 1) {
                                        var q = i + 1
                                    } else {
                                        q = i;
                                    }
                                    setLed(time, i);
                                    time += res.tarr[i];
                                }
                            }
                        })
                    })
                    $('#main-left-main-animationlist').on('click', '.send-a', function() {
                        $('.send-btn').attr('disabled', true);
                        // console.log(1);
                        var data = {
                            id: $(this).attr('data-id')
                        };
                        $.ajax({
                            url: '/admin/senda',
                            method: 'post',
                            data: JSON.stringify(data),
                            contentType: 'application/json',
                            success: function(res) {
                                // console.log(res);
                                if (res.msg == 'ok') {
                                    // $('.send-btn').attr('disabled', true);
                                    $('.send-btn').css('cursor', 'wait')
                                    setTimeout(function() {
                                        $('.send-btn').attr('disabled', false);
                                        $('.send-btn').css('cursor', 'default')
                                    }, res.alltime)
                                    alert('发送成功');
                                    // console.log(res.alltime);
                                } else {
                                    // console.log(res);
                                    location.assign(res);
                                }
                            }
                        });
                    });
                } else {
                    location.assign(res);
                }
            }
        })
    });
    $('#main-left-main-animationlist .change-page').on('click', 'div', function() {
        $('.animationlist-box').empty();
        $('.close-btn').off();
        $('.love-btn').off();
        $('#main-left-main-animationlist').off('click', '.send-a');
        $.ajax({
            url: '/admin/getana',
            method: 'get',
            data: `page=${$(this).attr('data-page')}&choose=${choose}`,
            success: function(res) {
                // console.log(res);
                var html = template('m-analist-item', {
                    data: res
                });
                // console.log(html);
                $('.animationlist-box').empty()
                $('.animationlist-box').append(html);
                $('#main-left-main-animationlist .before').attr('data-page', res.page > 1 ? res.page - 1 : 1);
                $('#main-left-main-animationlist .next').attr('data-page', res.page < res.pages ? parseInt(res.page) + 1 : parseInt(res.page));
                $('.close-btn').on('click', function() {
                    $(this).parent().hide();
                });
                $('.love-btn').on('click', function() {
                    var thisbtn = $(this);
                    var data = {
                        id: $(this).attr('data-id')
                    };
                    $.ajax({
                        url: '/admin/loveana',
                        method: 'post',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        success: function(res) {
                            if (res == 'delok') {
                                thisbtn.text('收藏')
                            } else if (res == 'addok') {
                                thisbtn.text('取消收藏')
                            } else {
                                location.assign(res);
                            }
                        }
                    })
                });
            }
        })
    });
})