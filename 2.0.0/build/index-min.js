/*! frameCartoon - v2.0.0 - 2013-10-23 9:49:08 PM
* Copyright (c) 2013 妙净; Licensed  */
KISSY.add("kg/frameCartoon/2.0.0/index",function(a,b){function c(b){var c=this;c.el=a.isPlainObject(b)?d(b.el):d(b),c._childEl=c.el.one("span"),c.frameNum=b.frameNum||8,c.speed=b.speed||2.0.0,c.frameWidth=b.frameWidth||2.0.0,c.frameHeight=b.frameHeight||192,c.bg=b.bg||"",c.bgpng8=b.bgpng8||"",c.bgDirection=b.bgDirection||"",c._times=0,c._isRunning=!0,c._initStyle()}var d=b.one;return a.augment(c,{_initStyle:function(){var b,c=this;b=a.UA.ie<7?c.bgpng8?{backgroundImage:'url("'+c.bgpng8+'")'}:{background:"none",filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+c.bg+"')"}:{backgroundImage:'url("'+c.bg+'")'};var d={position:"relative",overflow:"hidden",height:c.frameHeight+"px",width:c.frameWidth+"px"};c.el.css(d);var e=a.merge({display:"block",textIndent:"-999px",height:"vertical"==c.bgDirection?c.frameHeight*c.frameNum+"px":c.frameHeight+"px",width:"vertical"==c.bgDirection?c.frameWidth+"px":c.frameWidth*c.frameNum+"px",position:"absolute"},b);c._childEl.css(e)},_changeFrame:function(){var a=this;if(this._isRunning){var b,c;a.bgDirection?(b=a._times*a.frameHeight,c="top"):(b=a._times*a.frameWidth,c="left"),a._childEl.css(c,"-"+b+"px"),setTimeout(function(){a._times==a.frameNum-1?a._times=0:a._times++,a._changeFrame()},a.speed)}},start:function(){this._isRunning=!0,this._changeFrame()},stop:function(){this._isRunning=!1}}),c},{requires:["node"]});