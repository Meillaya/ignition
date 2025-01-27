import { cn } from "@/lib/utils"

interface PasswordStrengthIndicatorProps {
  password: string
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const getStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const strength = getStrength(password)
  const percentage = (strength / 5) * 100

  const getColor = () => {
    if (strength <= 2) return "bg-red-500"
    if (strength <= 3) return "bg-yellow-500"
    if (strength <= 4) return "bg-blue-500"
    return "bg-green-500"
  }

  const getMessage = () => {
    if (strength <= 2) return "Weak"
    if (strength <= 3) return "Fair"
    if (strength <= 4) return "Good"
    return "Strong"
  }

  if (!password) return null

  return (
    <div className="space-y-2">
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-300", getColor())}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className={cn(
        "text-xs",
        strength <= 2 ? "text-red-500" :
        strength <= 3 ? "text-yellow-500" :
        strength <= 4 ? "text-blue-500" :
        "text-green-500"
      )}>
        Password strength: {getMessage()}
      </p>
    </div>
  )
}