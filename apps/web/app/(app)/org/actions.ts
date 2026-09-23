'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'
import { createOrganization } from '@/dal/create-organization'
import { getCurrentOrganization } from '@/lib/get-current-organization'
import { updateOrganization } from '@/dal/update-organization'
import { revalidateTag } from 'next/cache'

const organizationSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Please, include at least 4 characters.' }),
    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (value) {
            const domainRegex = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

            return domainRegex.test(value)
          }

          return true
        },
        {
          message: 'Please, enter a valid domain.',
        }
      ),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === true || value === 'on')
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false
      }

      return true
    },
    {
      message: 'Domain is required when auto-join is enabled.',
      path: ['domain'],
    }
  )

export type OrganizationSchema = z.infer<typeof organizationSchema>

export async function createOrganizationAction(data: FormData) {
  const organizationParse = organizationSchema.safeParse(
    Object.fromEntries(data)
  )

  if (!organizationParse.success) {
    const errors = organizationParse.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { name, domain, shouldAttachUsersByDomain } = organizationParse.data

    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
    })

    revalidateTag('organizations', 'max')
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.data

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error. Try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization',
    errors: null,
  }
}

export async function updateOrganizationAction(data: FormData) {
  const currentOrg = await getCurrentOrganization()

  const organizationParse = organizationSchema.safeParse(
    Object.fromEntries(data)
  )

  if (!organizationParse.success) {
    const errors = organizationParse.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    const { name, domain, shouldAttachUsersByDomain } = organizationParse.data

    await updateOrganization({
      orgSlug: currentOrg!,
      name,
      domain,
      shouldAttachUsersByDomain,
    })

    revalidateTag('organizations', 'max')
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.data

      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: 'Unexpected error. Try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization',
    errors: null,
  }
}
