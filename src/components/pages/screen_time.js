import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import _get from 'lodash/get'

import Layout from '../layout/layout'

const StyledScreenTime = styled.div`
  color: white;
  .shows {
    display: flex;
    &__item {
      margin-bottom: 30px;
      margin-right: 30px;
      &__name {
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 16px;
      }
      &__creator {
        margin-bottom: 10px;
        font-size: 14px;
      }
      &__img {
        max-width: 200px;
      }
    }
  }
`

const ScreenTime = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(`${process.env.API_DOMAIN}/api/shows/`)
      .then(function (response) {
        setData(_get(response, 'data'))
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  return (
    <Layout>
      <StyledScreenTime>
        <h2>Shows</h2>
        <div className="shows">
          {data.map(s => (
            <div className="shows__item" key={s.id}>
              <div className="shows__item__name">{_get(s, 'name')}</div>
              <div className="shows__item__creator">{_get(s, ['creator', 'name'])}</div>
              <img src={_get(s, 'image_url')} className="shows__item__img" />
            </div>
          ))}
        </div>
      </StyledScreenTime>
    </Layout>
  )
}

export default ScreenTime
