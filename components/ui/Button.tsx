import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const base = 'inline-flex items-center justify-center rounded font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 disabled:opacity-60 disabled:cursor-not-allowed'
const sizes = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5'
}
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-900',
  ghost: 'hover:bg-gray-100 dark:hover:bg-slate-900'
}

export function Button({ className, variant = 'primary', size='md', ...props }: Props) {
  return <button className={clsx(base, sizes[size], variants[variant], className)} {...props} />
}
