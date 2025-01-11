import React from 'react'

export default function InfoText({ label, text }: { label: string; text: string }) {
	return (
		<div className="space-y-1">
			<p className="uppercase text-sm text-muted-foreground">{label}</p>
			<p>{text}</p>
		</div>
	)
}
