import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './home.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import auth from "../auth";
import AOS from 'aos';
import unregister from '../intercept';
import matchService from '../service/matchService';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  constructor(props){
      super(props);
      // console.log("props:",this.props);
      // var today = new Date(),
      // date = moment(today).format("YYYY/MM/DD");
      this.state = {
          match: [],
          future_series: [],
          match_by_day: [],
          old_matches: [],
          score:[],
          match_id:[],
          stateTitle:[],
          value: 0,
          isLoaded: false,
          fireRedirect: false
      }
      auth.login(() => {
      });
  }
  componentDidMount(){
      // console.log("data of live score");
      // propservice.getprop(this.props);
      // fetch("https://cricapi.com/api/cricket?apikey=35xllyx5K7bMzc5qcuas7W6Uzml2")
      matchService.liveScore()
      // .then(res => res.json())
      .then(res =>{
          console.log(res);
          this.setState({
              isLoaded: true,
              match: res.data,
          })
      })
      // fetch("https://cricapi.com/api/matches?apikey=35xllyx5K7bMzc5qcuas7W6Uzml2")
      matchService.futureSeries()
        // .then(res => res.json())
        .then(json =>{
          // console.log(json);
          this.setState({
              isLoaded: true,
             future_series: json.matches,
          })
          // console.log(this.state.future_series);
      })
      // fetch("https://cricapi.com/api/matchCalendar?apikey=35xllyx5K7bMzc5qcuas7W6Uzml2")
      matchService.matchByDay()  
        // .then(res => res.json())
        .then(json =>{
            // console.log(json);
        this.setState({
            isLoaded: true,
            match_by_day: json.data,
        })
        })
  }

  render() {
    // let display_data;
    const { classes } = this.props;
    const { match,future_series,match_by_day,value,isLoaded,fireRedirect } = this.state;
    // console.log("privious locaion",window.location);
    // console.log("live_match",match);
    // console.log("future_series",future_series);
    // console.log("match_by_day",match_by_day);
    AOS.init();

//  if(!isLoaded){
//       return(
//       <div><img alt="" className="load" src={loader}></img></div>
//       )
//     }
    // if(!isLoaded){
    // return(
    //     <div>
    //       <Loader />
    //     </div>
    //     )
    // } 
    if(fireRedirect) {
      window.location.href = '/'
    } else if(isLoaded){
    return (
      <Grid container spacing={12}>
    	  <div className="main_container">
         <div className="main_heading">
            <Grid item xs={12} md={9} className="left_class">
    	        <p style={{color:"#3f50b5"}}>CricBuzz</p>
            </Grid>
            <Grid item xs={12} md={3} className="right_class">
              <Button title="Find Player" variant="contained" color="primary" className="players_btn">
                <Link to={"/player"}><span style={{textDecoration:'none'}}>Players</span></Link>
              </Button>
              <Button variant="contained" className="player_btn" onClick={() => {
                console.log("logout1");
                // console.log("props:",this.props);
                localStorage.removeItem("email");
                this.setState({ fireRedirect: true });
                // auth.logout(() => {
                //   this.props.history.push("/");
                // });
                console.log("logout2");
                }}>
                  Logout
                </Button>
              </Grid>
            </div>
    	    <div className="border_class">
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs value={value} onChange={this.handleChange} variant="scrollable" scrollButtons="auto" indicatorColor="primary">
                  <Tab label="Live Matches" />
                  <Tab label="Score Board" />
                  <Tab label="Current & Future series" />
                  <Tab label="Match by Day" />
                </Tabs>
              </AppBar>
              {value === 0 && <TabContainer>
                  {match.map(item=>{
                      return (
                      <div data-aos="fade-up" className="live_score_box">
                        <div className="match1">
                          <span dangerouslySetInnerHTML={{__html: item.title.split(" v ")[0]}}></span>
                          <b> Vs </b><span dangerouslySetInnerHTML={{__html: item.title.split(" v ")[1]}}></span>
                        </div>
                      </div>
                      )
                  })}
        	      </TabContainer>}
              {value === 1 &&<TabContainer>
                {match.map(item=>{
                  // const matchTeam = item.title.split(" v ")[0];
                  // console.log("team",matchTeam);
                    return (
                      <div data-aos="fade-up" className="live_score_box">
                        <div className="match1">
                          <Grid container spacing={12}>
                            <Grid sm={9} md={9}>
                              <span dangerouslySetInnerHTML={{__html: item.title.split(" v ")[0]}}></span>
                              <b> Vs </b><span dangerouslySetInnerHTML={{__html: item.title.split(" v ")[1]}}></span>
                            </Grid>
                            <Grid sm={3} md={3}>
                              <Button title="Match Score" className="link_btn" variant="contained">
                                <Link to={"/score/"+item.unique_id}><span style={{textDecoration:'none',color:"black"}}>Score</span></Link>
                              </Button>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    )
                })}
              </TabContainer>}
              {value === 2 && <TabContainer>
                        <div className="match1">
                          <Grid container spacing={12}>
                            <Grid item sm={2} md={2}>
                              <h4 style={{margin:0}}>Date &amp; Time</h4>
                            </Grid>
                            <Grid item sm={10} md={10}>
                              <h4 style={{margin:0}}>Match</h4>
                            </Grid>
                         </Grid>
                        </div>
                    {future_series.map(item =>{
                      // console.log(item.dateTimeGMT, typeof item.dateTimeGMT);
                      // const date = item.dateTimeGMT.split('T')[0];
                      // const time = item.dateTimeGMT.split('T')[1];
                      // const time1 = time.split('Z')[0];
                      // const IST = time.split(':00.000')[0];
                      const GMT = new Date(item.dateTimeGMT);
                      const IST = GMT.toLocaleString();
                      // console.log("IST:",IST);
                      const date = IST.split(',')[0];

                      const dat = new Date(item.dateTimeGMT);
                      const options = {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      };
                      const timeString = dat.toLocaleString('en-US', options);
                      // console.log("date:",date);
                      // console.log("timeString",timeString);
                      // console.log('date: ', date);
                      // console.log('time: ', time);
                      // console.log('time1: ', time1);
                      // console.log('IST: ', IST);
                      // console.log("formatDate:",this.formatDate(IST));
                        return(
                        <div data-aos="fade-up">
                          <Grid container spacing={12}>
                            <Grid item sm={2} md={2}>
                              <div className="match1">{date}, {timeString}</div>
                            </Grid>
                            <Grid item sm={10} md={10}>
                              <Grid container spacing={12}>
                                <Grid item sm={9}>
                                  <div className="match1">{item["team-1"]} <b>Vs</b> {item["team-2"]} {item.type}
                                  </div>
                                </Grid>
                                <Grid item sm={3} md={3}>
                                  <Button title="Match Score" className="link_btn" variant="contained">
                                    <Link to={"/score/"+item.unique_id}><span style={{textDecoration:'none',color:"black"}}>Score</span></Link>
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        <hr />
                        </div>
                        )
                    })}
                </TabContainer>}
        	{value === 3 && <TabContainer>
                {match_by_day.map(item=>{
                  // const matchByDayDetail = item.name.split(" v ")[0];
                  // console.log("team",matchByDayDetail);
                    return(
                    <div data-aos="fade-up">
                      <Grid container spacing={12}>
                        <Grid item sm={2}>
                          <div className="match1">{item.date}</div>
                        </Grid>
                        <Grid item sm={10}>
                          <div className="match1">{item.name.split(" v ")[0]} <b>Vs</b> {item.name.split(" v ")[1]}</div>
                          <hr />
                        </Grid>
                      </Grid>
                    </div>
                    )
                })}
            </TabContainer>}
          </div>
        </div>
      </div>
    </Grid>
    );
    }else{
      return(
        <div></div>
        )
    }
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
