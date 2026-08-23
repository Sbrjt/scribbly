'use client'
import { useRef, useState } from 'react'
import { LuPause, LuPlay } from 'react-icons/lu'

export function SpeechButton({ content }: Props) {
	const [isPlaying, setIsPlaying] = useState(false)
	const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

	const handlePlayPause = () => {
		// Currently playing → pause
		if (isPlaying) {
			console.log('paused')

			speechSynthesis.pause()
			setIsPlaying(false)
			return
		}

		// Currently paused → resume
		if (utteranceRef.current && speechSynthesis.paused) {
			speechSynthesis.resume()
			setIsPlaying(true)
			return
		}

		// Start new speech
		speechSynthesis.cancel()

		const utterance = new SpeechSynthesisUtterance(content)

		utterance.onstart = () => {
			setIsPlaying(true)
		}

		utterance.onend = () => {
			utteranceRef.current = null
			setIsPlaying(false)
		}

		utterance.onerror = () => {
			utteranceRef.current = null
			setIsPlaying(false)
		}

		utteranceRef.current = utterance
		speechSynthesis.speak(utterance)
	}

	return (
		<button
			onClick={handlePlayPause}
			className='icon-btn'
			title={isPlaying ? 'Pause speech' : 'Play speech'}
		>
			{isPlaying ?
				<LuPause size={18} />
			:	<LuPlay size={18} />}
		</button>
	)
}

type Props = {
	content: string
}
