import React, { useRef } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

import { demoColoursMixed } from '../../../helpers/colors'

import { ShowPlatformsYears as ShowPlatformsYearsType } from '../../../types/stats'

interface ShowPlatformsYearsProps {
  payload: ShowPlatformsYearsType
}

type CharDataBasic = {
  platform: string
  fullMark: number
}

type ChartData = CharDataBasic & {
  [key: string]: string | number
}

const ShowPlatformsYears: React.FC<ShowPlatformsYearsProps> = ({ payload }) => {
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
      platform: d.platform,
      fullMark: payload.highest,
    }

    d.years.map(y => {
      data[y.name] = y.total
    })

    return data
  })

  const renderRadars = () => {
    return payload.years.map(y => {
      const radar = (
        <Radar
          key={y}
          name={y}
          dataKey={y}
          stroke={demoColoursMixed[activeColourIndex.current]}
          fill={demoColoursMixed[activeColourIndex.current]}
          fillOpacity={0.2}
        />
      )
      activeColourIndex.current = generateActiveColourIndex(
        activeColourIndex.current,
      )
      return radar
    })
  }

  return (
    <ResponsiveContainer width="100%" height={600}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="platform" />
        <PolarRadiusAxis angle={30} domain={[0, payload.highest]} />
        {renderRadars()}
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default ShowPlatformsYears
