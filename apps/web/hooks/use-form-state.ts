import { ChangeEvent, useState, useTransition } from 'react'

interface FormState {
  success: boolean
  message: null
  errors: Record<string, string[]> | null
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState
) {
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    }
  )

  async function handleSubmit(evt: ChangeEvent<HTMLFormElement>) {
    evt.preventDefault()

    const form = evt.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const newFormState = await action(data)

      if (newFormState.success && onSuccess) {
        await onSuccess()
      }

      setFormState(newFormState)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
