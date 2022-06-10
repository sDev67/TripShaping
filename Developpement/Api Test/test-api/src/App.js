import React, { Component } from 'react'
import './App.css'
import { getStepOne, getNegativeStep, getAllStep } from './Etapes'

const renderLine = (step, key) => <li key={key}><b>{key}</b>: {step[key]}</li>

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { step: {}, negativeStep: {}, allSteps: {} }

  }

  componentDidMount() {
    getStepOne().then(data => {
      this.setState({ step: data.entity })
    })

    getNegativeStep().then(data => {
      this.setState({ negativeStep: data.entity })
    })

    getAllStep().then(data => {
      this.setState({ allSteps: data.entity })
    })
  }

  render() {
    const { step } = this.state
    const { negativeStep } = this.state
    const { allSteps } = this.state
    return (
      <div className='App'>
        <div>

          <ul style={{ listStyle: 'none' }}>
            <b>Etape 1</b>
            {
              // Loop over the object keys and render each key
              Object.keys(step).map(key => renderLine(step, key))
            }
          </ul>

        </div>
        <br />
        <ul style={{ listStyle: 'none' }}>
          {
            // Loop over the object keys and render each key
            <li><b>Etape à l'index -1 : </b>{Object.values(negativeStep)}</li>
          }
        </ul>
        <br />
        <ul style={{ listStyle: 'none' }}>
          {
            <li><b>Nombre d'étapes total :</b> {allSteps.length}</li>
          }
        </ul>
      </div>
    )
  }
}

export default App;