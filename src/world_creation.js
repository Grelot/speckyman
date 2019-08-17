// draw and position of goal
var goal = {
	x: canvas.width-90,
	y: 0,
	width:40,
	height:45,
	color: "#0098cb",
	draw: function(){
		context.drawImage(door_image, this.x, this.y);
	}
}
// background sprite
var background = {
	x: 0,
	y: 0,
	width:canvas.width,
	height:canvas.height,
	draw: function(){
		context.drawImage(bg_image, this.x, this.y,canvas.width,canvas.height);
	}
}


// define platforms coordinates and dimensions
var platforms = [];
var platform_width = 120;
var platform_height = 10;

platforms.push({
    x: canvas.width-170,
    y: 50,
    width: platform_width,
    height: platform_height,
});
platforms.push({
    x: canvas.width-170,
    y: canvas.height-50,
    width: platform_width,
    height: platform_height,
});
platforms.push({
    x: canvas.width-380,
    y: canvas.height-120,
    width: platform_width,
    height: platform_height,
});
platforms.push({
    x: canvas.width-380,
    y: canvas.height-240,
    width: platform_width,
    height: platform_height,
});

platforms.push({
    x: canvas.width-590,
    y: canvas.height-180,
    width: platform_width,
    height: platform_height,
});

// Bottom
platforms.push({
	x: 0,
	y: canvas.height-130,
	width: canvas.width,
	height: platform_height
});

// Left Wall
platforms.push({
	x: -10,
	y: 0,
	width: 10,
	height: canvas.height
});

// Left Wall
platforms.push({
	x: canvas.width,
	y: 0,
	width: 10,
	height: canvas.height
});

// Floor
platforms.push({
	x: 0,
	y: 0,
	width: canvas.width,
	height: platform_height
});



// draw all platforms
function draw_platforms(){
	context.fillStyle = "#907020";
	for(var i = 0; i < platforms.length; i++){
		context.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
		context.lineWidth = 5;
		context.strokeStyle = "#90D030";
		context.strokeRect(platforms[i].x, platforms[i].y-2, platforms[i].width, 5);
	}
}