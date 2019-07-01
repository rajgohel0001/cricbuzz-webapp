import React,{Component} from 'react';
import * as mdc from 'material-components-web';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './futureSeries.css';

class futureSeries extends Component{
	constructor(props){
		super(props);
		this.state = {
			futureSeries: [],
			isLoaded: false,
		}
	}
	componentDidMount(){
		fetch("https://cricapi.com/api/matches?apikey=VuyDMPX3CHOT2xGg9Aqk1PyVqRm1")
        .then(res => res.json())
        .then(json =>{
          console.log(json);
          this.setState({
              isLoaded: true,
              future_series: json.data,
          })
      })
	}
		render(){
			const { futureSeries,isLoaded } = this.state;
			console.log("futureSeries",futureSeries);
			return(
			<div>
			{futureSeries.map(item =>{
				return(
					<div>
						{item.date}
					</div>
					)
			})}
			</div>
			)
		}	
}
export default futureSeries;
