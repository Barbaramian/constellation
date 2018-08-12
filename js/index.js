// 入口函数
var value;
var time;
var root = window.star;
var star;
var dataList;
var flag;
var starName = true;
var starNum = 1;
// getData("https://api.shenjian.io/constellation/", 'today');

// 匹配value值
function match() {
    // 正则匹配输入的星座名称 什么座
    var reg = /^[\u2E80-\u9FFF]{2}\u5ea7$/g;
    $('input').on('input', function () {
        var val = $('input').val();
        value = val;
        if (value != "") {
            if (reg.test(value)) {
                // 匹配成功 
                $('input').css({
                    "border": "1px solid #000",
                    "box-shadow": "none"
                });
                getData("https://api.shenjian.io/constellation/", 'today');
                flag = true;
            } else {
                $('input').css({
                    "border": "1px solid rgba(205,51,51,0.5)",
                    "box-shadow": "0px 0px 1px 1px rgba(205,51,51,0.4)"
                });
                flag = false;
            }
        }
    }).on('blur', function () {
        if (value == "") {
            flag = false;
        }
    })
}
match();
// 事件
function bindEvent() {
    $('.submit').on('click', function () {
        if (flag) {
            $('.start-page').css({
                "display": 'none'
            });
            $('.play-page').css({
                "display": 'block'
            });
            $('body').css({
                'overflow': 'auto',
                // 'height': $('body').height()
            });
        } else {
            // 没有输入星座提示
            if (!value) {
                alert('请在输入框内输入相应的星座')
                flag = false;
            }else if (starName) {
                // 星座名字填错提示
                alert('请输入类似于"巨蟹座"三个字的正确星座名称哦~');
                flag = false;
            } else {
                // 填错小提示
                if (starNum == 3){
                    alert('3次了！！！(╬￣皿￣)  你是认真的吗？？！！');
                    flag = false;
                } else if (starNum == 5){
                    alert("这都是你夜观天象发现的星座吗？？？！！")
                    flag = false;
                } else if (starNum == 7) {
                    alert("我的极限到了！！并不想理你！！GO AWAY!!!");
                    flag = false;
                }else if (starNum == 10) {
                    alert("你走开！！你的运势不会好起来了！！我拒绝你的访问！！拜拜！！");
                    $('body').css({
                        display: 'none'
                    });
                }else{
                    alert("这是啥星座？？仔细查看是不是有错字诶");
                    flag = false;
                }
                starNum++;
            }
        }
        
    })
    $('.choose').on('click', function (e) {
        time = $(e.target).attr('time');
        // console.log(time);
        if (!$('.choose').find($('.' + time)).hasClass('active')) {
            $('.active').removeClass('active');
            // $('.active').css({display:'none'});
            $('.choose .' + time).addClass('active');
            $('.des .' + time).addClass('active');
            getData("https://api.shenjian.io/constellation/", time);
            // console.log()
            // 添加history  不重新刷新网页
            url = '?' + time;
            window.history.pushState({
                time: time,
                dataList: dataList
            }, null, url);
        }
    })
    // 读取history 不重新刷新网页
    window.addEventListener('popstate', function (e) {
        time = e.state.time;
        dataList = e.state.dataList;
        $('.active').removeClass('active');
        $('.choose .' + time).addClass('active');
        $('.des .' + time).addClass('active');
        star.render(dataList, time);
    }, false);
}
bindEvent();
// jsonP跨域
function getData(url, time) {
    var ask = time + "/?appid=47d76217f190f94bb7a8cd50d50f1b4c&constellation=" + encodeURI(value);
    $.ajax({
        type: "GET",
        url: url + ask,
        dataType: "jsonp",
        success: function (data) {
            dataList = data.data;
            if (data.error_code == 114) {
                flag = false;
                starName = false;
            } else if (data.error_code == 0) {
                $('.loading').css({
                    display: 'none'
                })
                $('.des .active').css({
                    display: 'block'
                })
                star.render(dataList, time);
                flag = true;
            }
        },
        beforeSend: function () {
            $('.loading').css({
                display: 'block'
            });
            $('.des>div:eq(1),.des>div:eq(2),.des>div:eq(3),.des>div:eq(4)').css({
                display: 'none'
            })
        }
        // error: function () {
        //     console.log('aa')
        //     // 失败原因：网络问题
        //     alert("抱歉，当前网络不太好，请稍后重试，斯密码森 ( ･´ω`･ )");
        //     // 无可相应的数据：星座名字填错，不在12星座内
        // }
    })

}