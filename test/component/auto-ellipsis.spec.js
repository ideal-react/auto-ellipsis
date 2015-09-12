import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import AutoEllipsis from '../../src/'
import styles from './auto-ellipsis.spec.css'

describe('React', () => {
	const root = document.body.appendChild(document.createElement('div'))
	root.style.visibility = 'hidden'

	describe('AutoEllipsis', () => {
		const content = 'auto-ellipsis is a React component for truncation when content overlength. It use DOM range to compute the ideal endPoint of content.'
		const sliceContent = 'auto-ellipsis is a React component for truncation when content overlength. It use DOM range to compute the ideal endPoint ...'
		const props = {content, styles}

		it('should be slice and add title by default', () => {
			const component = ReactDOM.render(<AutoEllipsis {...props} />,
				root)
			const dom = ReactDOM.findDOMNode(component)
			expect(dom.innerHTML).toEqual(sliceContent)
			expect(dom.title).toEqual(content)
		})

		it('should be slice and no title by set', () => {
			const component = ReactDOM.render(<AutoEllipsis {...props}
				addTitle={false} />, root)
			const dom = ReactDOM.findDOMNode(component)
			expect(dom.innerHTML).toEqual(sliceContent)
			expect(dom.title).toEqual('')
		})

		it('should be slice and tag is <p> by set', () => {
			const component = ReactDOM.render(<AutoEllipsis {...props}
				tag="p"/>, root)
			const dom = ReactDOM.findDOMNode(component)
			expect(dom.innerHTML).toEqual(sliceContent)
			expect(dom.tagName.toUpperCase()).toEqual('P')
		})
	})
})
