// importDataProvinsi.js

const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises');

const prisma = new PrismaClient();

async function importDataProvinsi() {
	try {
		// Baca data Provinsi dari file JSON
		const provinsiData = await fs.readFile(
			'./data-bali/provinsi.json',
			'utf-8'
		);
		const provinsis = JSON.parse(provinsiData);

		// Memasukkan data Provinsi ke dalam database
		for (const provinsi of provinsis) {
			await prisma.provinsi.create({
				data: {
					id: provinsi.id.toString(),
					provinsi: provinsi.provinsi,
				},
			});
		}

		console.log('Data Provinsi berhasil dimasukkan.');

		// Lanjutkan dengan data Kabupaten, Kecamatan, dan Desa
	} catch (error) {
		console.error('Gagal memasukkan data:', error);
	} finally {
		await prisma.$disconnect();
	}
}

// Jalankan skrip
module.exports = importDataProvinsi;
