'use server'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const CreateInvoiceSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string()
})
const CreateInvoiceFormSchema = CreateInvoiceSchema.omit({
    id: true,
    date: true
})

export async function createInvoice(formData: FormData) {
    const rawFormData = {
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    }
    // const rawFormData = Object.fromEntries(formData.entries())
    const { customerId, amount, status } = CreateInvoiceFormSchema.parse(rawFormData)
    const amountInCents = amount * 100
    const [ date ] = new Date().toISOString().split('T')

    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `

    const newPath = '/dashboard/invoices'
    revalidatePath(newPath)
    redirect(newPath)
}