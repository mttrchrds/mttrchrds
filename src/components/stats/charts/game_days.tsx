import React, { useRef } from 'react'
import styled from 'styled-components'
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  TooltipProps,
} from 'recharts'
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent'

import { demoColours } from '../../../helpers/colors'

import { GameDay } from '../../../types/stats'

const StyledCustomTooltip = styled.div`
  background-color: white;
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid gray;
`

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <StyledCustomTooltip>{`${payload[0].name}: ${payload[0].value} day(s)`}</StyledCustomTooltip>
    )
  }

  return null
}

const StyledGameDays = styled.div`
  .recharts-legend-item {
    margin-bottom: 4px;
  }
  .recharts-legend-item-text {
    color: ${props => props.theme.colors.stats.text}!important;
  }
`

interface GameDaysProps {
  data: GameDay[]
}

interface GameDayWithColours extends GameDay {
  colour: string
}

const GameDays: React.FC<GameDaysProps> = ({ data }) => {
  const activeColourIndex = useRef(0)

  const generateActiveColourIndex = (currentIndex: number) => {
    const totalColours = demoColours.length
    if (currentIndex === totalColours - 1) {
      return 0
    } else {
      return currentIndex + 1
    }
  }

  const parsedData: GameDayWithColours[] = data.map(d => {
    const payload = {
      ...d,
      colour: demoColours[activeColourIndex.current],
    }
    activeColourIndex.current = generateActiveColourIndex(
      activeColourIndex.current,
    )
    return payload
  })

  const renderChart = () => {
    return (
      <ResponsiveContainer width="100%" height={600}>
        <PieChart>
          <Pie data={parsedData} dataKey="total">
            {parsedData.map(entry => (
              <Cell key={entry.id} fill={entry.colour} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend layout="vertical" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  return <StyledGameDays>{renderChart()}</StyledGameDays>
}

export default GameDays
