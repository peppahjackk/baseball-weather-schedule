import React from 'react'
import { Table } from 'semantic-ui-react'
import styles from '../styles'

export default class PrecipPercent extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return(
      <Table.Cell>
        {Math.round(this.props.data.daily.data[this.props.day].precipProbability * 100)} %
      </Table.Cell>
    )
  }
}