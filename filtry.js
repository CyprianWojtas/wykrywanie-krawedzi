export default
class Filtry
{
	// Filtry w oparciu o matryce

	static zastosuj(obraz, matryca)
	{
		let obrazNowy = new ImageData(obraz.width, obraz.height);
	
		function i (x, y)
		{
			if (obraz.width > x && obraz.height > y && x >= 0 && y >= 0)
				return (y * obraz.width + x) * 4;
			else
				return null;
		}
	
		for (let x = 0; x < obraz.width  - 1; x++)
		for (let y = 0; y < obraz.height - 1; y++)
		{
	
			let wartosc =
			{
				r: 0,
				g: 0,
				b: 0
			};
	
			for (let x2 = 0; x2 < matryca    .length; x2++)
			for (let y2 = 0; y2 < matryca[x2].length; y2++)
			{
				let wR = obraz.data[i(x + x2 - matryca.srodek.x, y + y2 - matryca.srodek.y)    ] * matryca[x2][y2];
				let wG = obraz.data[i(x + x2 - matryca.srodek.x, y + y2 - matryca.srodek.y) + 1] * matryca[x2][y2];
				let wB = obraz.data[i(x + x2 - matryca.srodek.x, y + y2 - matryca.srodek.y) + 2] * matryca[x2][y2];
	
				if (!isNaN(wR)) wartosc.r += wR;
				if (!isNaN(wG)) wartosc.g += wG;
				if (!isNaN(wB)) wartosc.b += wB;
			}
	
			obrazNowy.data[i(x, y)    ] = wartosc.r / matryca.suma;
			obrazNowy.data[i(x, y) + 1] = wartosc.g / matryca.suma;
			obrazNowy.data[i(x, y) + 2] = wartosc.b / matryca.suma;
	
			obrazNowy.data[i(x, y) + 3] = 255;
		}

		return obrazNowy;
	}

	static uzupelnijMatryce(matryca)
	{
		matryca.srodek =
		{
			x: Math.floor(matryca   .length / 2),
			y: Math.floor(matryca[0].length / 2)
		};
		
		matryca.suma = 0;
		
		for(let wX of matryca)
		for(let w  of wX)
		{
			matryca.suma += w;
		}
		
		if (matryca.suma == 0)
			matryca.suma = 1;

		return matryca;
	}

	static lapl2(obraz)
	{
		let matryca =
		[
			[-1, -1, -1],
			[-1,  8, -1],
			[-1, -1, -1]
		];

		return this.zastosuj(obraz, this.uzupelnijMatryce(matryca));
	}

	static gauss5(obraz)
	{
		let matryca =
		[
			[1,  4,  7,  4, 1],
			[4, 16, 26, 16, 4],
			[7, 26, 41, 26, 7],
			[4, 16, 26, 16, 4],
			[1,  4,  7,  4, 1]
		];

		return this.zastosuj(obraz, this.uzupelnijMatryce(matryca));
	}

	static rozmycie3(obraz)
	{
		let matryca =
		[
			[1, 1, 1],
			[1, 1, 1],
			[1, 1, 1]
		];

		return this.zastosuj(obraz, this.uzupelnijMatryce(matryca));
	}

	// Inne filtry

	static splaszcz(obraz, limit = 127)
	{
		let obrazN = new ImageData(obraz.width, obraz.height);

		for (let i in obraz.data)
		{
			if (obraz.data[i] > limit) obrazN.data[i] = 255;
			else                       obrazN.data[i] = 0;
		}

		return obrazN;
	}
}