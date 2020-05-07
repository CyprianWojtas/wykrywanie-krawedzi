import Filtry from "./filtry.js";

let c = document.createElement("canvas");
document.body.append(c);
let ctx = c.getContext("2d");

function encje(tekst)
{
	return tekst.replace( /#/g, "%23")
				.replace(/\?/g, "%3F")
				.replace(/\"/g, "%22")
				.replace(/\|/g, "%7C");
}

async function pobierzDane(url, skala)
{
	let img = await new Promise((resolve, reject) =>
	{
		let img = new Image();
		img.onload = () => resolve(img);
		img.onerror = e =>
		{
			console.error(e);
			reject();
		};
		img.src = encje(url);
	});

	c.width  = img.width / skala;
	c.height = img.height / skala;

	ctx.clearRect(0, 0, c.width, c.height);
	ctx.drawImage(img, 0, 0, c.width, c.height);
	return ctx.getImageData(0, 0, c.width, c.height);
}

(async () =>
{
	let obraz = await pobierzDane("obraz.jpg", 1);

	let krawedzie = Filtry.lapl2(obraz);

	let c2 = document.createElement("canvas");
	c2.width  = c.width;
	c2.height = c.height;
	document.body.append(c2);
	let ctx2 = c2.getContext("2d");
	ctx2.putImageData(krawedzie, 0, 0);
	
	let splaszczone = Filtry.splaszcz(krawedzie);

	let c3 = document.createElement("canvas");
	c3.width  = c.width;
	c3.height = c.height;
	document.body.append(c3);
	let ctx3 = c3.getContext("2d");
	ctx3.putImageData(splaszczone, 0, 0);
})();
