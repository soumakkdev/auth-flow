import { AuthProvider } from '@/lib/AuthContext'
import React, { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
	return <AuthProvider>{children}</AuthProvider>
}
