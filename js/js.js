/*
 *code by happyrxk
 *2014/04/06 
 *ppt.js
 */
 var PPT = (function(){
 	var Slider = function(o){
 		this.setting = typeof o === 'object'?o:{};
 		this.target = this.setting.target||'slider';
 		this.autoMs = this.setting.autoMs||3000;
 		this.showList = this.setting.showList||true;
 		this.showControl = this.setting.showControl||true;
 		this.ms = 35;
 		this.currentTimer = null;
 		this.timer = null;
 		this.nextTarget = 0;
 		this.iTarget = 0;
 		this.currentPos = 0;
 		//
 		this.init();
 		this.handleEvent();
 	}
 	Slider.prototype = {
 		init:function(){
 			this.obj = document.getElementById(this.target);
 			this.ul = this.obj.getElementsByTagName("ul")[0];
 			this.lis = this.ul.getElementsByTagName("li");
 			this.width = this.lis[0].offsetWidth;
 			this.number = this.lis.length;
 			this.ul.style.width = this.number*this.width+"px";

 			if(this.showList){
 				var oOl = document.createElement('ol');
 				var olis = [];
 				for(var i=0,len=this.number;i<len;i++){
 					olis.push('<li></li>');
 				}
 				oOl.innerHTML = olis.join(' ');
 				this.obj.appendChild(oOl);
 				this.aLis = this.obj.getElementsByTagName('ol')[0].getElementsByTagName('li');
 				//alert(this.alis);
 				this.aLis[0].setAttribute("class","active");
 				console.log(this.obj.getElementsByTagName('ol')[0].getElementsByTagName('li')[0]);
 				delete oOl;
 			}
 			if(this.showControl){

 			}
 		},
 		handleEvent: function(){
 			var that = this;
 			function setCurrentTimer(){
 				that.currentTimer = setInterval(function(){
 					that.autoPlay();
 				},that.autoMs);
 			}
 			
 			setCurrentTimer();
 			
 			this.addEvent(this.obj,"mouseover",function(){
 				clearInterval(that.currentTimer);
 			});

 			this.addEvent(this.obj,"mouseout",function(){
 				setCurrentTimer();
 			});

 			if(this.showList){
 				function bindListEvent(i){
 					var el = that.aLis[i];
 					that.addEvent(el,"mouseover",function(){
 						that.goTime(i);
 						//alert(i);
 					});
 				}
 				for(var i=0;i<this.number;i++){
 					bindListEvent(i);
 				}
 			}


 		},
 		addEvent: function(el,type,fn){
 			if(window.addEventListener){
 				el.addEventListener(type,fn,false);
 			}else{
 				el.attachEvent("on"+type,fn);
 			}
 		},
 		autoPlay: function(){
 			this.nextTarget++;
 			console.log(this.nextTarget);
 			if(this.nextTarget>=this.number){
 				this.nextTarget=0;
 			}
 			this.goTime(this.nextTarget);
 		},
 		goTime: function(index){
 			var that = this;
 			if(this.showList){
 				for(var i=0;i<this.number;i++){
 					i==index?this.aLis[i].setAttribute('class','active'):this.aLis[i].setAttribute('class','');
 				}
 			}
 			this.iTarget = -index*this.width;
 			if(this.timer){
 				clearInterval(this.timer);
 			}
 			this.timer = setInterval(function(){
 				that.doMove(that.iTarget);
 			},this.ms);

 		},
 		doMove: function(target){
 			this.ul.style.left = this.currentPos+"px";
 			this.currentPos +=(target-this.ul.offsetLeft)/3;
 			console.log(this.currentPos);
 			if(Math.abs(Math.ceil(target-this.ul.offsetLeft))===0){
 				this.ul.style.left = target+"px";
 				clearInterval(this.timer);
 				this.timer =null;
 			}
 			
 		}
 	}

 	return {
 		slider:function(o){
 			new Slider(o);
 		}
 	}
 })();
 PPT.slider();
