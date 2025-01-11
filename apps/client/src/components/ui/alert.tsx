import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva('relative w-full flex items-center rounded-xl border px-4 py-4 gap-2', {
	variants: {
		variant: {
			default: 'bg-background text-foreground',
			error: 'border-destructive/80 bg-destructive/5 text-destructive dark:border-destructive ',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

const Alert = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
	<div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => (
		<h5 ref={ref} className={cn('text-sm leading-4 tracking-tight', className)} {...props} />
	)
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
	)
)
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
