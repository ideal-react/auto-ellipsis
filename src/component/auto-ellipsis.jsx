import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './auto-ellipsis.css'

@CSSModules(styles)
export default class AutoEllipsis extends React.Component {
	constructor(props) {
		super(props)
		this.state = {content: props.content}
	}

	static propTypes = {
		tag: React.PropTypes.string,
		content: React.PropTypes.string.isRequired,
	}

	static defaultProps = {
		tag: 'div',
	}

	componentDidMount() {
		this.computeContent()
	}

	componentDidUpdate() {
		this.computeContent()
	}

	computeContent() {
		const dom = React.findDOMNode(this)
		let parentBottom = dom.getBoundingClientRect().bottom
		const style = document.defaultView.getComputedStyle(dom, null)
		parentBottom = parentBottom - parseFloat(style.paddingBottom) -
			parseFloat(style.borderBottomWidth)

		const range = document.createRange()
		range.selectNodeContents(dom)
		let bottom = range.getBoundingClientRect().bottom
		let content = this.state.content
		if (bottom > parentBottom) {
			dom.title = content
			const container = dom.firstChild
			let endPoint = content.length - 1
			range.setStart(container, 0)
			while(endPoint >= 0) {
				range.setEnd(container, endPoint)
				bottom = range.getBoundingClientRect().bottom
				if (bottom <= parentBottom) {
					if (endPoint - 3 > 0) {
						content = content.slice(0, endPoint - 3) + '...'
					} else {
						content = '...'
					}
					this.setState({content})
					break
				}
				endPoint--
			}
		}
	}

	render() {
		const props = {
			styleName: 'root',
		}
		return React.createElement(this.props.tag, props, this.state.content)
	}
}
