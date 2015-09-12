import React from 'react'
import ReactDOM from 'react-dom'
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
		addTile: React.PropTypes.bool,
		styles: React.PropTypes.object,
	}

	static defaultProps = {
		tag: 'div',
		addTile: true,
	}

	componentDidMount() {
		this.computeContent()
	}

	componentWillReceiveProps(nextProps) {
		if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
			this.setState({content: nextProps.content})
		}
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
			let content = this.state.content
			if (this.props.addTile) {
				dom.title = content
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
						if (content[content.length -1] !== ' ') {
							const lastIndex = content.lastIndexOf(' ')
							if (lastIndex !== -1) {
								content = content.slice(0, lastIndex)
							}
						}
						content += '...'
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
			onClick: () => {
				this.forceUpdate()
			},
		}
		return React.createElement(this.props.tag, props,
			this.state.content)
	}
}
