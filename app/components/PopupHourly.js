import React from 'react'
import { Grid, Header, Table, Popup } from 'semantic-ui-react'
import PrecipPercent from './PrecipPercent'
import PrecipType from './PrecipType'
import dateManipulation from '../utils/dateManipulation'

export default class PopupHourly extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let precipType;
    if (!this.props.noType) {
      precipType = <PrecipType parkData={this.props.parkData} />;
    }
    return (
      <Popup trigger={<span className='isHourly'><PrecipPercent parkData={this.props.parkData} pickHighest/> {precipType}</span>} flowing hoverable>  
        <div className='popup'>
          <Header as='h5' textAlign='center'>Hourly Rain %:</Header>
          <Grid centered divided columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Header as='h4'>{this.props.time}</Header>
                <span className='noWrap'>
                  <PrecipPercent parkData={this.props.parkData}  noStar/> <PrecipType parkData={this.props.parkData} />
                </span>
              </Grid.Column>
              <Grid.Column>
                <Header as='h4'>+1 Hr</Header>
                <span className='noWrap'>
                  <PrecipPercent parkData={this.props.parkData} hour={1}  noStar/> <PrecipType parkData={this.props.parkData} hour={1} />
                  </span>
              </Grid.Column>
              <Grid.Column>
                <Header as='h4'>+2 Hr</Header>
                <span className='noWrap'>
                  <PrecipPercent parkData={this.props.parkData} hour={2}  noStar/> <PrecipType parkData={this.props.parkData} hour={2}/>
                </span>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Popup>
            
    )
  }
}