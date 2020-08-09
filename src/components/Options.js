import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MOOD } from '../assets/mood'

const Options = ({ onSelect }) => (
  <div>
    {MOOD.options.map((o) => (
      <button
        key={o.id}
        className={`btn btn-xl ${o.buttonClass} ${o.hoverEffect}`}
        onClick={() => onSelect(o.id)}
      >
        {o.label}
        {o.faIcon && (
          <span>
            {' '}
            <FontAwesomeIcon icon={o.faIcon} className="hvr-icon" />
          </span>
        )}
      </button>
    ))}
  </div>
)

export default Options
