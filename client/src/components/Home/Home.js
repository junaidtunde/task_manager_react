import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export class Home extends Component {
    render() {
        if (!this.props.user) {
            return (
                <Redirect to="/login"></Redirect>
            )
        }
        return (
            <div>
                <h1>At Home</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Home)
