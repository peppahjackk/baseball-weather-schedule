import React from 'react'
import { Grid, Header, Table, Divider } from 'semantic-ui-react'
import GameTime from './GameTime'
import PrecipPercent from './PrecipPercent'
import PrecipType from './PrecipType'
import DetailsHeader from './DetailsHeader'
import officialTeamTwitter from '../utils/officialTeamTwitter'
import HourlyPopup from './HourlyPopup'
import dateManipulation from '../utils/dateManipulation'

export default class MultiParkDetails extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let highChanceTable,
        lowChanceList,
        gameData = this.props.gameData;
    // Places high chance parks into a table
    if (gameData.high.length) {
      highChanceTable = <Table celled compact unstackable className='precipTable'>
            <DetailsHeader />
            <Table.Body>
              {gameData.high.map((currPark) => {
                let isHourly;
                let parkData = currPark[Object.keys(currPark)[0]];
                if (parkData[0] === 'hourly') {
                  isHourly = <HourlyPopup parkData={parkData} time={dateManipulation.stripMinutes(parkData[2].data.event_time)}/>;
                } else if (parkData[0] === 'current') {
                  isHourly = <HourlyPopup parkData={parkData} time='Current' />
                } else {
                  isHourly = <Table.Cell><PrecipPercent parkData={parkData} /> <PrecipType parkData={parkData} /></Table.Cell>;
                }
                return (<Table.Row key={parkData[2].park+parkData[2].gm}>
                  <Table.Cell>{parkData[2].data.away_name_abbrev} vs {parkData[2].park}</Table.Cell>
                  <Table.Cell><GameTime data={parkData[2].data} /></Table.Cell>
                  {isHourly}
                  <Table.Cell>
                    <a href={'http://www.twitter.com/' + officialTeamTwitter.twitterLinks[parkData[2].park]} target="_blank" className='infoIconLink'>
                      <img src="images/icons/social-1_logo-twitter.svg" alt="twitter" className='infoIcon' />
                    </a><
                  /Table.Cell>
                </Table.Row>)
              })}
            </Table.Body>
          </Table>
    } else {
      // Delivers the good news that no games have a high precipitation chance
      highChanceTable = <div><Header as='h3' className='infoSubHeader noHighChanceHeader'>No games have a high chance of rain!</Header> <Divider /></div>
    }

      // Places Low chance parks into a list
      lowChanceList = gameData.low.map((currPark) => {
        let parkData = currPark[Object.keys(currPark)[0]];
        let time = parkData[2].data.event_time;
        if (['preview','pre-game','warmup'].indexOf(parkData[2].data.status.toLowerCase()) < 0) {
             time = parkData[2].data.status;
             }
        return (<li key={parkData[2].park+parkData[2].gm} className='listItem'><PrecipPercent parkData={parkData} /> <span>{parkData[2].data.away_name_abbrev} vs {parkData[2].park} </span>{time}<Divider /></li>)
      });

      // Adds Dome parks to the end of the low chance parks list
      gameData.dome.map((currPark) => {
        let parkData = currPark[Object.keys(currPark)[0]];
        let time = parkData[2].data.event_time;
        if (['preview','pre-game','warmup'].indexOf(parkData[2].data.status.toLowerCase()) < 0) {
             time = parkData[2].data.status;
             }
        lowChanceList.push(<li key={parkData[2].park+parkData[2].gm} className='listItem'>-% <span>{parkData[2].data.away_name_abbrev} vs {parkData[2].park} </span>{time}<Divider /></li>);
      return; 
      });

      // Adds a dash to keep the two column list looking even stevens 
        if (!lowChanceList.length) {
          lowChanceList.push(<li key={'emptyPark1'} className='listItem'>n/a</li>);
          lowChanceList.push(<li key={'emptyPark2'} className='listItem'>n/a</li>);
        } else if (lowChanceList.length % 2) {
        lowChanceList.push(<li key={'emptyPark'+this.props.day} className='listItem'>-</li>);
      } 
                         
    return (
      <Grid.Column tablet={16} mobile={16} computer={5}>
        <div className='detailsContainer'>
          <Header as='h3' className='infoHeader'>{this.props.dateInfo['Day'+this.props.day]}</Header>
          <Header as='h4' className='infoSubHeader noMarginTop'>{this.props.dateInfo['Day'+this.props.day+'Date'].month}  {this.props.dateInfo['Day'+this.props.day+'Date'].day + ' '}  
{this.props.dateInfo['Day'+this.props.day+'Date'].year}</Header>
        </div>
        <div className='detailsContainer'>
          {highChanceTable}
          <Header as='h4' className='infoHeader noMarginTop'>Low or No Chance Parks</Header>
          <ul className='list lowChance'>{lowChanceList}</ul>     
          <p className='infoSubHeader'>* indicates game time data</p>
        </div>
      </Grid.Column>
    )
  }
}