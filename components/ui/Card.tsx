import { ReactNode } from 'react'
import clsx from 'clsx'

export function Card({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={clsx('rounded border p-4 bg-white dark:bg-slate-950 dark:border-slate-800', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <div className="mb-2 font-semibold">{children}</div>
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="text-sm">{children}</div>
}
