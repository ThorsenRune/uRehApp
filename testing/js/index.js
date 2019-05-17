let xs = []
ys=[];
for (var i = 0; i <= 500; i++) {
  xs.push(i)
  ys.push(50 + 100 * Math.sin(i / 9))
}

let t = 0
var a=50;
var b=0.01;		//IIR lp coeff
var y=0;	//Startvalue
var k=100;	//Gain
var e=document.querySelector("svg")
var offset=e.clientHeight/2;
var path1=e.firstElementChild;
var ss=0;
var rms=0;
app.setValue(2,10)
function filter(y,x){
	y=(1-b)*y+b*x;
	return y;
	
}
function animate() {
	ss=0;
	r=Math.random();
	r1=Math.random();
	if (app){
	
		a=Number.parseInt(app.getValue(1))/20;
		k=Number.parseInt(app.getValue(0));
		b=Number.parseInt(app.getValue(2))/500;
		app.setValue(3,50*rms);
	}
  let points = xs.map(x => {
    y =Math.sin(x * a/50)*(r1*k* Math.sin((x + t) / 19)+  r*k* Math.sin((x +r) / 9))
	ss=ss+(y*y);
    return [x, offset+y]
  })
  rms=filter(rms,Math.sqrt(ss)/500);
  let path = "M" + points.map(p => {
    return p[0] + "," + p[1]
  }).join(" L")
  i=Math.floor(500*Math.random());ys[i]=100*(Math.random());
  ys[200]=200;
  // ys[i]=100*(Math.random());
  path1.setAttribute("d", path)
  

  requestAnimationFrame(animate)
}

animate()