'use client'

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import * as changeCase from 'change-case'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

type HeaderCase = 'sentence' | 'upper' | 'lower' | 'capital' | 'camel' | 'snake' | 'kebab' | 'constant'

const caseTransformers: Record<HeaderCase, (s: string) => string> = {
	sentence: changeCase.sentenceCase,
	upper: (s) => changeCase.constantCase(s).replace(/_/g, ' '),
	lower: (s) => changeCase.snakeCase(s).replace(/_/g, ' '),
	capital: changeCase.capitalCase,
	camel: changeCase.camelCase,
	snake: changeCase.snakeCase,
	kebab: changeCase.kebabCase,
	constant: changeCase.constantCase,
}

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	headerCase?: HeaderCase
}

export function DataTable<TData, TValue>({
	columns,
	data,
	headerCase = 'sentence',
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	const transform = caseTransformers[headerCase]

	return (
		<div className='overflow-hidden rounded-md border'>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const colDef = columns.find(
									(c) => ('accessorKey' in c ? c.accessorKey : c.id) === header.column.id,
								) as (ColumnDef<TData, TValue> & { accessorKey?: string }) | undefined

								const resolvedHeader =
									colDef?.header ?? transform(colDef?.accessorKey ?? header.id)

								return (
									<TableHead
										key={header.id}
										style={{
											width: header.getSize() !== 150 ? header.getSize() : undefined,
										}}
									>
										{header.isPlaceholder ? null : flexRender(resolvedHeader, header.getContext())}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ?
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										style={{
											width:
												cell.column.getSize() !== 150 ?
													cell.column.getSize()
												:	undefined,
										}}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					:	<TableRow>
							<TableCell colSpan={columns.length} className='h-24 text-center'>
								No results.
							</TableCell>
						</TableRow>
					}
				</TableBody>
			</Table>
		</div>
	)
}
