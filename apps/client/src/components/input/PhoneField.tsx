'use client'
import { useState } from 'react'
import { defaultCountries, FlagImage, parseCountry, usePhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function PhoneField() {
	const [value, onChange] = useState('')
	const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
		defaultCountry: 'us',
		value,
		countries: defaultCountries,
		onChange: (data) => {
			onChange(data.phone)
		},
	})

	return (
		<div className="border flex items-center gap-3 rounded-xl px-5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
			<Select value={country.iso2} onValueChange={(value) => setCountry(value)}>
				<SelectTrigger className="border-0 w-16 p-0 focus:ring-0 focus:ring-offset-0">
					<SelectValue>
						<FlagImage iso2={country.iso2} />
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					{defaultCountries?.map((c) => {
						const country = parseCountry(c)
						return (
							<SelectItem key={country.iso2} value={country.iso2}>
								<div className="flex items-center gap-2">
									<FlagImage iso2={country.iso2} className="mr-2" />
									<span>{country.name}</span>
									<span className="text-muted-foreground">(+{country.dialCode})</span>
								</div>
							</SelectItem>
						)
					})}
				</SelectContent>
			</Select>

			<div className="h-8 w-[1px] bg-border"></div>

			<Input
				ref={inputRef}
				placeholder="Enter your phone number"
				type="tel"
				value={inputValue}
				onChange={handlePhoneValueChange}
				className="border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
			/>
		</div>
	)
}
