import { z } from 'zod';

export const PuraValidator = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Nama Pura harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Nama Pura tidak boleh lebih dari 128 karakter',
		}),
	konten: z.any(),
	tahunBerdiri: z.number(),
	alamat: z
		.string()
		.min(3, {
			message: 'Alamat harus lebih dari 3 karakter',
		})
		.max(128, {
			message: 'Alamat tidak boleh lebih dari 128 karakter',
		}),
	wuku: z.enum([
		'SINTA',
		'LANDEP',
		'UKIR',
		'KULANTIR',
		'TOLU',
		'GUMBREG',
		'WARIGA',
		'WARIGADEAN',
		'JULUNGWANGI',
		'SUNGSANG',
		'DUNGULAN',
		'KUNINGAN',
		'LANGKIR',
		'MEDANGSIA',
		'PUJUT',
		'PAHANG',
		'KRULUT',
		'MERAKIH',
		'TAMBIR',
		'MEDANGKUNGAN',
		'MATAL',
		'UYE',
		'MENAIL',
		'PRANGBAKAT',
		'BALA',
		'UGU',
		'WAYANG',
		'KLAWU',
		'DUKUT',
		'WATUGUNUNG',
	]),
	pancaWara: z.enum(['PAING', 'PON', 'WAGE', 'KLIWON', 'UMANIS']),
	saptaWara: z.enum([
		'REDITE',
		'SOMA',
		'ANGGARA',
		'BUDA',
		'WRASPATI',
		'SUKRA',
		'SANISCARA',
	]),
	kategori: z.enum(['KAWITAN', 'SWAGINA', 'KAHYANGAN_DESA', 'KAHYANGAN_JAGAT']),
	thumbnail: z.any(),
	desaId: z.string(),
});

export const ActivedPuraValidator = z.object({
	actived: z.boolean(),
});
