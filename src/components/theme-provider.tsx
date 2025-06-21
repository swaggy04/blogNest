"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"       // IMPORTANT
      defaultTheme="system"  // optional, but good
      enableSystem           
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
