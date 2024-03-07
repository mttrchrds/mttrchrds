import React from 'react'
import styled from 'styled-components'

const StyledHomeNews = styled.div`
  .news-item {
    font-family: 'Silkscreen';
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid ${props => props.theme.colors.primary1};
    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: 0;
    }
    &__primary {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      &__title {
        font-size: ${props => props.theme.typography.sizeLarge};
        color: ${props => props.theme.colors.text1};
      }
      &__date {
        font-size: ${props => props.theme.typography.sizeLarge};
        color: ${props => props.theme.colors.text};
      }
    }
    &__secondary {
      font-size: ${props => props.theme.typography.sizeMedium};
      color: ${props => props.theme.colors.text};
    }
  }
`

const HomeNews = () => {
  return (
    <StyledHomeNews>
      <div className="news-item">
        <div className="news-item__primary">
          <div className="news-item__primary__title">Content arrives</div>
          <div className="news-item__primary__date">8 March 2024</div>
        </div>
        <div className="news-item__secondary">
          Shows and Games sections are now hooked up to the API to pull in the
          latest activities
        </div>
      </div>
      <div className="news-item">
        <div className="news-item__primary">
          <div className="news-item__primary__title">Website complete</div>
          <div className="news-item__primary__date">6 March 2024</div>
        </div>
        <div className="news-item__secondary">
          Website is now live, in the style of the Sevastolink terminal from
          Alien:Isolation 🤓. Next, hooking it up to the API for some content...
        </div>
      </div>
    </StyledHomeNews>
  )
}

HomeNews.defaultProps = {}

HomeNews.propTypes = {}

export default HomeNews
