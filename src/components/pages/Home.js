import React from 'react'
import styled from 'styled-components'

import Layout from '../layout/Layout'
import BadaBing from '../BadaBing'

const StyledHome = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .home-bada-bing {
  }
  .home-nav {
    display: flex;
    justify-content: center;
    color: ${props => props.theme.colors.white};
    margin-top: 30px;
    &__item {
      font-size: 12px;
      a {
        &:link,
        &:visited,
        &:active {
          color: ${props => props.theme.colors.white};
        }
        &:hover {
          color: ${props => props.theme.colors.white};
          text-decoration: none;
        }
      }
    }
    &__divider {
      padding-right: 10px;
      padding-left: 10px;
      font-size: ${props => props.theme.typography.sizeSmall};
    }
  }
`

const Home = () => {
  return (
    <Layout>
      <StyledHome>
        <div className="home-bada-bing">
          <BadaBing />
        </div>
        <div className="home-nav">
          <div className="home-nav__item">
            <a href="https://twitter.com/mttrchrds" target="blank">
              Twitter
            </a>
          </div>
          <div className="home-nav__divider">|</div>
          <div className="home-nav__item">
            <a rel="me" href="https://mastodonapp.uk/@mttrchrds" target="blank">
              Mastodon
            </a>
          </div>
          <div className="home-nav__divider">|</div>
          <div className="home-nav__item">
            <a href="https://www.strava.com/athletes/mttrchrds" target="blank">
              Strava
            </a>
          </div>
        </div>
      </StyledHome>
    </Layout>
  )
}

export default Home
