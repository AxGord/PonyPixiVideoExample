using pony.pixi.PixiExtends;

class Main extends pony.pixi.App {

	public static var mainDiv:js.html.DivElement;

	function new() {
		var scene = new Scene();
		super(scene, Config.width, Config.height, 0x666666, mainDiv);
		scene.init();
	}

	static function main() {
		pony.time.JsDT.start();
		pony.time.DeltaTime.fixedUpdate < createMain;
	}

	static function createMain():Void {
		mainDiv = cast js.Browser.document.getElementById('app');
		new Main();
	}

}

class Scene extends pixi.core.sprites.Sprite {

	var div:js.html.DivElement;
	var graphic:pixi.core.graphics.Graphics;

	public function init():Void {

		var g = new pixi.core.graphics.Graphics();
		g.beginFill(0x000000);
		g.drawRoundedRect(0, 0, 50, 50, 0);
		addChild(g);

		graphic = new pixi.core.graphics.Graphics();
		graphic.beginFill(0x000000);
		graphic.drawRoundedRect(0, 0, 300, 300, 15);
		graphic.x = 200;
		graphic.y = 200;
		
		addChild(graphic);


		//div = js.Browser.document.createDivElement();
		//div.style.background = '#ffffff';
		//Main.mainDiv.appendChild(div);

		var r = graphic.getPonyRect();
		r.x += 10;
		r.y += 10;
		r.width -= 20;
		r.height -= 20;
		
		var v = new pony.pixi.PixiHtmlVideoBase(r);
		v.video.loadVideo('https://github.com/mediaelement/mediaelement-files/blob/master/big_buck_bunny.mp4?raw=true');

	}

}

