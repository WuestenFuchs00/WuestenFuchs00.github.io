<!--
	/* PSE = Periodensystem der Elemente */
	var PSE = {
		H:  { bezeichnung: 'Wasserstoff', symbol: 'H',  ordnung: 1,  periode: 1 /* periode = zeile */, gruppe: 1 /* gruppe = spalte */ },
		He: { bezeichnung: 'Helium',      symbol: 'He', ordnung: 2,  periode: 1 , gruppe: 18 },
		Li: { bezeichnung: 'Lithium',     symbol: 'Li', ordnung: 3,  periode: 2 , gruppe: 1 },
		Be: { bezeichnung: 'Beryllium',   symbol: 'Be', ordnung: 4,  periode: 2 , gruppe: 2 },
		B:  { bezeichnung: 'Bor',         symbol: 'B',  ordnung: 5,  periode: 2 , gruppe: 13 },
		C:  { bezeichnung: 'Kohlenstoff', symbol: 'C',  ordnung: 6,  periode: 2 , gruppe: 14 },
		N:  { bezeichnung: 'Stickstoff',  symbol: 'N',  ordnung: 7,  periode: 2 , gruppe: 15 },
		O:  { bezeichnung: 'Sauerstoff',  symbol: 'O',  ordnung: 8,  periode: 2 , gruppe: 16 },
		F:  { bezeichnung: 'Fluor',       symbol: 'F',  ordnung: 9,  periode: 2 , gruppe: 17 },
		Ne: { bezeichnung: 'Neon',        symbol: 'Ne', ordnung: 10, periode: 2 , gruppe: 18 },		
		Na: { bezeichnung: 'Natrium',     symbol: 'Na', ordnung: 11, periode: 3,  gruppe: 1 },
		Mg: { bezeichnung: 'Magnesium',   symbol: 'Mg', ordnung: 12, periode: 3,  gruppe: 2 },
		Al: { bezeichnung: 'Aluminium',   symbol: 'Al', ordnung: 13, periode: 3,  gruppe: 13 },
		Si: { bezeichnung: 'Silicium',    symbol: 'Si', ordnung: 14, periode: 3,  gruppe: 14 },
		P:  { bezeichnung: 'Phosphor',    symbol: 'P',  ordnung: 15, periode: 3,  gruppe: 15 },
		S:  { bezeichnung: 'Schwefel',    symbol: 'S',  ordnung: 16, periode: 3,  gruppe: 16 },
		Si: { bezeichnung: 'Chlor',       symbol: 'Cl', ordnung: 17, periode: 3,  gruppe: 17 },
		Ar: { bezeichnung: 'Argon',       symbol: 'Ar', ordnung: 18, periode: 3,  gruppe: 18 },
		
		K:  { bezeichnung: 'Kalium',      symbol: 'K',  ordnung: 19, periode: 4,  gruppe: 1 },
		Ca: { bezeichnung: 'Calcium',     symbol: 'Ca', ordnung: 20, periode: 4,  gruppe: 2 },
		Sc: { bezeichnung: 'Scandium',    symbol: 'Sc', ordnung: 21, periode: 4,  gruppe: 3 },
		Ti: { bezeichnung: 'Titan',       symbol: 'Ti', ordnung: 22, periode: 4,  gruppe: 4 },
		V:  { bezeichnung: 'Vanadium',    symbol: 'V',  ordnung: 23, periode: 4,  gruppe: 5 },
		Cr: { bezeichnung: 'Chrom',       symbol: 'Cr', ordnung: 24, periode: 4,  gruppe: 6 },
		Mn: { bezeichnung: 'Mangan',      symbol: 'Mn', ordnung: 25, periode: 4,  gruppe: 7 },
		Fe: { bezeichnung: 'Eisen',       symbol: 'Fe', ordnung: 26, periode: 4,  gruppe: 8 },
		Co: { bezeichnung: 'Cobalt',      symbol: 'Co', ordnung: 27, periode: 4,  gruppe: 9 },
		Ni: { bezeichnung: 'Nickel',      symbol: 'Ni', ordnung: 28, periode: 4,  gruppe: 10 },
		Cu: { bezeichnung: 'Kupfer',      symbol: 'Cu', ordnung: 29, periode: 4,  gruppe: 11 },
		Zn: { bezeichnung: 'Zink',        symbol: 'Zn', ordnung: 30, periode: 4,  gruppe: 12 },
		Ga: { bezeichnung: 'Gallium',     symbol: 'Ga', ordnung: 31, periode: 4,  gruppe: 13 },
		Ge: { bezeichnung: 'Germanium',   symbol: 'Ge', ordnung: 32, periode: 4,  gruppe: 14 },
		As: { bezeichnung: 'Arsen',       symbol: 'As', ordnung: 33, periode: 4,  gruppe: 15 },
		Se: { bezeichnung: 'Selen',       symbol: 'Se', ordnung: 34, periode: 4,  gruppe: 16 },
		Br: { bezeichnung: 'Brom',        symbol: 'Br', ordnung: 35, periode: 4,  gruppe: 17 },
		Kr: { bezeichnung: 'Krypton',     symbol: 'Kr', ordnung: 36, periode: 4,  gruppe: 18 },
		
		Rb: { bezeichnung: 'Rubidium',    symbol: 'Rb', ordnung: 37, periode: 5,  gruppe: 1 },
		Sr: { bezeichnung: 'Strontium',   symbol: 'Sr', ordnung: 38, periode: 5,  gruppe: 2 },
		Y:  { bezeichnung: 'Yttrium',     symbol: 'Y',  ordnung: 39, periode: 5,  gruppe: 3 },
		Zr: { bezeichnung: 'Zirconium',   symbol: 'Zr', ordnung: 40, periode: 5,  gruppe: 4 },
		Nb: { bezeichnung: 'Niob',        symbol: 'Nb', ordnung: 41, periode: 5,  gruppe: 5 },
		Mo: { bezeichnung: 'Molybdän',    symbol: 'Mo', ordnung: 42, periode: 5,  gruppe: 6 },
		Tc: { bezeichnung: 'Technetium',  symbol: 'Tc', ordnung: 43, periode: 5,  gruppe: 7 },
		Ru: { bezeichnung: 'Ruthenium',   symbol: 'Ru', ordnung: 44, periode: 5,  gruppe: 8 },
		Rh: { bezeichnung: 'Rhodium',     symbol: 'Rh', ordnung: 45, periode: 5,  gruppe: 9 },
		Pd: { bezeichnung: 'Palladium',   symbol: 'Pd', ordnung: 46, periode: 5,  gruppe: 10 },
		Ag: { bezeichnung: 'Silber',      symbol: 'Ag', ordnung: 47, periode: 5,  gruppe: 11 },
		Cd: { bezeichnung: 'Cadmium',     symbol: 'Cd', ordnung: 48, periode: 5,  gruppe: 12 },
		In: { bezeichnung: 'Indium',      symbol: 'In', ordnung: 49, periode: 5,  gruppe: 13 },
		Sn: { bezeichnung: 'Zinn',        symbol: 'Sn', ordnung: 50, periode: 5,  gruppe: 14 },
		Sb: { bezeichnung: 'Antimon',     symbol: 'Sb', ordnung: 51, periode: 5,  gruppe: 15 },
		Te: { bezeichnung: 'Tellur',      symbol: 'Te', ordnung: 52, periode: 5,  gruppe: 16 },
		I:  { bezeichnung: 'Iod',         symbol: 'I',  ordnung: 53, periode: 5,  gruppe: 17 },
		Xe: { bezeichnung: 'Xenon',       symbol: 'Xe', ordnung: 54, periode: 5,  gruppe: 18 },
		
		Cs: { bezeichnung: 'Caesium',     symbol: 'Cs', ordnung: 55, periode: 6,  gruppe: 1 },
		Ba: { bezeichnung: 'Barium',      symbol: 'Ba', ordnung: 56, periode: 6,  gruppe: 2 },
		/* Lanthanoide */
		La: { bezeichnung: 'Lanthan',     symbol: 'La', ordnung: 57, periode: 6,  gruppe: 3 },
		Ce: { bezeichnung: 'Cer',         symbol: 'Ce', ordnung: 58, periode: 6,  gruppe: 3 },
		Pr: { bezeichnung: 'Praseodym',   symbol: 'Pr', ordnung: 59, periode: 6,  gruppe: 3 },
		Nd: { bezeichnung: 'Neodym',      symbol: 'Nd', ordnung: 60, periode: 6,  gruppe: 3 },
		Pm: { bezeichnung: 'Promethium',  symbol: 'Pm', ordnung: 61, periode: 6,  gruppe: 3 },
		Sm: { bezeichnung: 'Samarium',    symbol: 'Sm', ordnung: 62, periode: 6,  gruppe: 3 },
		Eu: { bezeichnung: 'Europium',    symbol: 'Eu', ordnung: 63, periode: 6,  gruppe: 3 },
		Gd: { bezeichnung: 'Gadolinium',  symbol: 'Gd', ordnung: 64, periode: 6,  gruppe: 3 },
		Tb: { bezeichnung: 'Terbium',     symbol: 'Tb', ordnung: 65, periode: 6,  gruppe: 3 },
		Dy: { bezeichnung: 'Dysprosium',  symbol: 'Dy', ordnung: 66, periode: 6,  gruppe: 3 },
		Ho: { bezeichnung: 'Holmium',     symbol: 'Ho', ordnung: 67, periode: 6,  gruppe: 3 },
		Er: { bezeichnung: 'Erbium',      symbol: 'Er', ordnung: 68, periode: 6,  gruppe: 3 },
		Tm: { bezeichnung: 'Thulium',     symbol: 'Tm', ordnung: 69, periode: 6,  gruppe: 3 },
		Yb: { bezeichnung: 'Ytterbium',   symbol: 'Yb', ordnung: 70, periode: 6,  gruppe: 3 },
		Lu: { bezeichnung: 'Lutetium',    symbol: 'Lu', ordnung: 71, periode: 6,  gruppe: 3 },
		
		Hf: { bezeichnung: 'Hafnium',     symbol: 'Hf', ordnung: 72, periode: 6,  gruppe: 4 },
		Ta: { bezeichnung: 'Tantal',      symbol: 'Ta', ordnung: 73, periode: 6,  gruppe: 5 },
		W:  { bezeichnung: 'Wolfram',     symbol: 'W',  ordnung: 74, periode: 6,  gruppe: 6 },
		Re: { bezeichnung: 'Rhenium',     symbol: 'Re', ordnung: 75, periode: 6,  gruppe: 7 },
		Os: { bezeichnung: 'Osmium',      symbol: 'Os', ordnung: 76, periode: 6,  gruppe: 8 },
		Ir: { bezeichnung: 'Iridium',     symbol: 'Ir', ordnung: 77, periode: 6,  gruppe: 9 },
		Pt: { bezeichnung: 'Platin',      symbol: 'Pt', ordnung: 78, periode: 6,  gruppe: 10 },
		Au: { bezeichnung: 'Gold',        symbol: 'Au', ordnung: 79, periode: 6,  gruppe: 11 },
		Hg: { bezeichnung: 'Quecksilber', symbol: 'Hg', ordnung: 80, periode: 6,  gruppe: 12 },
		Tl: { bezeichnung: 'Thallium',    symbol: 'Tl', ordnung: 81, periode: 6,  gruppe: 13 },
		Pb: { bezeichnung: 'Blei',        symbol: 'Pb', ordnung: 82, periode: 6,  gruppe: 14 },
		Bi: { bezeichnung: 'Bismut',      symbol: 'Bi', ordnung: 83, periode: 6,  gruppe: 15 },
		Po: { bezeichnung: 'Polonium',    symbol: 'Po', ordnung: 84, periode: 6,  gruppe: 16 },
		At: { bezeichnung: 'Astat',       symbol: 'At', ordnung: 85, periode: 6,  gruppe: 17 },
		Rn: { bezeichnung: 'Radon',       symbol: 'Rn', ordnung: 86, periode: 6,  gruppe: 18 },
		
		Fr: { bezeichnung: 'Francium',    symbol: 'Fr', ordnung: 87,  periode: 7,  gruppe: 1 },
		Ra: { bezeichnung: 'Radium',      symbol: 'Ra', ordnung: 88,  periode: 7,  gruppe: 2 },
		/* Actinoide */
		Ac: { bezeichnung: 'Actinium',     symbol: 'Ac', ordnung: 89,  periode: 7,  gruppe: 3 },
		Th: { bezeichnung: 'Thorium',      symbol: 'Th', ordnung: 90,  periode: 7,  gruppe: 3 },
		Pa: { bezeichnung: 'Protactinium', symbol: 'Pa', ordnung: 91,  periode: 7,  gruppe: 3 },
		U:  { bezeichnung: 'Uran',         symbol: 'U',  ordnung: 92,  periode: 7,  gruppe: 3 },
		Np: { bezeichnung: 'Neptunium',    symbol: 'Np', ordnung: 93,  periode: 7,  gruppe: 3 },
		Pu: { bezeichnung: 'Plutonium',    symbol: 'Pu', ordnung: 94,  periode: 7,  gruppe: 3 },
		Am: { bezeichnung: 'Americium',    symbol: 'Am', ordnung: 95,  periode: 7,  gruppe: 3 },
		Cm: { bezeichnung: 'Curium',       symbol: 'Cm', ordnung: 96,  periode: 7,  gruppe: 3 },
		Bk: { bezeichnung: 'Berkelium',    symbol: 'Bk', ordnung: 97,  periode: 7,  gruppe: 3 },
		Cf: { bezeichnung: 'Californium',  symbol: 'Cf', ordnung: 98,  periode: 7,  gruppe: 3 },
		Es: { bezeichnung: 'Einsteinium',  symbol: 'Es', ordnung: 99,  periode: 7,  gruppe: 3 },
		Fm: { bezeichnung: 'Fermium',      symbol: 'Fm', ordnung: 100, periode: 7,  gruppe: 3 },
		Md: { bezeichnung: 'Mendelevium',  symbol: 'Md', ordnung: 101, periode: 7,  gruppe: 3 },
		No: { bezeichnung: 'Nobelium',     symbol: 'No', ordnung: 102, periode: 7,  gruppe: 3 },
		Lr: { bezeichnung: 'Lawrencium',   symbol: 'Lr', ordnung: 103, periode: 7,  gruppe: 3 },
		
		Rf: { bezeichnung: 'Rutherfordium', symbol: 'Rf', ordnung: 104, periode: 7,  gruppe: 4 },
		Db: { bezeichnung: 'Dubnium',       symbol: 'Db', ordnung: 105, periode: 7,  gruppe: 5 },
		Sg: { bezeichnung: 'Seaborgium',    symbol: 'Sg', ordnung: 106, periode: 7,  gruppe: 6 },
		Bh: { bezeichnung: 'Bohrium',       symbol: 'Bh', ordnung: 107, periode: 7,  gruppe: 7 },
		Hs: { bezeichnung: 'Hassium',       symbol: 'Hs', ordnung: 108, periode: 7,  gruppe: 8 },
		Mt: { bezeichnung: 'Meitnerium',    symbol: 'Mt', ordnung: 109, periode: 7,  gruppe: 9 },
		Ds: { bezeichnung: 'Darmstadtium',  symbol: 'Ds', ordnung: 110, periode: 7,  gruppe: 10 },
		Rg: { bezeichnung: 'Roentgenium',   symbol: 'Rg', ordnung: 111, periode: 7,  gruppe: 11 },
		Cn: { bezeichnung: 'Corpernicium',  symbol: 'Cn', ordnung: 112, periode: 7,  gruppe: 12 },
		Nh: { bezeichnung: 'Nihonium',      symbol: 'Nh', ordnung: 113, periode: 7,  gruppe: 13 },
		Fl: { bezeichnung: 'Flerovium',     symbol: 'Fl', ordnung: 114, periode: 7,  gruppe: 14 },
		Mc: { bezeichnung: 'Moscovium',     symbol: 'Mc', ordnung: 115, periode: 7,  gruppe: 15 },
		Lv: { bezeichnung: 'Livermorium',   symbol: 'Lv', ordnung: 116, periode: 7,  gruppe: 16 },
		Ts: { bezeichnung: 'Tenness',       symbol: 'Ts', ordnung: 117, periode: 7,  gruppe: 17 },
		Og: { bezeichnung: 'Oganesson',     symbol: 'Og', ordnung: 118, periode: 7,  gruppe: 18 },
	};
	
	/**
	 * Elektronenkonfiguration:
	 * ========================
	 * Nebenquantenzahl:
	 * 	s p d f g ... (und entprechend alphabetisch weiter), s : sharp, d : diffuse, p : principal, f : fundamental
	 * 	s p d f g h i j k ...
	 * Maximale aufzunehmende Elektronen:
	 *	s = 2, p = 6, d = 10, f = 14, g = 18, h = 22, i = 26, j = 30, ...
	 * ========================
	 * Perioden:
	 *  1, 2, 3, 4, 5, 6, 7
	 * 	K, L, M, N, O, P, Q
	 * ========================
	 * Aufbauprinzip: (Nur bis 7. Periode)
	 * 	1s(2) 2s(2) 2p(6) 3s(2) 3p(6) 4s(2) 3d(10) 4p(6) 5s(2) 4d(10) 5p(6) 6s(2) 4f(14) 5d(10) 6p(6) 7s(2) 5f(14) 6d(10) 7p(6) 5g(18) 6f(14) 7d(10) 6g(18) 7f(14) 6h(22) 7g(18) 7h(22) 7i(26)
	 * ========================
	 * Links:
	 *  [1] https://de.wikipedia.org/wiki/Elektronenkonfiguration
	 *	[2] https://de.wikipedia.org/wiki/Aufbauprinzip
	 */
	function Elektronenkonfiguration (strSymbol) {
		var Aufbauprinzip = ["1s","2s","2p","3s","3p","4s","3d","4p","5s","4d","5p","6s","4f","5d","6p","7s","5f","6d","7p","5g","6f","7d","6g","7f","6h","7g","7h","7i"];
		var ordnung = 0;
		for ( var elem in PSE ) {
			if ( PSE[elem].symbol == strSymbol ) {
				ordnung = PSE[elem].ordnung;
				break;
			}
		}
		var strAusgabe = "";
		var orbital = 0;
		for ( var i = 0; i < Aufbauprinzip.length; i++ ) {
			switch ( Aufbauprinzip[i].charAt(1) ) {
				case "s":
					orbital = 2;
					break;
				case "p":
					orbital = 6;
					break;
				case "d":
					orbital = 10;
					break;
				case "f":
					orbital = 14;
					break;
				case "g":
					orbital = 18;
					break;
				case "h":
					orbital = 22;
					break;
				case "i":
					orbital = 26;
					break;
				default:
					break;
			}
			if ( ordnung == 0 ) {
				strAusgabe += Aufbauprinzip[i] + "(0) ";
				break;
			}
			if ( ordnung < orbital ) {
				orbital = ordnung;
				ordnung = 0;
			} else { // ordnung >= orbital
				ordnung -= orbital;
			}
			strAusgabe += Aufbauprinzip[i] + "(" + orbital + ") ";
		}
		return strAusgabe;
	}
-->