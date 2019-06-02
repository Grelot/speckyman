O["SOUND"] = new Array();

SOUND.sfxV = 1;
SOUND.musicV = 1;
SOUND.muted = true;
SOUND.paused = false;
SOUND.mixed = false;

/***********************************************************************************************************************************************************************************

	SOUND

***********************************************************************************************************************************************************************************/

function Sound(type, name, args)
{
	this.type = type;
	this.name = name;
	this.bgm = false;

	this.file = SLIST[type][name].cloneNode();
	if ( args != null ) 
	{ 
		this.file.loop = args.loop != null ? args.loop : false;
		this.file.volume = args.v != null ? args.v : 1;
		this.bgm = args.bgm != null ? true : false;
	}

	// this.file.onvolumechange = function() { console.log(this.name); }
	this.file.muted = SOUND.muted;
	this.file.play();
	SOUND.check();
}

/***********************************************************************************************************************************************************************************

	Sound.ANIMATE

***********************************************************************************************************************************************************************************/

Sound.prototype.animate = function()
{
	if ( this.file.ended )
	{
		this.file = null;
		return "destroy";
	}
}

/***********************************************************************************************************************************************************************************

	Sound.MUTE

***********************************************************************************************************************************************************************************/

SOUND.mute = function()
{
	this.muted = this.muted == false ? true : false;

	var length = O["SOUND"].length;
	for ( var i = 0; i < length; i++ )
	{
		var s = O["SOUND"][i];
		s.file.muted = this.muted;
	}
}

/***********************************************************************************************************************************************************************************

	Sound.CHECK

***********************************************************************************************************************************************************************************/

SOUND.check = function()
{
	var length = O["SOUND"].length;
	for ( var i = 0; i < length; i++ )
	{
		var s = O["SOUND"][i];
		if ( s.bgm == false ) { continue; }

		if ( this.mixed == false && length > 1 )
		{
			this.mixed = true;
			// s.file.volume *= Math.pow(2, 0.5);
		}
		if ( this.mixed == true && length == 1 )
		{
			this.mixed = false;
			// s.file.volume /= Math.pow(2, 0.5);
		}
	}	
}