/**
 * @fileoverview 
 * @author miaojing<miaojing@taobao.com>
 * @module frameCartoon
 **/
KISSY.add(function (S, Node, Anim) {
    var EMPTY = '';
    var $ = Node.one;

    function FrameCartoon(comConfig) {
        var self = this;
        //调用父类构造函数
        //FrameCartoon.superclass.constructor.call(self, comConfig);
        self.el = S.isPlainObject(comConfig) ? $(comConfig.el) : $(comConfig);
        self.frameNum = comConfig.frameNum || 8;
        self.speed = comConfig.speed || 150;
        self.step = comConfig.step || 65;
        self.frameWidth = comConfig.frameWidth || 130;
        self.frameHeight = comConfig.frameHeight || 192;
        self.times = 0;
        self.isRunning = true;
        self._initStyle(comConfig.direction);
        //self.start();
    }

    S.augment(FrameCartoon, {
        _initStyle: function(direction) {
            var self = this;
            var el = self.el;
            var bgUrlPropName = direction === 'left' ? 'data-bg-left' : 'data-bg';
            var bgUrl = el.attr(bgUrlPropName);
            //ie6不支持png24半透明
            if(S.UA.ie < 7) {
                bgUrl = el.attr(bgUrlPropName + '-png8') || bgUrl;
            }

            var cssObj = {
                position: 'absolute',
                overflow: 'hidden',
                height: self.frameHeight + 'px',
                width: self.frameWidth + 'px',
                backgroundImage: 'url(\"' + bgUrl + '\")'
            };
            el.css(cssObj);
        },
        /**
         * start 开始卡通
         * @return 
         */
        start: function() {

            var self = this;

            if(!this.isRunning){return;}
            //var key = 'walker-frame';
            //self.el.replaceClass(key + self.timer, key + (self.timer + 1));
            var topValue = self.times * self.frameHeight;
            self.el.css('backgroundPosition', '0 -' + topValue + 'px');
            setTimeout(function() {
                if(self.times == self.frameNum - 1) {
                    self.times = 0;
                } else {
                    self.times ++
                }
                self.start();
            }, self.speed);
        },
        /**
         * open 打开卡通动画
         * @return
         */
        open: function() {
            this.isRunning = true;
        },
        /**
         * stop 停止卡通动画
         * @return
         */
        stop: function() {
            this.isRunning = false;
        },
        /**
         * move 卡通动画运动
         * @param {int} top [top值]
         * @param {int} left [left值] 
         * @param {string} direction [left|right] [往左走|往右走]
         * @param {function} callback [动画执行玩后的回调]
         * @return 
         */
        move: function(top, left, direction, callback) {
            var self = this;
            self._initStyle(direction);
            self.open();
            //self.start();
            var el = self.el;
            var oldPositionTop = el.css('top');
            var oldPositionLeft = el.css('left');
            oldPositionTop = oldPositionTop? parseInt(oldPositionTop) : 0;
            oldPositionLeft = oldPositionLeft? parseInt(oldPositionLeft) : 0;
            var obj = { 'top' : top + 'px', 'left' : left};
            //对角线的距离
            var distance = Math.sqrt(Math.pow((top - oldPositionTop), 2)  + Math.pow(left - oldPositionLeft), 2);
            var time = distance/self.step;
            el.animate(obj, time, 'easeNone', callback);
        }
    });
    return FrameCartoon;
}, {requires:['node', 'anim']});



