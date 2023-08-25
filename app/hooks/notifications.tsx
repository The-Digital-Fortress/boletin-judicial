import { useContext } from 'react'
import { NotificationContext } from '~/context/notificationContext'

export default function useNotification() {
  const { notify, notification } = useContext(NotificationContext)

  return { notify, notification }
}
