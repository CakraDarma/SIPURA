'use client';

import { Prisma, Pura } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/Command';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { Users } from 'lucide-react';

const SearchBar = () => {
	const [input, setInput] = useState<string>('');
	const pathname = usePathname();
	const commandRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useOnClickOutside(commandRef, () => {
		setInput('');
	});

	const request = debounce(async () => {
		refetch();
	}, 300);

	const debounceRequest = useCallback(() => {
		request();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const {
		isFetching,
		data: queryResults,
		refetch,
		isFetched,
	} = useQuery({
		queryFn: async () => {
			if (!input) return [];
			const { data } = await axios.get(`/api/search?q=${input}`);
			return data as (Pura & {
				_count: Prisma.PuraCountOutputType;
			})[];
		},
		queryKey: ['search-query'],
		enabled: false,
	});

	useEffect(() => {
		setInput('');
	}, [pathname]);

	return (
		<Command
			ref={commandRef}
			className='relative border max-w-sm z-50 overflow-visible'
		>
			<CommandInput
				isLoading={isFetching}
				onValueChange={(text) => {
					setInput(text);
					debounceRequest();
				}}
				value={input}
				className='outline-none border-none focus:border-none focus:outline-none ring-0 h-[25px] placeholder:text-xs'
				placeholder='Cari Pura...'
			/>

			{input.length > 0 && (
				<CommandList className='absolute bg-white top-full inset-x-0 shadow rounded-b-md'>
					{isFetched && <CommandEmpty>Pencarian tidak ditemukan.</CommandEmpty>}
					{(queryResults?.length ?? 0) > 0 ? (
						<CommandGroup heading='Pura'>
							{queryResults?.map((pura) => (
								<CommandItem
									onSelect={(e) => {
										router.push(`/r/${e}`);
										router.refresh();
									}}
									key={pura.id}
									value={pura.name}
								>
									<Users className='mr-2 h-4 w-4' />
									<a href={`/r/${pura.name}`}>{pura.name}</a>
								</CommandItem>
							))}
						</CommandGroup>
					) : null}
				</CommandList>
			)}
		</Command>
	);
};

export default SearchBar;
