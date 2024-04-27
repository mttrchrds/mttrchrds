import React from 'react'
import styled from 'styled-components'
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { GameDay } from '../../../types/stats'

const StyledGameDays = styled.div``

interface GameDaysProps {
  data: GameDay[]
}

const GameDays: React.FC<GameDaysProps> = ({ data }) => {
  console.log({ data })
  const renderChart = () => {
    return (
      <ResponsiveContainer width={800} height={600}>
        <BarChart
          width={800}
          height={600}
          data={data}
          // margin={{
          //   top: 5,
          //   right: 30,
          //   left: 20,
          //   bottom: 5,
          // }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          {/* <Tooltip />
          <Legend /> */}
          <Bar
            dataKey="total"
            barSize={30}
            fill="#8884d8"
            // activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return <StyledGameDays>{renderChart()}</StyledGameDays>
}

export default GameDays
