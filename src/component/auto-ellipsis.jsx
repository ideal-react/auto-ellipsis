import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from './auto-ellipsis.css'

@CSSModules(styles)
export default class AutoEllipsis extends React.Component {
	static propTypes = {
		tag: React.PropTypes.string,
		content: React.PropTypes.string.isRequired,
		addTitle: React.PropTypes.bool,
		styles: React.PropTypes.object,
	}

	static defaultProps = {
		tag: 'div',
		addTitle: true,
	}

	componentDidMount() {
		this.computeContent()
	}

	shouldComponentUpdate(nextProps, nextState) {
		return JSON.stringify(this.props) !== JSON.stringify(nextProps)
	}

	componentDidUpdate() {
		this.computeContent()
	}

	computeContent() {
		const dom = ReactDOM.findDOMNode(this)
		let parentBottom = dom.getBoundingClientRect().bottom
		const style = document.defaultView.getComputedStyle(dom, null)
		parentBottom = parentBottom - parseFloat(style.paddingBottom) -
			parseFloat(style.borderBottomWidth)

		const range = document.createRange()
		range.selectNodeContents(dom)
		let bottom = range.getBoundingClientRect().bottom
		if (bottom > parentBottom) {
			let content = this.props.content
			if (this.props.addTitle) {
				dom.setAttribute('title', content)
			} else {
				dom.removeAttribute('title')
			}

			const container = dom.firstChild
			let endPoint = content.length - 1
			range.setStart(container, 0)
			while(endPoint >= 0) {
				range.setEnd(container, endPoint)
				bottom = range.getBoundingClientRect().bottom
				if (bottom <= parentBottom) {
					if (endPoint - 3 > 0) {
						content = content.slice(0, endPoint - 3)
						content += '...'
					} else {
						content = '...'
					}
					dom.innerHTML = content
					break
				}
				endPoint--
			}
		} else {
			dom.removeAttribute('title')
		}
	}

	render() {
		const props = {
			styleName: 'root',
		}
		const {tag, content} = this.props
		return React.createElement(tag, props, content)
	}
}
