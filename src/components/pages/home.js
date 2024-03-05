import React, { useState } from 'react'
import styled from 'styled-components'

import Layout from '../layout/layout'
import Container from '../layout/container'

const StyledHome = styled.div`
  display: flex;
  .nav {
    display: flex;
    width: 250px;
    flex-shrink: 0;
    &__primary {
      flex-grow: 1;
      &__title {
        font-size: ${props => props.theme.typography.sizeLarger};
        font-weight: 400;
        color: ${props => props.theme.colors.secondary};
        margin-bottom: 10px;
      }
      &__item {
        
      }
    }
    &__secondary {
      width: 50px;
    }
  }
  .content {
    flex-grow: 1;
    &__header {}
    &__body {}
  }
`

const StyledHomeNavItem = styled.div`
  margin-bottom: 10px;
  height: 100px;
  padding: 10px;
  cursor: pointer;
  font-size: ${props => props.theme.typography.sizeMedium};
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.active ? props.theme.colors.highlight : props.theme.colors.primary1};
  &:hover {
    border-color: ${props => props.active ? props.theme.colors.highlight : props.theme.colors.secondary};
  }
`

const enumHomeSectionNews = 'NEWS'
const enumHomeSectionShows = 'SHOWS'
const enumHomeSectionGames = 'GAMES'
const enumHomeSectionMusic = 'MUSIC'

const Home = () => {
  const [activeSection, setActiveSection] = useState(enumHomeSectionNews)

  const handleClickNavItem = (e, section) => {
    e.preventDefault()
    setActiveSection(section)
  }
  return (
    <Layout>
      <Container>
        <StyledHome>
          <div className="nav">
            <div className="nav__primary">
              <div className="nav__primary__title">MENU</div>
              <StyledHomeNavItem active={activeSection === enumHomeSectionNews ? true : false} onClick={e => handleClickNavItem(e, enumHomeSectionNews)}>
                {enumHomeSectionNews}
              </StyledHomeNavItem>
              <StyledHomeNavItem active={activeSection === enumHomeSectionShows ? true : false} onClick={e => handleClickNavItem(e, enumHomeSectionShows)}>
                {enumHomeSectionShows}
              </StyledHomeNavItem>
              <StyledHomeNavItem active={activeSection === enumHomeSectionGames ? true : false} onClick={e => handleClickNavItem(e, enumHomeSectionGames)}>
                {enumHomeSectionGames}
              </StyledHomeNavItem>
              <StyledHomeNavItem active={activeSection === enumHomeSectionMusic ? true : false} onClick={e => handleClickNavItem(e, enumHomeSectionMusic)}>
                {enumHomeSectionMusic}
              </StyledHomeNavItem>
            </div>
            <div className="nav__secondary">
            </div>
          </div>
        </StyledHome>
      </Container>
    </Layout>
  )
}

export default Home
