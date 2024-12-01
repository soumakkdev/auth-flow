import { forwardRef } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface InputFieldProps extends React.ComponentProps<'input'> {
	label?: string
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ label, id, ...props }, ref) => {
	return (
		<div className="space-y-2">
			{label ? <Label htmlFor={id}>{label}</Label> : null}
			<Input ref={ref} id={id} {...props} />
		</div>
	)
})

export default InputField
