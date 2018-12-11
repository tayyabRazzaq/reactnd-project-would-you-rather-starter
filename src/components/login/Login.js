import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllUsers, login} from "./loginActions";
import DropDown from "../utils/DropDown";
import {Grid, Row, Col, Button} from 'react-bootstrap';
import reactReduxLogo from '../../icons/react-redux.jpg';


class Login extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			selectedUser: null
		};
	}
	
	componentDidMount() {
		this.props.getAllUsers();
	}
	
	handleChange = (selectedUser) => {
		this.setState({selectedUser});
	};
	
	handleSignIn = () => {
		const { selectedUser } = this.state;
		if (!selectedUser) {
			return;
		}
		this.props.login(selectedUser).then(() => {
			debugger;
			this.props.history.push('/home');
		});
	};
	
	render() {
		
		const allUsers = this.props.loginReducer.get('allUsers');
		
		const options = Object.keys(allUsers).map((key) => {
			return {...allUsers[key], value: allUsers[key]['id'], label: allUsers[key]['name']}
		});
		
		return (
			
			<Grid className='sign-in-panel'>
				<Row className='header'>
					<Col sm={12}>
						<div className='col-centered'>
							<strong>Welcome to Would you Rather App</strong>
							<br/>
							Please Sign in to continue
						</div>
					</Col>
				</Row>
				<Row>
					<Col sm={12}>
						<div className='col-centered'>
							<img src={reactReduxLogo} alt='react-redux-logo' className='react-redux-logo'/>
						</div>
					</Col>
				</Row>
				<Row>
					<Col sm={12}>
						<div className='col-centered'>
							<span className='sign-in-text'>Sign In</span>
						</div>
					</Col>
				</Row>
				<Row>
					<Col sm={12}>
						<div>
							<DropDown value={this.state.selectedUser} options={options} onChange={this.handleChange}/>
						</div>
					</Col>
				</Row>
				<Row>
					<Col sm={12}>
						<div className='col-centered footer'>
							<Button block className='sign-in-btn' onClick={this.handleSignIn}>Sign In</Button>
						</div>
					</Col>
				</Row>
			</Grid>
		
		);
	}
}

function mapStateToProps(state) {
	return {
		loginReducer: state.loginReducer,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch: dispatch,
		getAllUsers: function() {
			return dispatch(getAllUsers());
		},
		login: function(userObj) {
			return dispatch(login(userObj));
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);