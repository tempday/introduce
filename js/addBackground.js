


var intro = document.getElementById('intro');
var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	w = canvas.width =parseInt(getComputedStyle(intro).width),
	h = canvas.height =parseInt(getComputedStyle(intro).height);
//---------------------------------------------------------------------------

//canvas.style.backgroundColor="HSLA(217,40%,10%,0.8)";
ctx.lineWidth = .3;
//创建连接线
ctx.strokeStyle = (new Color(30)).style;

var mousePosition = {
	x: 30 * canvas.width / 100,
	y: 30 * canvas.height / 100
};

var dots = {
	nb: parseInt(w*h/2500),
	distance: 50,
	d_radius: 100,
	array: []
};

function colorValue(min) {
	return Math.floor(Math.random() *26 + min);
}

function createColorStyle(r,g,b) {
	return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
}

function mixComponents(comp1, weight1, comp2, weight2) {
	return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
}

function averageColorStyles(dot1, dot2) {
	var color1 = dot1.color,color2 = dot2.color;

	var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
			g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
			b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
	return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
}

function Color(min) {
	this.min = min || 0;
	this.r =parseInt(Math.random()*56+200);
	//this.g = colorValue(min);
	//this.b =colorValue(min);
	this.g =parseInt(Math.random()*26+230);
	this.b =parseInt(Math.random()*26+230);
	this.style = createColorStyle(this.r, this.g, this.b);
}
//创建点
function Dot(){
	this.x = Math.random() * canvas.width;
	this.y = Math.random() * canvas.height;

	this.vx = -.5 + Math.random();
	this.vy = -.5 + Math.random();

	this.radius = Math.random() * 2;

	this.color = new Color(230);
}

Dot.prototype = {
	draw: function(){
		ctx.beginPath();
		ctx.shadowColor=this.color.style;
		ctx.shadowBlur=15;
		ctx.fillStyle = this.color.style;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fill();
	}
};

function createDots(){
	for(i = 0; i < dots.nb; i++){
		dots.array.push(new Dot());
	}
}

function moveDots() {
	for(i = 0; i < dots.nb; i++){

		var dot = dots.array[i];

		if(dot.y < 0 || dot.y > canvas.height){
			dot.vx = dot.vx;
			dot.vy = - dot.vy;
		}
		else if(dot.x < 0 || dot.x > canvas.width){
			dot.vx = - dot.vx;
			dot.vy = dot.vy;
		}
		dot.x += dot.vx/parseInt(Math.random()*1+1);
		dot.y += dot.vy/parseInt(Math.random()*1+1);
	}
}

function connectDots() {
	for(i = 0; i < dots.nb; i++){
		for(j = 0; j < dots.nb; j++){
			i_dot = dots.array[i];
			j_dot = dots.array[j];

			if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
				if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
					ctx.beginPath();
					ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
					ctx.moveTo(i_dot.x, i_dot.y);
					ctx.lineTo(j_dot.x, j_dot.y);
					ctx.stroke();
					ctx.closePath();
				}
			}
		}
	}
}

function drawDots() {
	for(i = 0; i < dots.nb; i++){
		var dot = dots.array[i];
		dot.draw();
	}
}

function animateDots() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	moveDots();
	connectDots();
	drawDots();
	requestAnimationFrame(animateDots);
}

intro.onmousemove=function(e){
	mousePosition.x = e.pageX;
	mousePosition.y = e.pageY;
}

intro.onmouseout=function(){
	mousePosition.x = canvas.width / 2;
	mousePosition.y = canvas.height / 2;
}

//createDots();
//requestAnimationFrame(animateDots);


var autoMusic={
	deg:0,
	timer:null,
	msPic:document.getElementById("bg_music"),
	myMusic:document.getElementById("myMusic"),
	playing:false,
	interval:10,
	rotate:function (){
		this.deg+=3;
		this.msPic.style.transform="rotate("+this.deg+"deg)";
		this.timer&&(clearTimeout(this.timer));
		this.timer=setTimeout(function(){
			autoMusic.rotate();
		},this.interval);
	},
	musicIsStart:function(){
		if(this.myMusic.currentTime!=0){
			this.rotate();
			this.playing=true;
		}else{
			setTimeout(function(){
				autoMusic.musicIsStart();
			},100);
		}
	},
	play:function(){
		this.myMusic.play();
		this.musicIsStart();
	},
	init:function(){
		var ob=this;
		ob.msPic.onclick=function(){
			if (ob.playing){
				ob.myMusic.pause();
				clearTimeout(ob.timer);
				ob.timer=null;
				ob.playing=!ob.playing;
			}else{
				ob.myMusic.play();
				ob.playing=!ob.playing;
				ob.rotate();
			}
		};
		$('html').one('touchstart',function(){
			ob.play();
		});
		ob.play();
	}
};
autoMusic.init();