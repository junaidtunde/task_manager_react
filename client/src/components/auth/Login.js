import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/user/authAction';
import style from './Login.module.scss'

export class Login extends Component {
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
        e.preventDefault();
        this.props.login(this.state);
    }

    render() {
        if (this.props.user) {
            return (
                <Redirect to="/"></Redirect>
            )
        }
        return (
            <div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className={`${style.contain}`}>
                            <div className={`${style.card}`}>
                                <div className="card-body pb-10">
                                    <h3 className="text-center">Sign In</h3>
                                    <hr/>
                                    <form className="mt-4" onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input type="email" id="email" value={this.state.email} onChange={this.handleChange} className="form-control"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" id="password" value={this.state.password} onChange={this.handleChange} className="form-control"/>
                                        </div>

                                        <small className="mt-4">
                                            Don't have an account? 
                                            <Link to="/register">register</Link>
                                        </small>

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
                    <div className={`col-0 col-md-6 ${style.right_bg}`}></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return  {
        login: (credentials) => dispatch(signIn(credentials)).then(() => {
            ownProps.history.push('/')
        }).catch(err => {
            console.log(err)
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
