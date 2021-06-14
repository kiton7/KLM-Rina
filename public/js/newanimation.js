document.addEventListener('DOMContentLoaded', function() {
    var html = '';
    $('#k-newanimation').on('click', function() {
        $.ajax({
            url: '/admin/getallemoji',
            method: 'get',
            data: `choose=${$('#KLM-choose').val()}`,
            success: function(res) {
                if (!Array.isArray(res)) {
                    location.assign('/admin/login')
                } else {
                    html = template('m-animation', { data: res });
                    $('#main-left-main-newanimation').empty();
                    $('#main-left-main-newanimation').html(`<div class="newanimation-left">
                        <div class="newanimation-show">
                            <img src="" width="100%">
                        </div>
                        <div class="animation-set-box">
                            <ul>
                                <li>
                                    <label>请输入循环次数：<input type="number" class="atimes"></label>
                                </li>
                                <li>
                                    <label>请输入方案名称：<input type="text" class="aname"></label>
                                </li>
                                <li>
                                    <button class="animation-save-btn">保存</button>
                                    <button class="animation-show-btn">预览</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="newanimation-right">
                        <div class="newanimation-error-info"></div>
                        <button class="add-animation-emoji-btn">添加表情</button>
                        <div class="animation-tabs-box">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#e1" data-toggle="tab">1</a></li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active" id="e1">
                                    <ul>
                                        <li>
                                            <h4>请选择1表情</h4>
                                            ${html}
                                        </li>
                                        <li>
                                            <h4>请选择间隔时间(毫秒)</h4>
                                            <input type="number" value="1000">
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`);
                    var i = $('.animation-tabs-box .nav-tabs').children().length;
                    $('.add-animation-emoji-btn').on('click', function() {
                        i += 1;
                        var li = $(`<li><a href="#e${i}" data-toggle="tab">${i}</a></li>`);
                        var content = $(`<div class="tab-pane" id="e${i}">
                        <ul>
                            <li>
                                <h4>请选择${i}表情</h4>
                                ${html}
                            </li>
                            <li>
                                <h4>请选择间隔时间(毫秒)</h4>
                                <input type="number" value="1000">
                            </li>
                        </ul>
                    </div>`);
                        $('.animation-tabs-box>ul').append(li);
                        $('.animation-tabs-box>.tab-content').append(content);
                    });
                    $('.animation-save-btn').on('click', function() {
                        if ($('.atimes').val() == '' || $('.atimes').val() == 0) {
                            $('.newanimation-error-info').show().text('循环次数不能为空或0！');
                            return;
                        } else if ($('.atimes').val() < 0) {
                            $('.newanimation-error-info').show().text('循环次数不能负数！');
                            return;
                        } else if ($('.aname').val() == '') {
                            $('.newanimation-error-info').show().text('方案名不能为空！');
                            return;
                        } else {
                            var ledarr = [];
                            var timearr = [];
                            for (var i = 0; i < $('.animation-tabs-box>ul').children().length; i++) {
                                ledarr[i] = $(`#e${i+1}`).find('select').val();
                                timearr[i] = Number($(`#e${i+1}`).find('input').val());
                            };
                            var data = {};
                            data.earr = ledarr;
                            data.tarr = timearr;
                            data.aname = $('.aname').val();
                            data.looptimes = $('.atimes').val();
                            $.ajax({
                                url: '/admin/addana',
                                method: 'post',
                                contentType: 'application/json',
                                data: JSON.stringify(data),
                                success: function(res) {
                                    if (res == 'ok' || res == '该方案已存在') {
                                        $('.newanimation-error-info').show().text(res);
                                    } else {
                                        location.assign('/admin/login');
                                    }
                                }
                            });
                        }
                    });
                    $('.animation-show-btn').on('click', function() {
                        console.log(1);
                        var timearr = [];
                        var ledarr = [];
                        for (var i = 0; i < $('.animation-tabs-box>ul').children().length; i++) {
                            ledarr[i] = $(`#e${i+1}`).find('select').val();
                            timearr[i] = Number($(`#e${i+1}`).find('input').val());
                        };
                        var data = {};
                        data.earr = ledarr;
                        // console.log(data.earr);
                        $.ajax({
                            url: '/admin/showana',
                            method: 'post',
                            contentType: 'application/json',
                            data: JSON.stringify(data),
                            success: function(res) {
                                var time = 0;

                                function setLed(time, i) {
                                    setTimeout(function() {
                                        $('.newanimation-show img').prop('src', res[i].img)
                                    }, time)
                                };
                                for (var i = 0; i < res.length; i++) {
                                    if (i < res.length - 1) {
                                        var q = i + 1
                                    } else {
                                        q = i;
                                    }
                                    setLed(time, i);
                                    time += timearr[i];
                                }
                            }
                        })
                    });
                }
            }
        });

    });
});