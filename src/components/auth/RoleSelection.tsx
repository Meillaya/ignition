import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Building2, Truck } from "lucide-react"

interface RoleSelectionProps {
  selectedRole: string | null
  onSelect: (role: 'client' | 'contractor') => void
  onSubmit: () => void
  isLoading?: boolean
}

export function RoleSelection({ selectedRole, onSelect, onSubmit, isLoading }: RoleSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card
            className={cn(
              "p-6 cursor-pointer transition-all duration-200 hover:shadow-lg",
              selectedRole === 'client' && "ring-2 ring-orange-500"
            )}
            onClick={() => onSelect('client')}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-full bg-orange-100 dark:bg-orange-900">
                <Building2 className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Client</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Need waste management services for your construction project
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card
            className={cn(
              "p-6 cursor-pointer transition-all duration-200 hover:shadow-lg",
              selectedRole === 'contractor' && "ring-2 ring-orange-500"
            )}
            onClick={() => onSelect('contractor')}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-full bg-orange-100 dark:bg-orange-900">
                <Truck className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Contractor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Provide waste management services to construction projects
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <Button
        className="w-full"
        onClick={onSubmit}
        disabled={!selectedRole || isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Creating account...</span>
          </div>
        ) : (
          "Continue"
        )}
      </Button>
    </div>
  )
}