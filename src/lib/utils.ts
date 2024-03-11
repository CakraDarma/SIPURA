import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const formatDistanceLocale = {
	lessThanXSeconds: 'baru saja',
	xSeconds: '{{count}} detik',
	halfAMinute: 'setengah menit',
	lessThanXMinutes: '{{count}} menit',
	xMinutes: '{{count}} menit',
	aboutXHours: '{{count}} jam',
	xHours: '{{count}} jam',
	xDays: '{{count}} hari',
	aboutXWeeks: '{{count}} minggu',
	xWeeks: '{{count}} minggu',
	aboutXMonths: '{{count}} bulan',
	xMonths: '{{count}} bulan',
	aboutXYears: '{{count}} tahun',
	xYears: '{{count}} tahun',
	overXYears: '{{count}} tahun',
	almostXYears: '{{count}} tahun',
};

function formatDistance(token: string, count: number, options?: any): string {
	options = options || {};

	const result = formatDistanceLocale[
		token as keyof typeof formatDistanceLocale
	].replace('{{count}}', count.toString());

	if (options.addSuffix) {
		if (options.comparison > 0) {
			return 'dalam ' + result;
		} else {
			if (result === 'baru saja') return result;
			return result + ' yang lalu';
		}
	}

	return result;
}

export function formatTimeToNow(date: Date): string {
	return formatDistanceToNowStrict(date, {
		addSuffix: true,
		locale: {
			...locale,
			formatDistance,
		},
	});
}

export function formatDate(input: string | number | Date): string {
	const date = new Date(input);
	return date.toLocaleDateString('id', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}

export async function urlToBlobFile(
	fileUrl: string | null,
	fileKey: string | null
) {
	if (!fileUrl || !fileKey) {
		return;
	}
	const response = await fetch(fileUrl);
	const blob = await response.blob();

	// Buat objek File dari Blob
	return new File([blob], fileKey, { type: blob.type });
}

export function capitalizeFirstLetter(string: string) {
	return string.toLowerCase().replace(/(^|\s)\S/g, function (firstLetter) {
		return firstLetter.toUpperCase();
	});
}

export function findNearestDateObject(dateObjects: any[]) {
	const currentDate = new Date();
	let smallestDifference = Infinity;
	let nearestDateObject = null;

	dateObjects.forEach((dateObject) => {
		const objectDate = new Date(dateObject.date);

		// Memeriksa apakah tanggal objek lebih besar dari tanggal saat ini
		if (objectDate.getTime() > currentDate.getTime()) {
			const difference = objectDate.getTime() - currentDate.getTime();
			if (difference < smallestDifference) {
				smallestDifference = difference;
				nearestDateObject = dateObject;
			}
		}
	});

	return nearestDateObject;
}
