// Add Vercel Analytics type to the Window interface
interface Window {
  va?: (event: string, params: any) => void
}
