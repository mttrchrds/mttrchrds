import React, { useRef } from 'react'
import styled from 'styled-components'
import { Tooltip, ResponsiveContainer, Treemap, TooltipProps } from 'recharts'
import {
  ValueType,
  NameType,
} from 'recharts/types/component/DefaultTooltipContent'

import { GameCategory } from '../../../types/stats'

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
      <StyledCustomTooltip>{`${payload[0].payload.name}: ${payload[0].value} game(s)`}</StyledCustomTooltip>
    )
  }

  return null
}

const StyledGameCategories = styled.div`
  padding-top: 20px;
`

interface GameCategoriesProps {
  payload: GameCategory[]
}

const GameCategories: React.FC<GameCategoriesProps> = ({ payload }) => {
  const renderChart = () => {
    return (
      <ResponsiveContainer width="100%" height={600}>
        <Treemap
          width={400}
          height={200}
          data={payload}
          dataKey="total"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#9d60d1"
        >
          <Tooltip content={<CustomTooltip />} />
        </Treemap>
      </ResponsiveContainer>
    )
  }

  return <StyledGameCategories>{renderChart()}</StyledGameCategories>
}

export default GameCategories
