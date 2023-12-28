// importData.js

const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises');

const prisma = new PrismaClient();

async function importDataDesa() {
	try {
		// Baca data Desa dari file JSON
		const desaData = await fs.readFile('./data-bali/desa.json', 'utf-8');
		const desas = JSON.parse(desaData);

		// Memasukkan data Desa ke dalam database
		for (const desa of desas) {
			await prisma.desa.create({
				data: {
					id: desa.id.toString(),
					desa: desa.kelu,
					kecamatanId: desa.kec_id.toString(),
					pos: desa.pos,
				},
			});
		}

		console.log('Data Desa berhasil dimasukkan.');

		// Lanjutkan dengan data Desa, Desa, dan Desa
	} catch (error) {
		console.error('Gagal memasukkan data:', error);
	} finally {
		await prisma.$disconnect();
	}
}

// Jalankan skrip
module.exports = importDataDesa;
