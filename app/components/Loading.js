import React from 'react'
import { Container, Grid, Header, Loader, Segment, Dimmer } from 'semantic-ui-react'
import PageHeader from './PageHeader'
import DetailsSkeleton from './DetailsSkeleton'
import styles from '../styles'

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
          <Grid.Row columns={3}>
            <Dimmer active>
              <Loader active size='large'>Grilling Hot Dogs...</Loader>
            </Dimmer>
            <DetailsSkeleton />
            <DetailsSkeleton />
            <DetailsSkeleton />   
          </Grid.Row>
    )
  }
}