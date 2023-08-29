import React from 'react'
import { useIsSubmitting } from 'remix-validated-form'

type SubmitBtnProps = {
  className?: string
}

export default function SubmitBtn({ className }: SubmitBtnProps) {
  const isSubmitting = useIsSubmitting()

  return (
    <button type='submit' disabled={isSubmitting} className={className}>
      {isSubmitting ? 'Guardando...' : 'Guardar'}
    </button>
  )
}
