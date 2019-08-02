import React, { Component } from 'react'
import { connect } from 'react-redux';
import style from './Register.module.scss';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../store/actions/user/authAction';

export class Register extends Component {

    state = {
        username: '',
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
        this.props.registerUser(this.state);
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
                                    <h3 className="text-center">Sign up</h3>
                                    <form className="mt-4" onSubmit={this.handleSubmit}>

                                        <div className="form-group">
                                            <label htmlFor="username" className="form-label">Username</label>
                                            <input type="text" className="form-control" id="username" value={this.state.username} onChange={this.handleChange} required/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" value={this.state.email} onChange={this.handleChange} required/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" value={this.state.password} onChange={this.handleChange} required/>
                                        </div>

                                        <small className="mt-4">
                                            Already have an account?
                                            <Link to="/login">login</Link>
                                        </small>

                                        <div className="text-center mt-3">
                                            <button className="btn btn-success">
                                                Register
                                                {
                                                    this.props.loading ? (
                                                        <div className="ml-4 spinner-border spinner-border-sm" role="status">
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
    return {
        registerUser: (credentials) => dispatch(register(credentials)).then(() => {
            console.log('here')
            ownProps.history.push('/')
        }).catch(err => {
            console.log(err)
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
