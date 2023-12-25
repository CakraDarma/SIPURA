'use client';

import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import { provinsi, kabupaten, kecamatan, desa } from 'daftar-wilayah-indonesia';

const WilayahDropdown = () => {
	const [selectedProvinsi, setSelectedProvinsi] = useState(null);
	const [selectedKabupaten, setSelectedKabupaten] = useState(null);
	const [selectedKecamatan, setSelectedKecamatan] = useState(null);
	const [selectedDesa, setSelectedDesa] = useState(null);

	const provinsiOptions = provinsi().map((p) => ({
		value: p.kode,
		label: p.nama,
	}));
	const kabupatenOptions = selectedProvinsi
		? kabupaten(selectedProvinsi.value).map((k) => ({
				value: k.kode,
				label: k.nama,
		  }))
		: [];
	const kecamatanOptions = selectedKabupaten
		? kecamatan(selectedKabupaten.value).map((k) => ({
				value: k.kode,
				label: k.nama,
		  }))
		: [];
	const desaOptions = selectedKecamatan
		? desa(selectedKecamatan.value).map((d) => ({
				value: d.kode,
				label: d.nama,
		  }))
		: [];

	useEffect(() => {
		setSelectedKabupaten(null);
		setSelectedKecamatan(null);
		setSelectedDesa(null);
	}, [selectedProvinsi]);

	useEffect(() => {
		setSelectedKecamatan(null);
		setSelectedDesa(null);
	}, [selectedKabupaten]);

	useEffect(() => {
		setSelectedDesa(null);
	}, [selectedKecamatan]);

	return (
		<div>
			<Select
				placeholder='Pilih Provinsi'
				value={selectedProvinsi}
				onChange={(selectedOption) => setSelectedProvinsi(selectedOption)}
				options={provinsiOptions}
			/>
			{selectedProvinsi && (
				<>
					<Select
						placeholder='Pilih Kabupaten'
						value={selectedKabupaten}
						onChange={(selectedOption) => setSelectedKabupaten(selectedOption)}
						options={kabupatenOptions}
					/>
				</>
			)}
			{selectedKabupaten && (
				<>
					<Select
						placeholder='Pilih Kecamatan'
						value={selectedKecamatan}
						onChange={(selectedOption) => setSelectedKecamatan(selectedOption)}
						options={kecamatanOptions}
					/>
				</>
			)}
			{selectedKecamatan && (
				<>
					<Select
						placeholder='Pilih Desa'
						value={selectedDesa}
						onChange={(selectedOption) => setSelectedDesa(selectedOption)}
						options={desaOptions}
					/>
				</>
			)}
		</div>
	);
};

export default WilayahDropdown;
