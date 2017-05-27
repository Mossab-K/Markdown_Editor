// REACT
import React from 'react'
import ReactDOM from 'react-dom'

// CSS
import './style/css/bootstrap.min.css'
import './index.css'

// JS
import { sampleText } from './sampleText'

// MARKED
import marked from 'marked'

class App extends React.Component {

	state = {
		text : sampleText
	}

	componentWillMount() {
		const text = localStorage.getItem('text')

		if (text)
			this.setState({text})
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('text', nextState.text)
	}

	editText(event) {
		const text = event.target.value
		this.setState({ text })
	}

	renderText(text) {
		const renderText = marked(text, {sanitize : true})
		return { __html : renderText }
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<textarea onChange={(e) => this.editText(e)} className="form-control" rows="35" value={this.state.text} >
							
						</textarea>
					</div>
					<div className="col-sm-6">
						<div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))