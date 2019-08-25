function Camera(objet) {
	this.frame = 0;
	this.x = 0;
	this.y = 0;
	this.pre_x = 0;
	this.pre_y = 0;
	this.focus = objet; // object followed by the camera
	this.shift_x = 0;
	this.shift_y = 0;
	this.precision=8;
}

Camera.prototype.following = function() {
	half_canvas_width=Math.floor(canvas.width/2)

	this.shift_x= Math.floor(this.focus.x - this.x);
	console.log(this.shift_x);
	console.log(this.focus.x);
	console.log(this.x);
	console.log("#######");
}


Camera.prototype.old_following = function() {
	//half_canvas_width=Math.floor(canvas.width/2)
	console.log(this.frame);

	if( this.focus.x > this.x+this.precision) {
		console.log(this.focus.x);
		console.log(this.x);
		console.log("#######");
		this.shift_x= -this.precision;
		this.x+=this.precision;
	} else if (this.focus.x < this.x -this.precision) {
		console.log(this.focus.x);//5
		console.log(this.x);//683 //675
		console.log("uuuuuuuuuu");
		this.shift_x= this.precision;
		this.x-=this.precision;
	} else {
		this.shift_x = 0;
	}
}

