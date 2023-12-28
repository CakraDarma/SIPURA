// importData.js

const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises');

const prisma = new PrismaClient();

async function importDataKecamatan() {
	try {
		// Baca data Kecamatan dari file JSON
		const kecamatanData = await fs.readFile(
			'./data-bali/kecamatan.json',
			'utf-8'
		);
		const kecamatans = JSON.parse(kecamatanData);

		// Memasukkan data Kecamatan ke dalam database
		for (const kecamatan of kecamatans) {
			await prisma.kecamatan.create({
				data: {
					id: kecamatan.id.toString(),
					kecamatan: kecamatan.kec,
					kabupatenId: kecamatan.kabkot_id.toString(),
				},
			});
		}

		console.log('Data Kecamatan berhasil dimasukkan.');

		// Lanjutkan dengan data Kecamatan, Kecamatan, dan Desa
	} catch (error) {
		console.error('Gagal memasukkan data:', error);
	} finally {
		await prisma.$disconnect();
	}
}

// Jalankan skrip
module.exports = importDataKecamatan;
