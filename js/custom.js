(function ($) {
	new WOW().init();
	$("#intro").height(window.innerHeight);
	jQuery(window).load(function() {
		jQuery("#preloader").delay(100).fadeOut(1);
		jQuery("#load").delay(100).fadeOut(1);
	});
	//导航条离页面顶部距离超过50 去掉透明度
	$(window).scroll(function() {
		if ($(".navbar").offset().top > 50) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
		/*
		if($(this).scrollTop()>$("#intro").outerHeight(true)*2){
			$("canvas").hide();
		}else{
			$("canvas").show();
		}
		*/
	});


	//为锚点跳转添加过渡
	$(function() {
		$('.navbar-nav li a,.slogan a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
		$('.page-scroll a,.slogan a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	});
	//$(".slogan h3").css({"margin-top":($("#information").offset().top-$(".slogan h2").offset().top-$(".slogan h2").outerHeight(true))/2});
	//console.log($(".slogan h3"));
	$("li.imgitem").each(function(i){
		$(this).css({
			left:i*16+"em"
		})
	});


})(jQuery);

//图片自动左切换
	var slidePic={
		timer:null,
		interval:200,
		count:0,
		width:15,
		margin:1,
		unit:"em",
		tag:$(".inlineblock>ul"),
		liPos:null,
		moveLeft:function(){
			var ob=this;
			ob.tag.animate({
				left:'-=1' + ob.unit
			},ob.interval,"linear",function(){
				ob.count++;
				if(ob.count==16){
					ob.count=0;
					ob.tag.css({left:0});
					ob.tag.children(":first").appendTo(ob.tag);
					ob.tag.children().each(function(i) {
						$(this).css({
							left: i * (ob.width+ob.margin) +ob.unit
						})
					})
				}
			});
			ob.timer&&(clearTimeout(ob.timer));
			ob.timer=setTimeout(function(){
				ob.moveLeft();
			},ob.interval);
			 /*
			 ob.count++;
			ob.tag.children().each(function(i) {
				$(this).animate({left:'-=1' + ob.unit},ob.interval,"linear")
			});
			ob.timer&&(clearTimeout(ob.timer));
			ob.timer=setTimeout(function(){
				if(ob.count==16){
					ob.count=0;
					ob.tag.children().eq(0).stop().css({left:5*16+"em"}).appendTo(ob.tag);
				}
				ob.moveLeft();
			},ob.interval);

			//return true;
			*/
		},
		startToMove:function(){
			var ob=this;
			ob.liPos=ob.tag.children().eq(1).css('left');
			ob.moveLeft();
			ob.tag.mouseenter(function(){
				clearTimeout(ob.timer)
				ob.timer=null;
			});
			//out 在子元素之间切换也会触发
			ob.tag.mouseleave(function(){
				ob.moveLeft();
			});

		}
	};
	slidePic.startToMove();
	window.slidePic=slidePic;
