import React, { useRef } from 'react'
import styled from 'styled-components'
import _get from 'lodash/get'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent'

import { demoColoursMixed } from '../../../helpers/colors'

import { ActivityMonths as ActivityMonthsType } from '../../../types/stats'

const StyledCustomTooltip = styled.div`
  background-color: white;
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid gray;
  .tooltip-title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  .tooltip-row {
    margin-bottom: 5px;
  }
`

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <StyledCustomTooltip>
        <p className="tooltip-title">{label}</p>
        {payload.map(p => {
          return (
            <p
              className="tooltip-row"
              key={p.name}
            >{`${p.name}: ${p.value} ${_get(p, 'value', 0) === 1 ? 'activity' : 'activities'}`}</p>
          )
        })}
      </StyledCustomTooltip>
    )
  }

  return null
}

const StyledActivityMonths = styled.div`
  .recharts-legend-item {
    margin-bottom: 4px;
  }
  .recharts-legend-item-text {
    color: ${props => props.theme.colors.stats.text}!important;
  }
  padding-top: 20px;
`

interface ActivityMonthsProps {
  payload: ActivityMonthsType
}

type CharDataBasic = {
  name: string
}

type ChartData = CharDataBasic & {
  [key: string]: string | number
}

const ActivityMonths: React.FC<ActivityMonthsProps> = ({ payload }) => {
  const activeColourIndex = useRef(0)

  const generateActiveColourIndex = (currentIndex: number) => {
    const totalColours = demoColoursMixed.length
    if (currentIndex === totalColours - 1) {
      return 0
    } else {
      return currentIndex + 1
    }
  }

  const chartData = payload.data.map(d => {
    const data: ChartData = {
      name: d.name,
    }

    d.years.map(y => {
      data[y.name] = y.total
    })

    return data
  })

  const renderLines = () => {
    return payload.years.map(y => {
      const radar = (
        <Line
          key={y}
          type="monotone"
          dataKey={y}
          stroke={demoColoursMixed[activeColourIndex.current]}
        />
      )
      activeColourIndex.current = generateActiveColourIndex(
        activeColourIndex.current,
      )
      return radar
    })
  }

  const renderChart = () => {
    return (
      <ResponsiveContainer width="100%" height={600}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {renderLines()}
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return <StyledActivityMonths>{renderChart()}</StyledActivityMonths>
}

export default ActivityMonths
