'use client';
import { Desa } from '@prisma/client';
import React, { useState } from 'react';
import Select from 'react-select';

interface DesaOption {
	value: string;
	label: string;
}

interface Kecamatan {
	id: string;
	kecamatan: string;
	desas: Desa[];
}

interface CobaProps {
	data: Kecamatan[];
}

const Coba: React.FC<CobaProps> = ({ data }) => {
	const [selectedDesa, setSelectedDesa] = useState<DesaOption | null>(null);
	const [kecamatanInfo, setKecamatanInfo] = useState<string | null>(null);

	const desaOptions: DesaOption[] = data.reduce<DesaOption[]>(
		(options, kecamatan) => {
			const desaList = kecamatan.desas.map((desa) => ({
				value: desa.id,
				label: `Desa ${desa.desa || 'Unknown'}, Kecamatan ${
					kecamatan.kecamatan
				}`,
			}));
			return options.concat(desaList);
		},
		[]
	);

	const handleDesaChange = (selectedOption: DesaOption | null) => {
		const selectedDesaId = selectedOption?.value;
	};

	return (
		<div>
			<h2>Data Desa:</h2>
			<Select
				options={desaOptions}
				value={selectedDesa}
				onChange={handleDesaChange}
				placeholder='Pilih Desa...'
			/>
		</div>
	);
};

export default Coba;
