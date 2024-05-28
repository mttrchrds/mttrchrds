import React from 'react'

interface RatingEmojiProps {
  rating: number
}

const RatingEmoji: React.FC<RatingEmojiProps> = ({ rating }) => {
  if (rating === 10) {
    return <>🥇</>
  }
  if (rating === 9) {
    return <>🥈</>
  }
  if (rating === 8) {
    return <>🥉</>
  }
  if (rating < 6) {
    return <>👎</>
  }
  return null
}

export default RatingEmoji
