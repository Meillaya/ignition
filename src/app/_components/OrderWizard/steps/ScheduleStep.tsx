import type React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useWizard } from "../OrderWizard"
import { Button } from "@/app/_components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form"
import { Calendar } from "@/app/_components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/_components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

const scheduleSchema = z.object({
  scheduledDate: z.date({
    required_error: "Scheduled date is required",
  }),
})

const ScheduleStep: React.FC = () => {
  const { orderDetails, updateOrderDetails, nextStep } = useWizard()

  const form = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      scheduledDate: orderDetails.scheduledDate ? new Date(orderDetails.scheduledDate) : undefined,
    },
  })

  const onSubmit = (values: z.infer<typeof scheduleSchema>) => {
    updateOrderDetails({
      scheduledDate: format(values.scheduledDate, "yyyy-MM-dd"),
    })
    nextStep()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="scheduledDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Scheduled Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-[240px] pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
            Next
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ScheduleStep

