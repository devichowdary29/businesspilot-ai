"use client"

interface PasswordStrengthProps {
  password?: string
}

export function PasswordStrength({ password = "" }: PasswordStrengthProps) {
  const getStrength = (pass: string) => {
    let score = 0
    if (!pass) return { score: 0, label: "", color: "bg-muted" }
    if (pass.length > 8) score += 1
    if (/[A-Z]/.test(pass)) score += 1
    if (/[0-9]/.test(pass)) score += 1
    if (/[^A-Za-z0-9]/.test(pass)) score += 1

    if (score <= 1) return { score, label: "Weak", color: "bg-red-500" }
    if (score === 2) return { score, label: "Fair", color: "bg-amber-500" }
    if (score === 3) return { score, label: "Strong", color: "bg-emerald-500" }
    return { score, label: "Excellent", color: "bg-emerald-500" }
  }

  const { score, label, color } = getStrength(password)

  if (!password) return null

  return (
    <div className="mt-2 space-y-1.5 animate-in fade-in duration-300">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-muted-foreground">Password strength</span>
        <span className={color.replace("bg-", "text-")}>{label}</span>
      </div>
      <div className="flex gap-1 h-1.5">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-full flex-1 rounded-full transition-colors duration-300 ${
              score >= level ? color : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
