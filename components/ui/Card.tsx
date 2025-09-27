import { ReactNode } from 'react'

export function Card({ children, className }: { children: ReactNode, className?: string }) {
  const baseClasses = 'rounded border p-4 bg-white dark:bg-slate-950 dark:border-slate-800'
  const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses
  
  return (
    <div className={combinedClasses}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode, className?: string }) {
  const baseClasses = 'mb-2 font-semibold'
  const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses
  
  return <div className={combinedClasses}>{children}</div>
}

export function CardContent({ children, className }: { children: ReactNode, className?: string }) {
  const baseClasses = 'text-sm'
  const combinedClasses = className ? `${baseClasses} ${className}` : baseClasses
  
  return <div className={combinedClasses}>{children}</div>
}