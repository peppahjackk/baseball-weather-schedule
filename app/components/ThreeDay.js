import React, { Component } from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import PageHeader from './PageHeader'
import darkSkyHelper from '../utils/darkSkyHelper'



export default class ThreeDay extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  
  componentDidMount() {
    darkSkyHelper.getWeather('new_york')
    .then(function(info) {
      var data = darkSkyHelper.formatWeather(info, 3);
    return data;})
    .then(function(weatherData) { 
      this.setState({
        day1Date: weatherData.day1Date, 
        day1Weather: weatherData.day1PrecipPercent, 
        day2Date: weatherData.day2Date, 
        day2Weather: weatherData.day2PrecipPercent,
        day3Date: weatherData.day3Date,
        day3Weather: weatherData.day3PrecipPercent
        })
      }.bind(this))
  }
  
  render() {
    return (
      <Container>
        <Grid columns={3} centered>
          <PageHeader header={this.props.header} subheader={this.props.subheader} cols={3}></PageHeader>
          <Grid.Row>
            <Grid.Column width={3}>
              <h1>Map</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as='h3'>Monday</Header>
              <p>{this.state.day1Date}</p>
              <p>{this.state.day1Weather}</p>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>Tuesday</Header>
              <p>{this.state.day2Date}</p>
              <p>{this.state.day2Weather}</p>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>Wednesday</Header>
              <p>{this.state.day3Date}</p>
              <p>{this.state.day3Weather}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

ThreeDay.defaultProps = {
  header: 'Baseball Weather',
  subheader: 'Three Day Forecast'
}