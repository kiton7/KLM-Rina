document.addEventListener('DOMContentLoaded', function() {
    // 取消选择行为
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    })
    $('#k-newemoji').on('click', function() {
        $('#main-left-main-newemoji').empty();
        $('#main-left-main-newemoji').html(`<div class="newemoji-left">
        <div class="newemoji-error-info"></div>
        <button class="newemoji-btn" data-toggle="modal" data-target="#newemoji">选择led（话说尺寸是不是太大了？）</button>
        <div class="newemoji-img"></div>
    </div>
    <div class="newemoji-right">
        <ul class="newemoji-cl">
            <li class="newemoji-cl-item">
                R:
                <div class="r-box">
                    <div></div>
                </div>
                <input type="number" name="r" class="r">
            </li>
            <li class="newemoji-cl-item">
                G:
                <div class="g-box">
                    <div></div>
                </div>
                <input type="number" name="g" class="g">
            </li>
            <li class="newemoji-cl-item">
                B:
                <div class="b-box">
                    <div></div>
                </div>
                <input type="number" name="b" class="b">
            </li>
            <li class="newemoji-cl-item">
                L:
                <div class="l-box">
                    <div></div>
                </div>
                <input type="number" name="l" class="l">
            </li>
        </ul>
        <div class="newemoji-info">
            <ul>
                <li>表情名：<input type="text" name="ename" placeholder="请输入表情名" class="ename"></li>
                <li><button class="save-emoji-btn">保存</button></li>
            </ul>
        </div>
    </div>`);
        $('.newemoji-cl-item').on('mousedown', 'div', function(e) {
            getval();
            // 获取父盒子距页面左边距的值
            var f_pagex = $(this).offset().left;
            // 获取开始时距页面左边距值
            var bpagex = e.pageX;
            // 获取每份的值
            size = $(this).width() / 255;
            // 计算出并设置当前宽度
            var n_w = Math.floor((bpagex - f_pagex) / size);;
            $(this).siblings('input').val(n_w);
            $(this).children('div').width(bpagex - f_pagex + 'px');
            // 获取子盒子的宽度
            var b_s_w = $(this).children('div').width();
            var f_box = $(this);
            getval();
            $(document).on('mousemove', function(e) {
                // 移动的距离
                var m_pagex = e.pageX - bpagex;
                var s_w = b_s_w + m_pagex;
                var b_v = Math.floor(s_w / size);
                if (b_v >= 0 && b_v <= 255) {
                    f_box.children('div').width(s_w + 'px');
                    f_box.siblings('input').val(b_v);
                    getval();
                };
            });
            $(document).on('mouseup', function() {
                $(this).off('mousemove');
            });
        });


        $('.newemoji-cl-item').on('touchstart', 'div', function(e) {
            getval();
            // 获取父盒子距页面左边距的值
            var f_pagex = $(this).offset().left;
            // 获取开始时距页面左边距值
            var bpagex = e.targetTouches[0].pageX;
            // 获取每份的值
            size = $(this).width() / 255;
            // 计算出并设置当前宽度
            var n_w = Math.floor((bpagex - f_pagex) / size);;
            $(this).siblings('input').val(n_w);
            $(this).children('div').width(bpagex - f_pagex + 'px');
            // 获取子盒子的宽度
            var b_s_w = $(this).children('div').width();
            var f_box = $(this);
            getval();
            $(document).on('touchmove', function(e) {
                // 移动的距离
                var m_pagex = e.targetTouches[0].pageX - bpagex;
                var s_w = b_s_w + m_pagex;
                var b_v = Math.floor(s_w / size);
                if (b_v >= 0 && b_v <= 255) {
                    f_box.children('div').width(s_w + 'px');
                    f_box.siblings('input').val(b_v);
                    getval();
                };
            });
            $(document).on('touchend', function() {
                $(this).off('touchmove');
            });
        });

        $('.newemoji-cl-item>div').siblings('input').on('change', function() {
            // console.log(size);
            if ($(this).val() >= 0 && $(this).val() <= 255) {
                $(this).siblings('div').children('div').css('width', $(this).val() * size + 'px');
                getval();
            } else {
                $(this).val(0)
                $(this).siblings('div').children('div').css('width', $(this).val() * size + 'px');
                getval();
            };
        });
        var result = {
            r: 0,
            g: 0,
            b: 0,
            l: 0
        };
        $('.save-emoji-btn').on('click', function() {
            // console.log(ledarr);
            if (ledarr.length == 0) {
                $('.newemoji-error-info').show().text('请先选择led!');
                return;
            } else if (result.l == 0) {
                $('.newemoji-error-info').show().text('亮度不能为0!');
                return;
            } else if ($('.ename').val() == '') {
                $('.newemoji-error-info').show().text('表情名不能为空!');
                return;
            } else {
                $('.newemoji-error-info').show().text('发送成功!');
                var data = {
                    ledarr: ledarr,
                    r: result.r,
                    g: result.g,
                    b: result.b,
                    l: result.l,
                    ename: $('.ename').val(),
                    img: $('#main-left-main-newemoji .newemoji-img').children('canvas')[0].toDataURL("image/png")
                };
                $.ajax({
                    url: '/admin/addemoji',
                    method: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: function(res) {
                        if (res == 'ok' || res == '该表情已存在') {
                            $('.newemoji-error-info').show().text(res)
                        } else {
                            location.assign('/admin/login');
                        }
                    }
                })
            };
        });

        function getval() {
            result = {
                r: Number($('.r').val()),
                g: Number($('.g').val()),
                b: Number($('.b').val()),
                l: Number($('.l').val())
            }
            $('.newemoji-cl-item>div>div').css('backgroundColor', 'rgb(' + result.r + ',' + result.g + ',' + result.b + ')');
            $('.choose').css('backgroundColor', 'rgb(' + result.r + ',' + result.g + ',' + result.b + ')');
        };
        $('.resetbtn').click();
    });

    // 新建一个空数组
    var ledarr = [];
    // 利用事件委派给每个led li添加点击事件
    $('.emoji-box').on('click', 'li', function() {
        $(this).css('backgroundColor', '#ccc');
        // 切换choose类
        $(this).toggleClass('choose');
        getval();
        // 获取当前led li 的led编号
        var lednum = Number($(this).attr('data-led'));
        // res变量用于接收ledarr数组查询当前led li 的返回结果
        var res = ledarr.indexOf(lednum);
        // 如果ledarr中不含有当前li就将当前li的led编号添加到数组中
        if (res == -1) {
            ledarr.push(lednum);
            // 如果有就从数组中删除当前li的led编号
        } else {
            ledarr.splice(res, 1);
        }
    });
    // 给重置按钮添加点击事件
    $('.resetbtn').on('click', function() {
        // 所有led li的背景颜色改为# ccc并移除choose类
        $('.emoji-box li').css('backgroundColor', '#ccc');
        $('.emoji-box li').removeClass('choose');
        // ledarr数组清空
        ledarr = [];
    });

    $('#newemoji .save').on('click', function() {
        $('.resetbtn').hide();
        window.pageYoffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        html2canvas(document.querySelector(".emoji-box")).then(canvas => {
            $('#main-left-main-newemoji .newemoji-img').empty();
            $('#main-left-main-newemoji .newemoji-img').append(canvas);
            $('.resetbtn').show();
            $('#newemoji .close').click();
        });
    });

    function getval() {
        result = {
            r: Number($('.r').val()),
            g: Number($('.g').val()),
            b: Number($('.b').val()),
            l: Number($('.l').val())
        }
        $('.newemoji-cl-item>div>div').css('backgroundColor', 'rgb(' + result.r + ',' + result.g + ',' + result.b + ')');
        $('.choose').css('backgroundColor', 'rgb(' + result.r + ',' + result.g + ',' + result.b + ')');
    };
})