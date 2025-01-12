// This would allow you to wrap the generated client from src/xata.ts with your own credentials
import { XataClient } from '@/xata'
export const xata = new XataClient({ apiKey: process.env.XATA_API_KEY })