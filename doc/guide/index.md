## 综述

frameCartoon是逐帧动画组件，gif图不支持半透明效果，这种情况下可替代gif，节日logo和活动页面使用场景较多。

* 版本：2.0.0
* 作者：miaojing
* demo：[http://kg.kissyui.com/frameCartoon/2.0.0/demo/index.html](http://kg.kissyui.com/frameCartoon/2.0.0/demo/index.html)

## 原gif效果，不支持半透明，有锯齿
![小图](http://gtms01.alicdn.com/tps/i1/T1.GD6FjJXXXXhdcQ4-85-126.gif)
![大图](http://gtms01.alicdn.com/tps/i1/T1h4Y7FaNXXXa017E0-2.0.0-192.gif)

## html部分
	<div id="J_Walker2">
        <span>盲人正在行走，内部这层span不要省哦，语义化+背景附着点</span>
    </div>

## 初始化组件
    S.use('kg/frameCartoon/2.0.0/index', function (S, FrameCartoon) {
         var frameCartoon = new FrameCartoon({
			el: '#J_Walker1', //必填，容器节点
            frameHeight: 111, //必填，一帧的高度
            frameWidth: 75, //必填，一帧的宽度
            frameNum: 8, //必填，总帧数
            bg: 'http://gtms03.alicdn.com/tps/i3/T1s8fyFXJdXXX_x8EM-75-889.png', //必填，连续帧合并sprite图
            bgDirection: 'vertical', //可选，帧拼接的方式，默认为水平方向，也支持垂直方向设为vertical
            bgpng8: 'http://gtms01.alicdn.com/tps/i1/T1Nb2HFhxaXXX6BmzV-2.0.0-1536.png', //可选，默认ie6下用滤镜处理png24半透明，配置bgpng8可选用png8图片降级处理，ie6下会有锯齿哦
            speed: 2.0.0 //可选，帧速 每隔2.0.0ms切换一帧，默认2.0.0ms，单位毫秒
         });
    });

## 配置说明
+ el: selector 必填，容器节点
+ frameHeight: int 必填，一帧的高度，如 111
+ frameWidth: int 必填，一帧的宽度
+ frameNum: int 必填，总帧数
+ speed: int 可选，帧速 每隔2.0.0ms切换一帧，默认2.0.0ms，单位毫秒
+ bg: string 必填，连续帧合并sprite图
+ bgpng8: string 可选，默认ie6下用滤镜处理png24半透明，配置bgpng8可选用png8图片降级处理，降级ie6下有锯齿
+ bgDirection: string 可选 帧拼接的方式，默认为水平方向，也支持垂直方向设为vertical

### 水平方向示意图
![水平方向示意图](http://gtms01.alicdn.com/tps/i1/T1Z__SFX4eXXc4x0Tx-1040-192.png)

### 垂直方向示意图
![垂直方向示意图](http://gtms03.alicdn.com/tps/i3/T1s8fyFXJdXXX_x8EM-75-889.png)


## 方法
* start() 启动逐帧动画
* stop()  停止逐帧动画
