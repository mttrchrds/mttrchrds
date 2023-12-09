import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import _get from 'lodash/get'

import { mqMin } from '../../helpers/media_queries'

import { LayoutContext } from '../layout/layout'

const StyledGameShow = styled.div`
  position: sticky;
  top: 0;
  .game-show {
    &__image {
      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
    }
  }
`

const GameShow = () => {
  const { activeGameShow, activeGameShowLoading } = useContext(LayoutContext)

  console.log({activeGameShow})

  const renderActiveGameShow = () => {
    return (
      <div className="game-show">
        <div className="game-show__image"><img src={_get(activeGameShow, ['image_url'])} /></div>
      </div>
    )
  }

  const renderContent = () => {
    if (activeGameShowLoading) {
      return 'Loading...'
    }
    
    if (activeGameShow) {
      return renderActiveGameShow()
    }

    return 'Blank state'
  }
  return (
    <StyledGameShow>
      {renderContent()}
    </StyledGameShow>
  )
}

GameShow.defaultProps = {}

GameShow.propTypes = {}

export default GameShow
