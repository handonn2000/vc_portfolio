import { useState, useRef, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    // Royalty-free space ambient track
    // Source: Pixabay (Space Atmosphere)
    const audioUrl = "https://cdn.pixabay.com/audio/2022/11/22/audio_febc508520.mp3"

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e))
            }
            setIsPlaying(!isPlaying)
        }
    }

    useEffect(() => {
        // Set initial volume to be subtle
        if (audioRef.current) {
            audioRef.current.volume = 0.3

            // Attempt autoplay immediately
            const playPromise = audioRef.current.play()

            if (playPromise !== undefined) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch((error) => {
                        console.log("Autoplay prevented. Waiting for interaction.", error)
                        setIsPlaying(false)

                        // Fallback: Play on first interaction
                        const handleInteraction = () => {
                            if (audioRef.current) {
                                audioRef.current.play()
                                    .then(() => {
                                        setIsPlaying(true)
                                        // Remove listeners once played
                                        document.removeEventListener('click', handleInteraction)
                                        document.removeEventListener('keydown', handleInteraction)
                                    })
                                    .catch(e => console.log("Interaction play failed:", e))
                            }
                        }

                        document.addEventListener('click', handleInteraction)
                        document.addEventListener('keydown', handleInteraction)
                    })
            }
        }
    }, [])

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <button
                onClick={togglePlay}
                className={`
                    glass-panel p-3 rounded-full transition-all duration-300
                    hover:scale-110 hover:bg-white/10
                    ${isPlaying ? 'border-accent-neon/50 shadow-[0_0_15px_rgba(0,221,57,0.3)]' : 'border-white/10'}
                `}
                aria-label={isPlaying ? "Mute Music" : "Play Music"}
            >
                {isPlaying ? (
                    <Volume2 className="w-6 h-6 text-accent-neon animate-pulse-slow" />
                ) : (
                    <VolumeX className="w-6 h-6 text-nature-400" />
                )}
            </button>
            <audio
                ref={audioRef}
                src={audioUrl}
                loop
                preload="auto"
                autoPlay
            />
        </div>
    )
}
