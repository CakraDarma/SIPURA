// importDataPratima.js

const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises');

const prisma = new PrismaClient();

async function importDataPratima() {
	try {
		// Baca data Pratima dari file JSON
		const pratimaData = await fs.readFile('./data-bali/pratima.json', 'utf-8');
		const pratimas = JSON.parse(pratimaData);

		// Memasukkan data Pratima ke dalam database
		for (const pratima of pratimas) {
			await prisma.pratima.create({
				data: {
					puraId: pratima.puraId,
					userId: pratima.userId,
					nama: pratima.nama,
					konten: pratima.konten,
					tahunDitemukan: pratima.tahunDitemukan,
					thumbnail: pratima.thumbnail,
				},
			});
		}

		console.log('Data Pratima berhasil dimasukkan.');

		// Lanjutkan dengan data Kabupaten, Kecamatan, dan Desa
	} catch (error) {
		console.error('Gagal memasukkan data:', error);
	} finally {
		await prisma.$disconnect();
	}
}

// Jalankan skrip
module.exports = importDataPratima;
