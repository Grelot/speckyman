//world canvas
var world_frame = {
	x: 0,
	y: 0,
	width: 4000,
	height: 500
}

// draw and position of goal
var goal = {
	x: world_frame.width-90,
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
	width:world_frame.width,
	height:world_frame.height,
	draw: function(){
		context.drawImage(bg_image, this.x, this.y,this.width,this.height);
	}
}


// define platforms coordinates and dimensions
var platforms = [];
var platform_width = 120;
var platform_height = 10;

platforms.push({
    x: world_frame.width-140,
    y: world_frame.height-300,
    width: platform_width,
    height: platform_height,
});


platforms.push({
    x: world_frame.width-380,
    y: world_frame.height-400,
    width: platform_width,
    height: platform_height,
});

platforms.push({
    x: world_frame.width-480,
    y: world_frame.height-500,
    width: platform_width,
    height: platform_height,
});



platforms.push({
    x: world_frame.width-170,
    y: world_frame.height-50,
    width: platform_width,
    height: platform_height,
});

platforms.push({
    x: world_frame.width-380,
    y: world_frame.height-240,
    width: platform_width,
    height: platform_height,
});

platforms.push({
    x: world_frame.width-590,
    y: world_frame.height-180,
    width: platform_width,
    height: platform_height,
});

// Bottom
platforms.push({
	x: 0,
	y: world_frame.height-50,
	width: world_frame.width,
	height: platform_height
});

// right Wall

platforms.push({
	x: 0,
	y: 0,
	width: 1,
	height: world_frame.height
});


// Left Wall
platforms.push({
	x: world_frame.width,
	y: 0,
	width: platform_width,
	height: world_frame.height
});

// Floor
platforms.push({
	x: 0,
	y: 0,
	width: world_frame.width,
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