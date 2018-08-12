// 渲染play-page
(function (root) {
    function renderHeader(data) {
        $('.name').text(data.constellation);
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var oDate = year + '年' + month + '月' + day + '日';
        $('.date').text(oDate);
    }
    var dayEmpty = true;
    var weekEmpty = true;
    var monthEmpty = true;
    var yearEmpty = true;

    function renderDes(data, time) {
        if (time == 'today') {
            if (dayEmpty) {
                // 综合指数
                var num = parseInt(data.fate_data[0].value) / 5 * 100 + '%';
                $('.num').text(num);
                // 各个指数
                var len = data.fate_data.length;
                for (var i = 1; i < len; i++) {
                    var str = '<div class="con">\
             <h3> ' + data.fate_data[i].name + ' </h3>\
             <span> ' + data.fate_data[i].value + ' </span>\
             </div>';
                    $('.doc').append($(str));
                }
                dayEmpty = false;
            }
            // 今日概述插入
            var summery = data.analysis;
            $('.summery>p').text(summery);
        } else if (time == 'week') {
            if (weekEmpty) {
                // 各个指数
                var len = data.analysis.length;
                for (var i = 0; i < len; i++) {
                    var str = '<div class="con">\
             <h3>' + data.analysis[i].name + '</h3>\
             <span>' + data.analysis[i].value + '</span>\
             </div>';
                    $('.week').append($(str));
                }
                weekEmpty = false;
            }
        } else if (time == 'month') {
            if (monthEmpty) {
                // 各个指数
                var len = data.analysis.length;
                for (var i = 0; i < len; i++) {
                    var str = '<div class="con">\
             <h3>' + data.analysis[i].name + '</h3>\
             <span>' + data.analysis[i].value + '</span>\
             </div>';
                    $('.month').append($(str));
                }
                monthEmpty = false;
            }
        } else if (time == 'year') {
            if (yearEmpty) {
                // 各个指数
                var len = data.analysis.length;
                for (var i = 0; i < len; i++) {
                    var str = '<div class="con">\
             <h3>' + data.analysis[i].name + '</h3>\
             <span>' + data.analysis[i].value + '</span>\
             </div>';
                    $('.year').append($(str));
                }
                yearEmpty = false;
            }
        }
    }
    root.render = function (data, time) {
        renderHeader(data);
        renderDes(data, time);
    };

})(window.star || (window.star = {}))