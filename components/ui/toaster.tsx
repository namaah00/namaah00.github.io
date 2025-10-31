import { Toaster as Sonner } from "sonner@2.0.3"

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "bg-white border-slate-200 text-slate-900",
          description: "text-slate-600",
          actionButton:
            "bg-slate-900 text-white",
          cancelButton:
            "bg-slate-100 text-slate-900",
        },
      }}
    />
  )
}
