/**
 * @fileoverview 
 * @author miaojing<miaojing@taobao.com>
 * @module frameCartoon
 **/
KISSY.add(function (S, Node) {
    var EMPTY = '';
    var $ = Node.one;

    function FrameCartoon(comConfig) {
        var self = this;
        self.el = $(comConfig.el);
        //el内部的child span节点
        self._childEl = self.el.one('span');
        self.frameNum = comConfig.frameNum || 8;
        self.speed = comConfig.speed || 150;
        self.frameWidth = comConfig.frameWidth || 130;
        self.frameHeight = comConfig.frameHeight || 192;
        self.bg = comConfig.bg || '';
        self.bgpng8 = comConfig.bgpng8 || '';
        self.bgDirection = comConfig.bgDirection || ''; 
        self._times = 0;
        self._isRunning = true;
        self._initStyle();
    }

    S.augment(FrameCartoon, {
        _initStyle: function() {
            var self = this, bgObj;
            if(S.UA.ie < 7) {
                //ie6不支持png24半透明，配置了bgpng8则降级使用png8，默认则使用滤镜
                if(self.bgpng8) {
                    bgObj = {backgroundImage: 'url(\"' + self.bgpng8 + '\")'};
                } else {
                    //因为使用filter后无法使用背景图定位，所以改为切换所在容器的定位
                    bgObj = {background:'none',filter:'progid\:DXImageTransform\.Microsoft\.AlphaImageLoader(src=\'' + self.bg + '\')'};
                }
            } else {
                bgObj = {backgroundImage: 'url(\"' + self.bg + '\")'};
            }

            //节点样式
            var cssObj = {
                position: 'relative',
                overflow: 'hidden',
                height: self.frameHeight + 'px',
                width: self.frameWidth + 'px'
            };            
            self.el.css(cssObj);

            //子节点样式
            var cssChildObj = S.merge({
                display: 'block',
                textIndent: '-999px',
                height: self.bgDirection == 'vertical'?  self.frameHeight * self.frameNum + 'px' : self.frameHeight + 'px',
                width: self.bgDirection == 'vertical'? self.frameWidth + 'px' : self.frameWidth * self.frameNum + 'px',
                position: 'absolute'
            }, bgObj);
            self._childEl.css(cssChildObj);
        },
        /**
         * changeFrame 切换背景帧
         * @return 
         */
        _changeFrame: function() {
            var self = this;
            if(!this._isRunning){return;}
            var changeValue, changeProp;
            if(self.bgDirection) {
                changeValue = self._times * self.frameHeight;
                changeProp = 'top';
            } else {
                changeValue = self._times * self.frameWidth;
                changeProp = 'left';
            }
            self._childEl.css(changeProp, '-' + changeValue + 'px');
            setTimeout(function() {
                if(self._times == self.frameNum - 1) {
                    self._times = 0;
                } else {
                    self._times ++
                }
                self._changeFrame();
            }, self.speed);
        },
        /**
         * start 启动逐帧动画
         * @return
         */
        start: function() {
            this._isRunning = true;
            this._changeFrame();
        },
        /**
         * stop 停止逐帧动画
         * @return
         */
        stop: function() {
            this._isRunning = false;
        }
    });
    return FrameCartoon;
}, {requires:['node']});



