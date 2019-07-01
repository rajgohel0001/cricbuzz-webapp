import React,{Component} from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './player.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import loader from './loader.gif';
import background from './player_bg1.jpg';
import Swal from 'sweetalert2';
import AOS from 'aos';
import Loader from './Loader';
import unregister from './intercept';

class player extends Component{
	constructor(props){
		super(props);
		this.state = {
			player_info : [],
			player_name: '',
			player_statistics:'',
			pid:'',
			isLoaded: false,
			flag: false,
			ODI_data:[],
			T20_data:[],
			firstClass_data:[],
			listA_data:[],
			test_data:[],
			ODI_dataBow:[],
			T20_dataBow:[],
			firstClass_dataBow:[],
			listA_dataBow:[],
			test_dataBow:[]
		}
		this.handleChangeEnd = this.handleChangeEnd.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount(){
		// console.log(this.props.location.pathname);
		// const playerName = this.props.location.pathname.split('/')[2];
		const playerId = this.props.location.pathname.split('/')[2];
		// console.log("pname:",playerName);
		// console.log("pid:",playerId);

		if(playerId){
			fetch("https://cricapi.com/api/playerStats?apikey=35xllyx5K7bMzc5qcuas7W6Uzml2&pid="+playerId)
			.then(res => res.json())
			.then(json =>{
					this.setState({
						isLoaded:true,
						player_statistics:json,
						ODI_data: [json.data.batting.ODIs],
						T20_data: [json.data.batting.T20Is],
						firstClass_data: [json.data.batting.firstClass],
						listA_data: [json.data.batting.listA],
						test_data: [json.data.batting.tests],
						ODI_dataBow: [json.data.bowling.ODIs],
						T20_dataBow: [json.data.bowling.T20Is],
						firstClass_dataBow: [json.data.bowling.firstClass],
						listA_dataBow: [json.data.bowling.listA],
						test_dataBow: [json.data.bowling.tests]
					})
					// console.log("player_statistics",this.state.player_statistics);

					// console.log("ODI_data",this.state.ODI_data);
					// console.log("T20_data",this.state.T20_data);
					// console.log("firstClass_data",this.state.firstClass_data);
					// console.log("listA_data",this.state.listA_data);
					// console.log("test_data",this.state.test_data);

					// console.log("ODI_data",this.state.ODI_dataBow);
					// console.log("T20_data",this.state.T20_dataBow);
					// console.log("firstClass_data",this.state.firstClass_dataBow);
					// console.log("listA_data",this.state.listA_dataBow);
					// console.log("test_data",this.state.test_dataBow);
				}
			)
		}
	 }
	 
	handleChangeEnd(event){  
      this.setState({
      	player_name: event.target.value
      });
      // console.log("success");
    }

    handleClick(){
    	const pattern =/^[a-z\sA-Z]+$/;
    	if(!(this.state.player_name)){
    		Swal.fire({
    			title: 'Please Enter name',
    			type: 'warning',
    		})
    	} else if (this.state.player_name && pattern.test(this.state.player_name)) {
    		this.setState({player_statistics:''});
    		// console.log("state data",this.state.player_statistics);
    		fetch("https://cricapi.com/api/playerFinder?apikey=35xllyx5K7bMzc5qcuas7W6Uzml2&name="+this.state.player_name)
			.then(res => res.json())
			.then(json =>{
				if(!(json.data == '')){
					this.setState({
						isLoaded:true,
						flag:true,
						player_info:json,
						pid:json.data[0].pid
					})
				} else {
					Swal.fire({
						title: 'Name is not valid',
						type: 'warning',
					})
				}
				// console.log(this.state.player_name);
				// console.log(this.state.player_info.data);
				// console.log(this.state.player_info.data[0].pid);
				// console.log(this.state.pid);
				this.state.player_name = '';
				// console.log("player_name",this.state.player_name);
			})		
		setTimeout(()=>{
			if(this.state.pid){
				// console.log("player info",this.state.player_info.data);
				fetch("https://cricapi.com/api/playerStats?apikey=35xllyx5K7bMzc5qcuas7W6Uzml2&pid="+this.state.pid)
				.then(res => res.json())
				.then(json =>{
					this.setState({
						isLoaded:true,
						player_statistics:json,
						ODI_data: [json.data.batting.ODIs],
						T20_data: [json.data.batting.T20Is],
						firstClass_data: [json.data.batting.firstClass],
						listA_data: [json.data.batting.listA],
						test_data: [json.data.batting.tests],
						ODI_dataBow: [json.data.bowling.ODIs],
						T20_dataBow: [json.data.bowling.T20Is],
						firstClass_dataBow: [json.data.bowling.firstClass],
						listA_dataBow: [json.data.bowling.listA],
						test_dataBow: [json.data.bowling.tests]
					})
					// console.log("player_statistics",this.state.player_statistics);

					// console.log("ODI_data",this.state.ODI_data);
					// console.log("T20_data",this.state.T20_data);
					// console.log("firstClass_data",this.state.firstClass_data);
					// console.log("listA_data",this.state.listA_data);
					// console.log("test_data",this.state.test_data);

					// console.log("ODI_data",this.state.ODI_dataBow);
					// console.log("T20_data",this.state.T20_dataBow);
					// console.log("firstClass_data",this.state.firstClass_dataBow);
					// console.log("listA_data",this.state.listA_dataBow);
					// console.log("test_data",this.state.test_dataBow);
				})
			}
		},3000)
		} else if (!(pattern.test(this.state.player_name))) {
			Swal.fire({
			title: 'Name is not valid',
			type: 'warning',
			})
		}	
	}
	
		render(){
		const { isLoaded,player_info,player_statistics } = this.state;
		// console.log("player_info",player_info);
		// console.log("player_statistics",player_statistics);
		AOS.init();

		let displayODI;
		if(this.state.ODI_data[0] != undefined){
			displayODI = this.state.ODI_data.map((ODI, ODIindex)=>{
				return(
					<tr key={ODIindex}>
						<td><b>ODIs</b></td>
						<td>{ODI["4s"] ? ODI["4s"] : "-"}</td>
						<td>{ODI["6s"] ? ODI["6s"] : "-"}</td>
						<td>{ODI["50"] ? ODI["50"] : "-"}</td>
						<td>{ODI["100"] ? ODI["100"] : "-"}</td>
						<td>{ODI["Ave"] ? ODI["Ave"] : "-"}</td>
						<td>{ODI["BF"] ? ODI["BF"] : "-"}</td>
						<td>{ODI["Ct"] ? ODI["Ct"] : "-"}</td>
						<td>{ODI["HS"] ? ODI["HS"] : "-"}</td>
						<td>{ODI["Inns"] ? ODI["Inns"] : "-"}</td>
						<td>{ODI["Mat"] ? ODI["Mat"] : "-"}</td>
						<td>{ODI["NO"] ? ODI["NO"] : "-"}</td>
						<td>{ODI["Runs"] ? ODI["Runs"] : "-"}</td>
						<td>{ODI["SR"] ? ODI["SR"] : "-"}</td>
					</tr>
					)
			})
		}

		let displayT20;
		if(this.state.T20_data[0] != undefined){
			displayT20 = this.state.T20_data.map((T20I, T20Iindex)=>{
				return(
					<tr key={T20Iindex}>
						<td><b>T20</b></td>
						<td>{T20I["4s"] ? T20I["4s"] : "-"}</td>
						<td>{T20I["6s"] ? T20I["6s"] : "-"}</td>
						<td>{T20I["50"] ? T20I["50"] : "-"}</td>
						<td>{T20I["100"] ? T20I["100"] : "-"}</td>
						<td>{T20I["Ave"] ? T20I["Ave"] : "-"}</td>
						<td>{T20I["BF"] ? T20I["BF"] : "-"}</td>
						<td>{T20I["Ct"] ? T20I["Ct"] : "-"}</td>
						<td>{T20I["HS"] ? T20I["HS"] : "-"}</td>
						<td>{T20I["Inns"] ? T20I["Inns"] : "-"}</td>
						<td>{T20I["Mat"] ? T20I["Mat"] : "-"}</td>
						<td>{T20I["NO"] ? T20I["NO"] : "-"}</td>
						<td>{T20I["Runs"] ? T20I["Runs"] : "-"}</td>
						<td>{T20I["SR"] ? T20I["SR"] : "-"}</td>
					</tr>
					)
			})
		}

		let displayfirstClass;
		if(this.state.firstClass_data[0] != undefined){
			displayfirstClass = this.state.firstClass_data.map((firstClass, firstClassindex)=>{
				return(
					<tr key={firstClassindex}>
						<td><b>FirstClass</b></td>
						<td>{firstClass["4s"] ? firstClass["4s"] : "-"}</td>
						<td>{firstClass["6s"] ? firstClass["6s"] : "-"}</td>
						<td>{firstClass["50"] ? firstClass["50"] : "-"}</td>
						<td>{firstClass["100"] ? firstClass["100"] : "-"}</td>
						<td>{firstClass["Ave"] ? firstClass["Ave"] : "-"}</td>
						<td>{firstClass["BF"] ? firstClass["BF"] : "-"}</td>
						<td>{firstClass["Ct"] ? firstClass["Ct"] : "-"}</td>
						<td>{firstClass["HS"] ? firstClass["HS"] : "-"}</td>
						<td>{firstClass["Inns"] ? firstClass["Inns"] : "-"}</td>
						<td>{firstClass["Mat"] ? firstClass["Mat"] : "-"}</td>
						<td>{firstClass["NO"] ? firstClass["NO"] : "-"}</td>
						<td>{firstClass["Runs"] ? firstClass["Runs"] : "-"}</td>
						<td>{firstClass["SR"] ? firstClass["SR"] : "-"}</td>
					</tr>
					)
			})
		}

		let displayListA;
		if(this.state.listA_data[0] != undefined){
			displayListA = this.state.listA_data.map((listA, listAindex)=>{
				return(
					<tr key={listAindex}>
						<td><b>List-A</b></td>
						<td>{listA["4s"] ? listA["4s"] : "-"}</td>
						<td>{listA["6s"] ? listA["6s"] : "-"}</td>
						<td>{listA["50"] ? listA["50"] : "-"}</td>
						<td>{listA["100"] ? listA["100"] : "-"}</td>
						<td>{listA["Ave"] ? listA["Ave"] : "-"}</td>
						<td>{listA["BF"] ? listA["BF"] : "-"}</td>
						<td>{listA["Ct"] ? listA["Ct"] : "-"}</td>
						<td>{listA["HS"] ? listA["HS"] : "-"}</td>
						<td>{listA["Inns"] ? listA["Inns"] : "-"}</td>
						<td>{listA["Mat"] ? listA["Mat"] : "-"}</td>
						<td>{listA["NO"] ? listA["NO"] : "-"}</td>
						<td>{listA["Runs"] ? listA["Runs"] : "-"}</td>
						<td>{listA["SR"] ? listA["SR"] : "-"}</td>
					</tr>
					)
			})
		}

		let displayTests;
		if(this.state.test_data[0] != undefined){
			displayTests = this.state.test_data.map((test, testindex)=>{
				return(
					<tr key={testindex}>
						<td><b>Tests</b></td>
						<td>{test["4s"] ? test["4s"] : "-"}</td>
						<td>{test["6s"] ? test["6s"] : "-"}</td>
						<td>{test["50"] ? test["50"] : "-"}</td>
						<td>{test["100"] ? test["100"] : "-"}</td>
						<td>{test["Ave"] ? test["Ave"] : "-"}</td>
						<td>{test["BF"] ? test["BF"] : "-"}</td>
						<td>{test["Ct"] ? test["Ct"] : "-"}</td>
						<td>{test["HS"] ? test["HS"] : "-"}</td>
						<td>{test["Inns"] ? test["Inns"] : "-"}</td>
						<td>{test["Mat"] ? test["Mat"] : "-"}</td>
						<td>{test["NO"] ? test["NO"] : "-"}</td>
						<td>{test["Runs"] ? test["Runs"] : "-"}</td>
						<td>{test["SR"] ? test["SR"] : "-"}</td>
					</tr>
					)
			})
		}

		let displayODIBow;
		if(this.state.ODI_dataBow[0] != undefined){
			displayODIBow = this.state.ODI_dataBow.map((ODIBow, ODIBowindex)=>{
				return(
					<tr key={ODIBowindex}>
						<td><b>ODI</b></td>
						<td>{ODIBow["4w"] ? ODIBow["4w"] : "-"}</td>
						<td>{ODIBow["5w"] ? ODIBow["5w"] : "-"}</td>
						<td>{ODIBow["10"] ? ODIBow["10"] : "-"}</td>
						<td>{ODIBow["Ave"] ? ODIBow["Ave"] : "-"}</td>
						<td>{ODIBow["BBI"] ? ODIBow["BBI"] : "-"}</td>
						<td>{ODIBow["BBM"] ? ODIBow["BBM"] : "-"}</td>
						<td>{ODIBow["Balls"] ? ODIBow["Balls"] : "-"}</td>
						<td>{ODIBow["Econ"] ? ODIBow["Econ"] : "-"}</td>
						<td>{ODIBow["Inns"] ? ODIBow["Inns"] : "-"}</td>
						<td>{ODIBow["Mat"] ? ODIBow["Mat"] : "-"}</td>
						<td>{ODIBow["Runs"] ? ODIBow["Runs"] : "-"}</td>
						<td>{ODIBow["SR"] ? ODIBow["SR"] : "-"}</td>
						<td>{ODIBow["Wkts"] ? ODIBow["Wkts"] : "-"}</td>
					</tr>
					)
			})
		}

		let displayT20Bow;
		if(this.state.T20_dataBow[0] != undefined){
			displayT20Bow = this.state.T20_dataBow.map((T20Bow, T20Bowindex)=>{
				return(
					<tr key={T20Bowindex}>
						<td><b>T20</b></td>
						<td>{T20Bow["4w"] ? T20Bow["4w"] : "-"}</td>
						<td>{T20Bow["5w"] ? T20Bow["5w"] : "-"}</td>
						<td>{T20Bow["10"] ? T20Bow["10"] : "-"}</td>
						<td>{T20Bow["Ave"] ? T20Bow["Ave"] : "-"}</td>
						<td>{T20Bow["BBI"] ? T20Bow["BBI"] : "-"}</td>
						<td>{T20Bow["BBM"] ? T20Bow["BBM"] : "-"}</td>
						<td>{T20Bow["Balls"] ? T20Bow["Balls"] : "-"}</td>
						<td>{T20Bow["Econ"] ? T20Bow["Econ"] : "-"}</td>
						<td>{T20Bow["Inns"] ? T20Bow["Inns"] : "-"}</td>
						<td>{T20Bow["Mat"] ? T20Bow["Mat"] : "-"}</td>
						<td>{T20Bow["Runs"] ? T20Bow["Runs"] : "-"}</td>
						<td>{T20Bow["SR"] ? T20Bow["SR"] : "-"}</td>
						<td>{T20Bow["Wkts"] ? T20Bow["Wkts"] : "-"}</td>
					</tr>
					)
			})
		}

		let displayfirstClassBow;
		if(this.state.firstClass_dataBow[0] != undefined){
			displayfirstClassBow = this.state.firstClass_dataBow.map((firstClassBow, firstClassBowindex)=>{
				return(
					<tr key={firstClassBowindex}>
						<td><b>FirstClass</b></td>
						<td>{firstClassBow["4w"] ? firstClassBow["4w"] : "-"}</td>
						<td>{firstClassBow["5w"] ? firstClassBow["5w"] : "-"}</td>
						<td>{firstClassBow["10"] ? firstClassBow["10"] : "-"}</td>
						<td>{firstClassBow["Ave"] ? firstClassBow["Ave"] : "-"}</td>
						<td>{firstClassBow["BBI"] ? firstClassBow["BBI"] : "-"}</td>
						<td>{firstClassBow["BBM"] ? firstClassBow["BBM"] : "-"}</td>
						<td>{firstClassBow["Balls"] ? firstClassBow["Balls"] : "-"}</td>
						<td>{firstClassBow["Econ"] ? firstClassBow["Econ"] : "-"}</td>
						<td>{firstClassBow["Inns"] ? firstClassBow["Inns"] : "-"}</td>
						<td>{firstClassBow["Mat"] ? firstClassBow["Mat"] : "-"}</td>
						<td>{firstClassBow["Runs"] ? firstClassBow["Runs"] : "-"}</td>
						<td>{firstClassBow["SR"] ? firstClassBow["SR"] : "-"}</td>
						<td>{firstClassBow["Wkts"] ? firstClassBow["Wkts"] : "-"}</td>
					</tr>
					)
			})
		}

		let displayListABow;
		if(this.state.listA_dataBow[0] != undefined){
			displayListABow = this.state.listA_dataBow.map((listABow, listABowindex)=>{
				return(
					<tr key={listABowindex}>
						<td><b>List-A</b></td>
						<td>{listABow["4w"] ? listABow["4w"] : "-"}</td>
						<td>{listABow["5w"] ? listABow["5w"] : "-"}</td>
						<td>{listABow["10"] ? listABow["10"] : "-"}</td>
						<td>{listABow["Ave"] ? listABow["Ave"] : "-"}</td>
						<td>{listABow["BBI"] ? listABow["BBI"] : "-"}</td>
						<td>{listABow["BBM"] ? listABow["BBM"] : "-"}</td>
						<td>{listABow["Balls"] ? listABow["Balls"] : "-"}</td>
						<td>{listABow["Econ"] ? listABow["Econ"] : "-"}</td>
						<td>{listABow["Inns"] ? listABow["Inns"] : "-"}</td>
						<td>{listABow["Mat"] ? listABow["Mat"] : "-"}</td>
						<td>{listABow["Runs"] ? listABow["Runs"] : "-"}</td>
						<td>{listABow["SR"] ? listABow["SR"] : "-"}</td>
						<td>{listABow["Wkts"] ? listABow["Wkts"] : "-"}</td>
					</tr>
					)
			})
		}

		let displayTestsBow;
		if(this.state.test_dataBow[0] != undefined){
			displayTestsBow = this.state.test_dataBow.map((testBow, testBowindex)=>{
				return(
					<tr key={testBowindex}>
						<td><b>Test</b></td>
						<td>{testBow["4w"] ? testBow["4w"] : "-"}</td>
						<td>{testBow["5w"] ? testBow["5w"] : "-"}</td>
						<td>{testBow["10"] ? testBow["10"] : "-"}</td>
						<td>{testBow["Ave"] ? testBow["Ave"] : "-"}</td>
						<td>{testBow["BBI"] ? testBow["BBI"] : "-"}</td>
						<td>{testBow["BBM"] ? testBow["BBM"] : "-"}</td>
						<td>{testBow["Balls"] ? testBow["Balls"] : "-"}</td>
						<td>{testBow["Econ"] ? testBow["Econ"] : "-"}</td>
						<td>{testBow["Inns"] ? testBow["Inns"] : "-"}</td>
						<td>{testBow["Mat"] ? testBow["Mat"] : "-"}</td>
						<td>{testBow["Runs"] ? testBow["Runs"] : "-"}</td>
						<td>{testBow["SR"] ? testBow["SR"] : "-"}</td>
						<td>{testBow["Wkts"] ? testBow["Wkts"] : "-"}</td>
					</tr>
					)
			})
		}
		if(!isLoaded && !player_statistics){	
			return (
				<Grid container spacing={12}>
					<div data-aos="flip-left" className="player_search">
						<Card className="card_search">
							<CardContent className="cardText">
								<TextField
								className="standard-name"
								variant="outlined"
								label="Player Name"
								onChange={this.handleChangeEnd}
								margin="normal"
								/>
								<Button style={{marginLeft:11,marginTop:9}} variant="contained" color="primary" onClick={this.handleClick}>
									Search
								</Button>
							</CardContent>
						</Card>
						<div className="imageClass">
							<img src={background} style={{height:300,width:280,marginTop:3}}></img>
						</div>
					</div>
				</Grid>
				)
		} else if(!player_statistics) {
			return(
				<div></div>
			)
		} else if(isLoaded && player_statistics.fullName) {
			return(
				<Grid container spacing={12}>
					<div data-aos="flip-left" className="player_search">
						<Card className="card_search">
							<CardContent>
								<TextField
								className="standard-name"
								variant="outlined"
								label="Player Name"
								onChange={this.handleChangeEnd}
								margin="normal"
								/>
								<Button style={{marginLeft:5,marginTop:7}} variant="contained" color="primary" onClick={this.handleClick}>
									Search
								</Button>
							</CardContent>
						</Card>
					</div>
					<Card className="cardDetails">
						<Grid container spacing={12}>
							<Grid data-aos="zoom-in" item md={3} >
								<img src={player_statistics.imageURL} width="100%"></img>
							</Grid>
							<Grid data-aos="fade-up" item md={9} >
							<CardContent>
								<Typography gutterBottom variant="h5" component="h2">
								<span className="font_name">{player_statistics.fullName}</span>
								</Typography>
								<Grid container spacing={12}>
									<Grid item sm={3} xs={12}>
										<span className="font_heading">Born</span>
									</Grid>
									<Grid item sm={9} xs={12} className="playerrow">
										{player_statistics.born}
									</Grid>
									<Divider/>
									<Grid item sm={3} xs={12}>
										<span className="font_heading">Country</span>
									</Grid>
									<Grid item sm={9} xs={12} className="playerrow">
										{player_statistics.country}
									</Grid>
									<Divider />
									<Grid item sm={3} xs={12}>
										<span className="font_heading">Age</span>
									</Grid>
									<Grid item sm={9} xs={12} className="playerrow">
										{player_statistics.currentAge}
									</Grid>
									<Divider />
									<Grid item sm={3} xs={12}>
										<span className="font_heading">Batting Style</span>
									</Grid>
									<Grid item sm={9} xs={12} className="playerrow">
										{player_statistics.battingStyle}
									</Grid>
									<Divider />
									<Grid item sm={3} xs={12}>
										<span className="font_heading">Bowling Style</span>
									</Grid>
									<Grid item sm={9} xs={12} className="playerrow">
										{player_statistics.bowlingStyle}
									</Grid>
									<Divider />
									<Grid item sm={3} xs={12}>
										<span className="font_heading">Player Role</span>
									</Grid>
									<Grid item sm={9} xs={12} className="playerrow">
										{player_statistics.playingRole}
									</Grid>
									<Divider />
									<Grid item sm={3} xs={12}>
										<span className="font_heading">Teams</span>
									</Grid>
									<Grid item sm={9} xs={12} className="playerrow">
										{player_statistics.majorTeams}
									</Grid>
									<Divider/>
								</Grid>
							</CardContent>
						</Grid>
						<Grid data-aos="fade-up" item sm={12}>
							<Typography variant="body2" style={{textAlign:'justify',color: '#000',marginTop:10, marginBottom: 10, lineHeight:2, fontSize: 16}} color="textSecondary" component="p">
								{player_statistics.profile}
							</Typography>
						</Grid>
						<Grid data-aos="fade-up" item sm={12} xs={12}>
						<div><h2>Batting Career Summary</h2></div>
							<div className="scoreTable">
								<table>
									<thead>
										<tr>
											<th></th>
											<th>4s</th>
											<th>6s</th>
											<th>50</th>
											<th>100</th>
											<th title="Average">Ave</th>
											<th title="Ball Faced">BF</th>
											<th title="Catches">Ct</th>
											<th title="High Score">Hs</th>
											<th title="Innings">Inns</th>
											<th>Mat</th>
											<th title="No Balls">NO</th>
											<th>Runs</th>
											<th title="Strike Rate">SR</th>
										</tr>
									</thead>
									<tbody>
									{displayODI ? displayODI : <tr><td colSpan="14">Not Played any ODI Matches</td></tr>}
									{displayT20 ? displayT20 : <tr><td colSpan="14">Not Played any T20 Matches</td></tr>}
									{displayfirstClass ? displayfirstClass : <tr><td colSpan="14">Not Played any Firstclass Matches</td></tr>}
									{displayListA ? displayListA : <tr><td colSpan="14">Not Played any List-A Matches</td></tr>}
									{displayTests ? displayTests : <tr><td colSpan="14">Not Played any Test Matches</td></tr>}
									</tbody>
								</table>
							</div>
						<div><h2>Bowling Career Summary</h2></div>
							<div className="scoreTable">
								<table>
									<thead>
										<tr>
											<th></th>
											<th title="4 Wickets in an innings">4w</th>
											<th title="5 Wickets in an innings">5w</th>
											<th>10</th>
											<th title="Average">Ave</th>
											<th title="Best Bowling in Innings">BBI</th>
											<th title="Best Bowling in Match">BBM</th>
											<th>Balls</th>
											<th title="Economy rate">Econ</th>
											<th>Inns</th>
											<th>Mat</th>
											<th>Runs</th>
											<th title="Strike Rate">SR</th>
											<th title="Wickets">Wkts</th>
										</tr>
									</thead>
									<tbody>
										{displayODIBow ? displayODIBow : <tr><td colSpan="14">Not Played any ODI Matches</td></tr>}
										{displayT20Bow ? displayT20Bow : <tr><td colSpan="14">Not Played any T20 Matches</td></tr>}
										{displayfirstClassBow ? displayfirstClassBow : <tr><td colSpan="14">Not Played any Firstclass Matches</td></tr>}
										{displayListABow ? displayListABow : <tr><td colSpan="14">Not Played any List-A Matches</td></tr>}
										{displayTestsBow ? displayTestsBow : <tr><td colSpan="14">Not Played any Test Matches</td></tr>}
									</tbody>
								</table>
							</div>
						</Grid>
						</Grid>
						<Button variant="contained" color="primary" style={{marginTop:10}}>
						<Link to={"/home"}><span>Back</span></Link>
						</Button>
					</Card>
				</Grid>
				)
		}
		else if(player_statistics.error == "error"){
			return(
				<Grid container spacing={12}>
					<div data-aos="flip-left" className="player_search">
						<Card className="card_search">
							<CardContent className="cardText">
								<TextField
								className="standard-name"
								variant="outlined"
								label="Player Name"
								onChange={this.handleChangeEnd}
								margin="normal"
								style={{marginBottom:0}}
								/>
								<Button style={{marginLeft:11,marginTop:9}} variant="contained" color="primary" onClick={this.handleClick}>
									Search
								</Button>
							</CardContent>
						</Card>
						<center><p>Sorry No Such Player Exist</p></center>
						<div className="imageClass">
							<img src={background} style={{height:300,width:280,marginTop:3}}></img>
						</div>
					</div>
				</Grid>
			)
		}
	}	
}
export default player;
