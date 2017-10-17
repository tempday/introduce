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

	 /*
	function moveImg(){
		if($("div.imgitem:eq(0)").css('left')<="-16em"){
			$(this).css('left',"0em");
		}
		$("div.imgitem").animate({
				left:'-=16em'
			},1000,'linear',moveImg);

	}
	*/
	//图片自动左切换
	var slidePic={
		timer:null,
		interval:200,
		count:0,
		width:15,
		margin:1,
		unit:"em",
		tag:$(".inlineblock>ul"),
		moveImg:function(){
			var ob=this;
			ob.tag.animate({
				marginLeft:'-=1.6em'
			},ob.interval,"linear",function(){
				ob.count++;
				if(ob.count==10){
					ob.count=0;
					ob.tag.css({marginLeft:0});
					ob.tag.children(":first").appendTo(ob.tag);
					ob.tag.children().each(function(i) {
						$(this).css({
							left: i * (ob.width+ob.margin) +ob.unit
						})
					})
				}
			})
		},
		startToMove:function(){
			var ob=this;
			ob.moveImg();
			ob.timer=setInterval(function(){
				ob.moveImg();
			},ob.interval);
			ob.tag.mouseover(function(){
				clearInterval(ob.timer);
				ob.timer=null;
			});
			ob.tag.mouseout(function(){
				ob.timer=setInterval(function(){
					ob.moveImg()
				},ob.interval);
			});
		}
	};
	slidePic.startToMove();

})(jQuery);
