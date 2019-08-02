import React, { Component } from 'react'
import { connect } from 'react-redux';
import signInAdmin from '../../../store/actions/admin/authAction';
import styles from './AdminLogin.module.scss'
import { Redirect } from 'react-router-dom';

export class AdminLogin extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.login(this.state)
    }

    render() {
        if (this.props.admin) return (
            <Redirect to="/admin/dashboard"></Redirect>
        )
        return (
            <div>
                <div style={{backgroundColor: '#F5F5F5'}}>
                    <div className={`${styles.contain}`}>
                        <div className="card">
                            <div className="card-body pb-10">
                                <div className="text-center">Administrator Login</div>
                                <hr/>
                                <form onSubmit={this.handleSubmit} className="mt-4">

                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="email" value={this.state.email} onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.handleChange} />
                                    </div>

                                    <div className="text-center mt-3">
                                        <button className="btn btn-success">
                                            Login
                                            {
                                                this.props.loading ? (
                                                    <div className="ml-3 spinner-border spinner-border-sm" role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                ) : null
                                            }
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        admin: state.auth.admin
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (credentials) => dispatch(signInAdmin(credentials)).then(() => {
            ownProps.history.push('/admin/dashboard')
        }).catch(err => {
            console.log(err)
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdminLogin)
