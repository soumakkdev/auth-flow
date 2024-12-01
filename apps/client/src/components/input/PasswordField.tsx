import { cn } from '@/lib/utils'
import { Eye, EyeClosed, Lock } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface PasswordFieldProps extends React.ComponentProps<'input'> {
	label?: string
	showLockIcon?: boolean
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
	({ label, className, showLockIcon, id, ...props }, ref) => {
		const [passwordVisible, setPasswordVisible] = useState(false)

		return (
			<div className="space-y-2">
				{label ? <Label htmlFor={id}>{label}</Label> : null}
				<div className="relative">
					<Input
						ref={ref}
						type={passwordVisible ? 'text' : 'password'}
						className={cn(className, { 'ps-12': showLockIcon })}
						id={id}
						{...props}
					/>

					{showLockIcon ? (
						<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-5 text-muted-foreground/80 peer-disabled:opacity-50">
							<Lock size={16} />
						</div>
					) : null}

					<div
						className="cursor-pointer absolute inset-y-0 end-0 flex items-center justify-center pe-5 text-muted-foreground/80 peer-disabled:opacity-50"
						onClick={() => setPasswordVisible((v) => !v)}
					>
						{passwordVisible ? (
							<EyeClosed size={18} strokeWidth={2} aria-hidden="true" />
						) : (
							<Eye size={18} strokeWidth={2} aria-hidden="true" />
						)}
					</div>
				</div>
			</div>
		)
	}
)

export default PasswordField
