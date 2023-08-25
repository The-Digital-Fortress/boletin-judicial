import { createContext, useState } from 'react'

const defaultNotificationValues = {
  notify: any => {},
  notification: {
    message: '',
    type: '',
    show: false,
  },
}

const setNotificationContext = () => {
  const [notification, setNotification] = useState(defaultNotificationValues.notification)

  function closeNotification() {
    setTimeout(() => {
      setNotification({
        message: '',
        type: '',
        show: false,
      })
    }, 4000)
  }

  function notify(notification) {
    setNotification(notification)
    closeNotification()
  }

  return { notify, notification }
}

export const NotificationContext = createContext(defaultNotificationValues)

export const NotificationProvider = ({ children }) => {
  const context = setNotificationContext()

  return <NotificationContext.Provider value={context}>{children}</NotificationContext.Provider>
}
