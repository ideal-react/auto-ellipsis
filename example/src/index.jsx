import React from 'react'
import ReactDOM from 'react-dom'
import AutoEllipsis from '../../src/'
import styles from './index.css'

const props = {
	content: 'auto-ellipsis is a React component for truncation when content overlength. It use DOM range to compute the ideal endPoint of content.',
	styles,
}

ReactDOM.render(<AutoEllipsis {...props} />,
	document.getElementById('auto-ellipsis-wrap'))
