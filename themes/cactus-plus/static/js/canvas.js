(function(window){
    		var WINDOW_WIDTH = document.body.offsetWidth;
		var WINDOW_HEIGHT = document.body.offsetHeight;
		var canvas,context;
		var num = 200;
		var stars = [];
		var mouseX = WINDOW_WIDTH/2;
		var mouseY = WINDOW_HEIGHT/2;
		var rnd;
		function animationText(ctx, txt) {	
			dashLen = 220, dashOffset = dashLen;
			speed = 5, x = 30, i = 0;
			ctx.font = "50px Comic Sans MS, cursive, TSCu_Comic, sans-serif"; 
			ctx.lineWidth = 5; 
			ctx.lineJoin = "round"; 
			ctx.globalAlpha = 2/3;
			ctx.strokeStyle = '#000';
			ctx.fillStyle = "#fff";

(function loop() {
  ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
  dashOffset -= speed;                                         // reduce dash length
  ctx.strokeText(txt[i], x, 90);                               // stroke letter

  if (dashOffset > 0) window.requestAnimationFrame(loop);             // animate
  else {
    ctx.fillText(txt[i], x, 90);                               // fill final letter
    dashOffset = dashLen;                                      // prep next char
    x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
    ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
    ctx.rotate(Math.random() * 0.005);                         // random rotation
    if (i < txt.length) window.requestAnimationFrame(loop);
  }
})();
}
		var start = null;
		window.onload = function() {
			canvas = document.getElementById('canvas');
			canvas.width = WINDOW_WIDTH;
			canvas.height = WINDOW_HEIGHT;

			context = canvas.getContext('2d');

			/*
			addStar();
			setInterval(function(){
				//window.requestAnimationFrame(render);
				render(0);
			},33);
			animation();
			*/

			// loveWord("Hello World");
			animationText(context, 'Just for fun !');

			document.body.addEventListener('mousemove',mouseMove);
		}

		function animation() {
			var rndtime = Math.round(Math.random()*3000 + 33);
			//if (progress > rndtime) {
				setTimeout( function() {
				rnd = Math.ceil(Math.random()*stars.length)
					animation();
				}
				, rndtime);
		}

		function mouseMove(e){
			//因为是整屏背景，这里不做坐标转换
			mouseX = e.clientX;
			mouseY = e.clientY;
		}

		function render(timestmp){
			context.fillStyle = 'rgba(0,0,0,0.1)';
			context.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
			// context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)
			for(var i =0; i<num ; i++){
				var star = stars[i];
				if(i == rnd){
					star.vx = -2
					star.vy = 3;
					context.beginPath();
					context.strokeStyle = 'rgba(255,255,255,'+star.alpha+')';
					context.lineWidth = star.r;
					context.moveTo(star.x,star.y);
					context.lineTo(star.x+star.vx,star.y+star.vy);
					context.stroke();
					context.closePath();
				} // else {
				
				star.alpha += star.ra;
				if(star.alpha<=0){
					star.alpha = 0;
					star.ra = -star.ra;
					star.vx = Math.random()*0.2-0.1;
					star.vy = Math.random()*0.2-0.1;
				}else if(star.alpha>1){
					star.alpha = 1;
					star.ra = -star.ra
				}
				star.x += star.vx;
				if(star.x>=WINDOW_WIDTH){
					star.x = 0;
				}else if(star.x<0){
					star.x = WINDOW_WIDTH;
					star.vx = Math.random()*0.2-0.1;
					star.vy = Math.random()*0.2-0.1;
				}
				star.y += star.vy;
				if(star.y>=WINDOW_HEIGHT){
					star.y = 0;
					star.vy = Math.random()*0.2-0.1;
					star.vx = Math.random()*0.2-0.1;
				}else if(star.y<0){
					star.y = WINDOW_HEIGHT;
				}
				context.beginPath();
				var bg = context.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r);
				bg.addColorStop(0,'rgba(255,255,255,'+star.alpha+')')
				bg.addColorStop(1,'rgba(255,255,255,0)')
				context.fillStyle  = bg;
				context.arc(star.x,star.y, star.r, 0, Math.PI*2, true);
				context.fill();
				context.closePath();
				//}	
			}
		}

	function addStar(){
			for(var i = 0; i<num ; i++){
				var aStar = {
					x:Math.round(Math.random()*WINDOW_WIDTH),
					y:Math.round(Math.random()*WINDOW_HEIGHT),
					r:Math.random()*3,
					ra:Math.random()*0.05,
					alpha:Math.random(),
					vx:Math.random()*0.2-0.1,
					vy:Math.random()*0.2-0.1
				}
				stars.push(aStar);
			}
		}

	function loveWord(word){	
		var a = context;
		m=9;n=100;k=1E3;q=WINDOW_WIDTH;
		function f(){var g=i/4%q,t=Math.floor(i/4/q),e=this;
				e.x=j(1)*k;e.y=j(1)*k;
				e.j=g;e.k=t;e.a=j()*m;e.b=j()*m;
				e.f=2+j(1)*m;
				e.d=0.05;e.g="#f77";e.c=m+j(1)*m;
				e.e=function(){h=w=e.f;x=e.x;y=e.y
					;a.fillStyle=e.g;
					a.beginPath();
					a.moveTo(x+0.5*w,y+0.3*h);
					a.bezierCurveTo(x+0.1*w,y,x,y+0.6*h,x+0.5*w,y+0.9*h);
					a.bezierCurveTo(x+1*w,y+0.6*h,x+0.9*w,y,x+0.5*w,y+0.3*h);
					a.closePath();
					a.fill()
				};
				e.h=function(){x=e.x;y=e.y;b=e.c;l=e.j;
					m=e.k;x<l-e.c&&(e.x=l-b,e.a*=-1);
					x>l+e.c&&(e.x=l+b,e.a*=-1);
					y<m-b&&(e.y=m-b,e.b*=-1);
					y>m+b&&(e.y=m+b,e.b*=-1)
				};
				e.i=function(){e.a>n&&(e.a=n);
						e.b>n&&(e.b=n);
						e.x+=e.a*e.d;e.y+=e.b*e.d;
						e.h()
				}
			}
			function o(){
						a.fillStyle="#ffffff";
						a.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
			}
			function j(g){
				r=Math.random();return g?2*r-1:r
			}
			o();
			a.fillStyle="black";
			a.font="200px sans-serif";
			a.fillText(word,0,300,q);
			id=a.getImageData(0,0,q,q);
			d=id.data;s=0;pa=[];
			for(i=0;i<d.length;i+=4)0==d[i]&&(s++,0==s%30&&(
			p=new f,p.e(),pa.push(p)));
			s=setInterval(function(){
				//window.requestAnimationFrame( function(t){ 
				o();
				for(i in pa)p=pa[i],p.i(),p.e();
				//});
			}
			,k/60);
		}
		
    })(window);
