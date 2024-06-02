import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import Spinner from './spinner'

interface StyledImageProps {
  $displayImage: boolean
  $containerWidth: number
  $containerHeight: number
}

const StyledImage = styled.div<StyledImageProps>`
  position: relative;
  width: ${props => props.$containerWidth}px;
  height: ${props => props.$containerHeight}px;
  img {
    visibility: ${props => (props.$displayImage ? 'visible' : 'hidden')};
  }
  .image-loading-container {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

interface ImageProps {
  width: number
  height: number
  src: string
  fillSpace?: boolean
  altText?: string
}

const Image: React.FC<ImageProps> = ({
  width,
  height,
  src,
  fillSpace = true,
  altText,
}) => {
  const componentRef = useRef<HTMLDivElement>(null)

  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (
      fillSpace &&
      componentRef.current &&
      componentRef.current.parentElement
    ) {
      const parentWidth = componentRef.current.parentElement.clientWidth
      const aspectRatio = width / height
      const renderedHeight = parentWidth / aspectRatio
      setContainerWidth(parentWidth)
      setContainerHeight(renderedHeight)
    } else {
      setContainerWidth(width)
      setContainerHeight(height)
    }
  }, [])

  return (
    <StyledImage
      $displayImage={imageLoaded}
      $containerWidth={containerWidth}
      $containerHeight={containerHeight}
      ref={componentRef}
    >
      {!imageLoaded && (
        <div className="image-loading-container">
          <Spinner />
        </div>
      )}
      <img src={src} onLoad={() => setImageLoaded(true)} alt={altText} />
    </StyledImage>
  )
}

export default Image
