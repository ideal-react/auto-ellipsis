import React from 'react'
import expect from 'expect'
import jsdom from 'mocha-jsdom'
import TestUtils from 'react-addons-test-utils'
import AutoEllipsis from '../../src/'

describe('React', () => {
	describe('AutoEllipsis', () => {
		jsdom()

		const content = 'auto-ellipsis is a React component for truncation when content overlength. It use DOM range to compute the ideal endPoint of content.'
		const sliceContent = 'auto-ellipsis is a React component for truncation when content overlength. It use DOM range to compute the ideal endPoint ...'
		const props = {content}

		it('should have content props', () => {
			expect(() => TestUtils.renderIntoDocument(
				<AutoEllipsis {...props} />
			)).toNotThrow()
		})
	})
})
