import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const ScreenTimeContext = createContext()

const ScreenTimeProvider = props => {
  const [activeGameShow, setActiveGameShow] = useState(null)
  const [activeGameShowLoading, setActiveGameShowLoading] = useState(false)
  const [currentDay, setCurrentDay] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(null)
  const [currentYear, setCurrentYear] = useState(null)

  return (
    <ScreenTimeContext.Provider value={{
      activeGameShow,
      setActiveGameShow,
      activeGameShowLoading,
      setActiveGameShowLoading,
      currentDay,
      setCurrentDay,
      currentMonth,
      setCurrentMonth,
      currentYear,
      setCurrentYear,
    }}>
      {props.children}
    </ScreenTimeContext.Provider>
  )
}

ScreenTimeProvider.propTypes = {
  children: PropTypes.node,
}

export default ScreenTimeProvider
