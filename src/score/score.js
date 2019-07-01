import React,{Component} from 'react';
import * as mdc from 'material-components-web';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import home from '../home/home';
import Button from '@material-ui/core/Button';
import './score.css';
import AOS from 'aos';
import unregister from '../intercept';
import matchService from '../service/matchService';

class score extends Component{
	constructor(props){
		super(props);
		this.state = {
			score : {},
			stateBatting: [],
			stateBowling: [],
			stateFielding: [],
			stateTeam: [],
			stateTeam2:[],
			isLoaded: false,
		}
	}
	componentDidMount(){
		// console.log(this.props.location.pathname, typeof this.props.location.pathname);
		const matchId = this.props.location.pathname.split('/')[2];
		// console.log('matchId: ', matchId);
		// var uri = this.props.location.pathname;
		// uri.split("/");
		// console.log("==========>",this.props.location.pathname[0])

		// fetch("https://cricapi.com/api/fantasySummary?apikey=35xllyx5K7bMzc5qcuas7W6Uzml2&unique_id="+matchId)
		matchService.getScore(matchId)
		// .then(res => res.json())
		.then(matchData =>{
			// console.log("match_data", matchData);
			// this.setState({
			//   isLoaded:true,
			//   score:json.data,
			// })
			this.setState({ score: {...this.state.score, matchData} ,isLoaded: true})
		})
	}

	render() {
		AOS.init();
		// console.log("Match score",this.state.score);
		if (this.state.score && this.state.score.matchData && this.state.score.matchData.data) {
			const data = this.state.score.matchData.data;
			this.state.stateBatting = data.batting;
			this.state.stateBowling = data.bowling;
			this.state.stateFielding = data.fielding;
			this.state.stateTeam = data.team[0];
			this.state.stateTeam2 = data.team[1];
		}
		// console.log("team-2",this.state.stateTeam2);
		// console.log("team-2 length",Object.keys(this.state.stateTeam2).length);
		// console.log("team",this.state.stateTeam);
		// console.log("team length",Object.keys(this.state.stateTeam).length);
		// console.log("scoreData",this.state.score);

		let displayBatting;
		if (this.state.stateBatting.length) {
			displayBatting = this.state.stateBatting.map((bat, batIndex) => {
				return (
					<div key={batIndex} className="scoreTable">
						<p>{bat.title}</p>
						<table>
							<thead>
								<tr>
									<th>Batsman</th>
									<th>Dismissal</th>
									<th>Run</th>
									<th>Ball</th>
									<th>4s</th>
									<th>6s</th>
									<th>SR</th>
								</tr>
							</thead>
							<tbody>
							{bat.scores.map((score, scoreIndex) => {
								return (
									<tr key={scoreIndex}>
										<td>{scoreIndex + 1} - {score.batsman}</td>
										<td>{score["dismissal-info"]} {score.detail}</td>
										<td>{score.R}</td>
										<td>{score.B}</td>
										<td>{score["4s"]}</td>
										<td>{score["6s"]}</td>
										<td>{score.SR}</td>
									</tr>
									)						
								})}
							</tbody>
						</table>
					</div>
				)
			});
		}

		let displayBowling;
		if (this.state.stateBowling.length) {
			displayBowling = this.state.stateBowling.map((bowl, bowlingIndex) => {
				return (
					<div key={bowlingIndex} className="scoreTable">
						<p>{bowl.title}</p>
						<table>
							<thead>
								<tr>
									<th>Bowler</th>
									<th>0s</th>
									<th>4s</th>
									<th>6s</th>
									<th>Economy</th>
									<th>Over</th>
									<th>Run</th>
									<th>Wicket</th>
								</tr>
							</thead>
							<tbody>
							{bowl.scores.map((score, index) => {
								return (
									<tr key={index}>
										<td>{score.bowler}</td>
										<td>{score["0s"]}</td>
										<td>{score["4s"]}</td>							
										<td>{score["6s"]}</td>
										<td>{score.Econ}</td>
										<td>{score.O}</td>
										<td>{score.R}</td>
										<td>{score.W}</td>																																																
									</tr>
								)
							})}
							</tbody>
						</table>
					</div>
				)
			});
		}

		let displayTeam;
		if(Object.keys(this.state.stateTeam).length){

			displayTeam = this.state.stateTeam.players.map((team,teamIndex) =>{
				return(
					<div key={teamIndex} className="scoreTable">
						<table>
							<tbody>
								<tr>
									<td><Link to={"/player/"+team.pid}><span style={{textDecoration:'none',color:"black"}}>{teamIndex + 1} - {team.name}</span></Link></td>
								</tr>
							</tbody>
						</table>
					</div>
				)
			});
		}

		let displayTeamSecond;
		if(Object.keys(this.state.stateTeam2).length){

			displayTeamSecond = this.state.stateTeam2.players.map((team2,team2Index) =>{
				return(
					<div key={team2Index} className="scoreTable">
						<table>
						<tbody>
							<tr>
								<td><Link to={"/player/"+team2.pid}><span style={{textDecoration:'none',color:"black"}}>{team2Index + 1} - {team2.name}</span></Link></td>
							</tr>
						</tbody>
						</table>
					</div>
					)
			});
		}

		let displayFielding;
		if(this.state.stateFielding.length){
			displayFielding = this.state.stateFielding.map((fielding,fieldingIndex) =>{
				return(
					<div key={fieldingIndex} className="scoreTable">
						<p>{fielding.title}</p>
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Bowled</th>
									<th>Catch</th>
									<th>LBW</th>
									<th>RO</th>
									<th>Stumped</th>
								</tr>
							</thead>
							<tbody>
								{fielding.scores.map((score, scoreIndex) => {
									return (
										<tr key={scoreIndex}>
										<td>{scoreIndex + 1} - {score.name}</td>
										<td>{score.bowled}</td>
										<td>{score.catch}</td>
										<td>{score.lbw}</td>
										<td>{score.runout}</td>
										<td>{score.stumped}</td>
										</tr>
									)						
								})}
							</tbody>
						</table>
					</div>
				)
			})
		}
		// const match_start = this.state.score.data.matchStarted ? 'Yes' : 'No';
		// console.log("match_start:",match_start);
		if(!this.state.isLoaded){
			return(
				<div></div>
			)
		}
		else if (this.state.isLoaded && this.state.score.matchData.data.batting[0].scores.length!==0) {	
		return (
			<Grid container className="scorePage" spacing={12}>
				<Grid item md={12} xs={12}>
					<div className="main_heading_score">
						<div className="left_class">
							<p style={{color:"#3f50b5"}}>CricBuzz</p>
						</div>
						<div className="right_class">
							<Button variant="contained" className="scoreBtn">
								<Link to={"/home"}><span style={{textDecoration:'none',color:'black'}}>Home</span></Link>
							</Button>
						</div>
					</div>
					<h2 className="winnerTitle">Winner Team: {this.state.score.matchData.data.winner_team ? this.state.score.matchData.data.winner_team : "Match in progress"}</h2>
					<h3>Man Of The Match: {this.state.score.matchData.data["man-of-the-match"].name ? this.state.score.matchData.data["man-of-the-match"].name : "Match in progress"}</h3>
					<h3 className="winnerTitle">Toss Winner: {this.state.score.matchData.data.toss_winner_team ? this.state.score.matchData.data.toss_winner_team : "Match in progress"}</h3>
				</Grid>
				<Grid data-aos="fade-up" container spacing={12}>
					<Grid item md={6} xs={12} className="tablePadding">
						{displayBatting ? displayBatting : 'Batting loading'}
					</Grid>
					<Grid container item md={6} className="tablePadding">
						<Grid item md={6} xs={6}>
							<p>{this.state.stateTeam.name}</p>
							<table>
								<thead>
									<tr>
										<th>
											Name
										</th>
									</tr>
								</thead>
							</table>
							{displayTeam ? displayTeam : 'Team loading'}
						</Grid>
						<Grid item md={6} xs={6}>
						<p>{this.state.stateTeam2.name}</p>
						<table>
							<thead>
								<tr>
									<th>
										Name
									</th>
								</tr>
							</thead>
						</table>
						{displayTeamSecond ? displayTeamSecond : 'Team2 loading'}
					</Grid>
				</Grid>
					<Grid item md={6} xs={12} className="tablePadding">
						{displayBowling ? displayBowling : 'Bowling loading'}
					</Grid>
					<Grid item md={6} xs={12} className="tablePadding">
						{displayFielding ? displayFielding : 'Fielding loading'}
					</Grid>
				</Grid>
			</Grid>
			)
		}
		else{
			return(
				<div>
					<center><h1>Match Not Started Yet</h1></center>
				</div>
				)
		}
	}	
}

export default score;
