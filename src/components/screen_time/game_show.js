import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { mqMin } from '../../helpers/media_queries'

const StyledGameShow = styled.div`
`

const GameShow = props => {
  return (
    <StyledGameShow>
      [DETAIL]
    </StyledGameShow>
  )
}

GameShow.defaultProps = {

}

GameShow.propTypes = {
  showId: PropTypes.string,
  gameId: PropTypes.string,
}

export default GameShow
