$(function() {
    // 修改用户
    $('#user-change-btn').on('click', function() {
        var data = {};
        data.uname = $('#nuname').val();
        if ($('#cpwd1').val() == $('#cpwd2').val()) {
            data.upwd = $('#cpwd1').val();
        } else {
            $('.alert-danger').show().text('两次密码不一致');
            return;
        }
        data.role = $('#nrole').val();
        data.topic = $('#ctopic').val();
        if (data.uname.trim() == '') {
            $('.alert-danger').show().text('用户名不能为空');
            return;
        };
        if (data.upwd.trim() == '') {
            $('.alert-danger').show().text('密码不能为空');
            return;
        };
        if (data.role.trim() == '') {
            $('.alert-danger').show().text('用户角色不能为空');
            return;
        };
        if (data.topic.trim() == '') {
            $('.alert-danger').show().text('用户主题不能为空');
            return;
        };
        data.uid = $(this).attr('data-uid');
        $.ajax({
            url: '/admin/changeuser',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(res) {
                $('.alert-danger').show().text(res);
            }
        });
    });

    // 添加用户
    $('#adduser').on('click', function() {
        var data = {};
        data.uname = $('#uname').val();
        data.upwd = $('#upwd').val();
        data.role = $('#role').val();
        data.topic = $('#topic').val();
        if (data.uname.trim() == '') {
            $('.alert-danger').show().text('用户名不能为空');
            return;
        };
        if (data.upwd.trim() == '') {
            $('.alert-danger').show().text('密码不能为空');
            return;
        };
        if (data.role.trim() == '') {
            $('.alert-danger').show().text('用户角色不能为空');
            return;
        };
        if (data.topic.trim() == '') {
            $('.alert-danger').show().text('用户主题不能为空');
            return;
        };

        $.ajax({
            url: '/admin/adduser',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(res) {
                $('.alert-danger').show().text(res);
            }
        })
    })

    // 删除操作
    $('.tab-pane').on('click', '.glyphicon-remove', function() {
        var f = $(this).parents('.tab-pane');
        var flag = f.prop('id');
        var url = '';
        var $this = $(this);
        if (flag == 'users') {
            url = '/admin/deluser';
        } else if (flag == 'emojis') {
            url = '/admin/delemoji';
        } else if (flag == 'animations') {
            url = '/admin/delana';
        };
        var data = {
            id: $(this).attr('data-id')
        };
        // console.log(data);
        $.ajax({
            url: url,
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(res) {
                // console.log(res);
                if (res == 'ok') {
                    var strings = $this.parents('.tab-pane').attr('id');
                    if (strings == 'animations') {
                        $('#analist').click();
                    } else {
                        $(`#${strings.substr(0, strings.length - 1)}list`).click();
                    }
                }
            }
        })
    })
    $('#emojilist').on('click', function() {
        $.ajax({
            url: '/admin/getemoji',
            method: 'get',
            data: 'page=1&choose=all',
            success: function(res) {
                var html = template('emojiss', {
                    data: res
                });
                $('#emojis').find('tbody').empty();
                $('#emojis').find('tbody').append(html);
                $('#emojis .before').attr('data-page', res.page > 1 ? res.page - 1 : 1);
                $('#emojis .next').attr('data-page', res.page < res.pages ? res.page + 1 : res.page);
            }
        })
    });
    $('#analist').on('click', function() {
        $.ajax({
            url: '/admin/getana',
            method: 'get',
            data: 'page=1&choose=all',
            success: function(res) {
                var html = template('anass', {
                    data: res
                });
                $('#animations').find('tbody').empty();
                $('#animations').find('tbody').append(html);
                $('#animations .before').attr('data-page', res.page > 1 ? res.page - 1 : 1);
                $('#animations .next').attr('data-page', res.page < res.pages ? res.page + 1 : res.page);
            }
        })
    });

    $('#userlist').on('click', function() {
        $.ajax({
            url: '/admin/getuser',
            method: 'get',
            data: 'page=1',
            success: function(res) {
                // console.log(res);
                var html = template('userss', {
                    data: res
                });
                // console.log(html);
                $('#users').find('tbody').empty();
                $('#users').find('tbody').append(html);
                $('#users .before').attr('data-page', res.page > 1 ? res.page - 1 : 1);
                $('#users .next').attr('data-page', res.page < res.pages ? res.page + 1 : res.page);
            }
        })
    });
    $('#users .pagination').on('click', 'a', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/admin/getuser',
            method: 'get',
            data: `page=${$(this).attr('data-page')}&choose=all`,
            success: function(res) {
                // console.log(res);
                var html = template('userss', {
                    data: res
                });
                // console.log(html);
                $('#users').find('tbody').empty();
                $('#users').find('tbody').append(html);
                $('#users .before').attr('data-page', res.page > 1 ? res.page - 1 : 1);
                $('#users .next').attr('data-page', res.page < res.pages ? res.page + 1 : res.page);
            }
        })
    });
    $('#emojis .pagination').on('click', 'a', function(e) {
        // console.log(1);
        e.preventDefault();
        $.ajax({
            url: '/admin/getemoji',
            method: 'get',
            data: `page=${$(this).attr('data-page')}&choose=all`,
            success: function(res) {
                var html = template('emojiss', {
                    data: res
                });
                $('#emojis').find('tbody').empty();
                $('#emojis').find('tbody').append(html);
                $('#emojis .before').attr('data-page', res.page > 1 ? res.page - 1 : 1);
                $('#emojis .next').attr('data-page', res.page < res.pages ? res.page + 1 : res.page);
            }
        })
    });
    $('#animations .pagination').on('click', 'a', function(e) {
        // console.log(1);
        e.preventDefault();
        $.ajax({
            url: '/admin/getana',
            method: 'get',
            data: `page=${$(this).attr('data-page')}&choose=all`,
            success: function(res) {
                var html = template('anass', {
                    data: res
                });
                $('#animations').find('tbody').empty();
                $('#animations').find('tbody').append(html);
                $('#animations .before').attr('data-page', res.page > 1 ? res.page - 1 : 1);
                $('#animations .next').attr('data-page', res.page < res.pages ? res.page + 1 : res.page);
            }
        })
    });
})