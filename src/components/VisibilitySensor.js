import React from 'react'
import PropTypes from 'prop-types'

function VisibilitySensor(props) {
  const { onEnter, children } = props

  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    onEnter()
  }, [page])

  const sensorRef = React.useRef(null)

  const handleObserver = (entities) => {
    const target = entities[0]
    if (target.isIntersecting) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  React.useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0
    }
    const observer = new window.IntersectionObserver(handleObserver, options)
    if (sensorRef.current) {
      observer.observe(sensorRef.current)
    }
  }, [])

  return <div ref={sensorRef}>{children}</div>
}

VisibilitySensor.propTypes = {
  onEnter: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}

export default VisibilitySensor
