import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const TimelineContext = createContext()

const TimelineProvider = props => {
  const [activeActivity, setActiveActivity] = useState(null)
  const [activeActivityLoading, setActiveActivityLoading] = useState(false)
  const [currentDay, setCurrentDay] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(null)
  const [currentYear, setCurrentYear] = useState(null)

  return (
    <TimelineContext.Provider
      value={{
        activeActivity,
        setActiveActivity,
        activeActivityLoading,
        setActiveActivityLoading,
        currentDay,
        setCurrentDay,
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
      }}
    >
      {props.children}
    </TimelineContext.Provider>
  )
}

TimelineProvider.propTypes = {
  children: PropTypes.node,
}

export default TimelineProvider
