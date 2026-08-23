'use client'
import { Crepe } from '@milkdown/crepe'
import '@milkdown/crepe/theme/common/style.css'
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

type Props = {
	readonly: boolean
	value: string
	onChange?: (value: string) => void
}

const CrepeEditor = ({ readonly, value, onChange }: Props) => {
	// bug: theme is only set on page load, no toggle :(
	const { resolvedTheme } = useTheme()

	useEffect(() => {
		if (resolvedTheme === 'dark') {
			import('@milkdown/crepe/theme/frame-dark.css')
		} else {
			import('@milkdown/crepe/theme/frame.css')
		}
	}, [resolvedTheme])

	useEditor((root) => {
		const crepe = new Crepe({
			root,
			defaultValue: value,
			features: {
				[Crepe.Feature.TopBar]: true,
				[Crepe.Feature.Toolbar]: false,
				[Crepe.Feature.BlockEdit]: false,
			},
		})

		crepe.setReadonly(readonly)

		crepe.on((listener) => {
			listener.markdownUpdated((_, markdown) => {
				onChange?.(markdown)
			})
		})

		return crepe
	})

	return <Milkdown />
}

export default function MilkDown({ readonly, value, onChange }: Props) {
	return (
		<MilkdownProvider>
			<CrepeEditor readonly={readonly} value={value} onChange={onChange} />
		</MilkdownProvider>
	)
}

// https://milkdown.dev/docs/recipes/react#react-integration
// https://milkdown.dev/docs/guide/using-crepe
