import { SuggestedPrompt } from "./types"

interface SuggestedPromptsProps {
  prompts: SuggestedPrompt[]
  onSelect: (prompt: string) => void
}

export function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
      {prompts.map((prompt) => (
        <button
          key={prompt.id}
          onClick={() => onSelect(prompt.text)}
          className="flex items-center gap-2 rounded-xl border bg-card px-4 py-2.5 text-sm font-medium shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
        >
          <div className={`flex size-6 shrink-0 items-center justify-center rounded-full ${prompt.colorClass}`}>
            <prompt.icon className="size-3.5" />
          </div>
          {prompt.text}
        </button>
      ))}
    </div>
  )
}
