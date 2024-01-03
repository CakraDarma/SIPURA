// importDataPelinggih.js

const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises');

const prisma = new PrismaClient();

async function importDataPelinggih() {
	try {
		// Baca data Pelinggih dari file JSON
		const pelinggihData = await fs.readFile(
			'./data-bali/pelinggih.json',
			'utf-8'
		);
		const pelinggihs = JSON.parse(pelinggihData);

		// Memasukkan data Pelinggih ke dalam database
		for (const pelinggih of pelinggihs) {
			await prisma.pelinggih.create({
				data: {
					puraId: pelinggih.puraId,
					userId: pelinggih.userId,
					nama: pelinggih.nama,
					konten: pelinggih.konten,
					tahunPeninggalan: pelinggih.tahunPeninggalan,
					thumbnail: pelinggih.thumbnail,
				},
			});
		}

		console.log('Data Pelinggih berhasil dimasukkan.');

		// Lanjutkan dengan data Kabupaten, Kecamatan, dan Desa
	} catch (error) {
		console.error('Gagal memasukkan data:', error);
	} finally {
		await prisma.$disconnect();
	}
}

// Jalankan skrip
module.exports = importDataPelinggih;
