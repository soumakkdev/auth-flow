import { cn } from '@/lib/utils'
import { forwardRef, ReactNode } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface InputFieldProps extends React.ComponentProps<'input'> {
	label?: string
	startIcon?: ReactNode
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
	({ label, className, startIcon, id, ...props }, ref) => {
		return (
			<div className="space-y-2">
				{label ? <Label htmlFor={id}>{label}</Label> : null}
				<div className="relative">
					<Input ref={ref} className={cn(className, { 'ps-12': startIcon })} id={id} {...props} />

					{startIcon ? (
						<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-5 text-muted-foreground/80 peer-disabled:opacity-50">
							{startIcon}
						</div>
					) : null}
				</div>
			</div>
		)
	}
)

export default InputField
