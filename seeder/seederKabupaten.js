// importData.js

const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises');

const prisma = new PrismaClient();

async function importData() {
	try {
		// Baca data Kabupaten dari file JSON
		const kabupatenData = await fs.readFile(
			'./data-bali/kabupaten.json',
			'utf-8'
		);
		const kabupatens = JSON.parse(kabupatenData);

		// Memasukkan data Kabupaten ke dalam database
		for (const kabupaten of kabupatens) {
			await prisma.kabupaten.create({
				data: {
					id: kabupaten.id.toString(),
					kabupaten: kabupaten.kab_kota,
					ibuKota: kabupaten.ibukota,
					provinsiId: kabupaten.prov_id.toString(),
				},
			});
		}

		console.log('Data Kabupaten berhasil dimasukkan.');

		// Lanjutkan dengan data Kabupaten, Kecamatan, dan Desa
	} catch (error) {
		console.error('Gagal memasukkan data:', error);
	} finally {
		await prisma.$disconnect();
	}
}

// Jalankan skrip
importData();
