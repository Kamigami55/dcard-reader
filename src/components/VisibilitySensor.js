import React from 'react'
import PropTypes from 'prop-types'

function VisibilitySensor(props) {
  const { onEnter, children } = props

  // entry object from IntersectionObserver, used to check visibility
  const [entry, setEntry] = React.useState({})

  // when this component is visible, call onEnter callback
  React.useEffect(() => {
    if (entry.isIntersecting) {
      onEnter()
    }
  }, [entry.isIntersecting])

  const sensorRef = React.useRef(null)

  const handleObserver = (entities) => {
    setEntry(entities[0])
  }

  // Set up IntersectionObserver
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
    return () => observer.disconnect()
  }, [])

  return <div ref={sensorRef}>{children}</div>
}

VisibilitySensor.propTypes = {
  /** Callback function, called when this component is visible */
  onEnter: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default VisibilitySensor
