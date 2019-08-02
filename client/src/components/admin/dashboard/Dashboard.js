import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import style from './Dashboard.module.scss'
import { getAllTasks, getAllUsers, create_new_task } from '../../../store/actions/user/taskAction';
import TaskList from '../TaskList/TaskList'


export class Dashboard extends Component {

    state = {
        description: '',
        user_id: ''
    }

    componentWillMount = () => {
        if (this.props.admin && this.props.tasks.length === 0) {
            this.props.fetchTasks()
        }
        if (this.props.admin && this.props.users.length === 0) {
            this.props.fetchUsers().then(() => {
                if (this.props.users.length !== 0) {
                    this.setState({
                        user_id: this.props.users[0]._id
                    })
                }
            })
        }
    }

    logout = () => {
        localStorage.clear();
        window.location.href = '/admin/login'
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSelect = (e) => {
        this.props.users.forEach(element => {
            if (element.username === e.target.value) {
                this.setState({
                    user_id: element._id
                })
            }
        });
    }

    createNewTask = (e) => {
        e.preventDefault()
        this.props.create_new_task(this.state)
    }

    render() {
        if (!this.props.admin) return (
            <Redirect to="/admin/login"></Redirect>
        )
        return (
            <div>
                {
                    this.props.loading ? (
                        <div className={`${style.loading}`}>
                            <div className={`${style.loading_bar}`} style={{marginRight: '10px'}}></div>
                            <div className={`${style.loading_bar}`} style={{marginRight: '10px'}}></div>
                            <div className={`${style.loading_bar}`} style={{marginRight: '10px'}}></div>
                            <div className={`${style.loading_bar}`}></div>
                        </div>
                    ) : (
                        <div>
                            <div className="container">
                                <nav className={style.light_text_header}>
                                    <span>Welcome Administrator</span>
                                    <span style={{float: 'right', cursor: 'pointer'}} onClick={this.logout}>
                                        <img src="/img/images/logout.png" alt="" className="img-fluid"/>
                                        <span style={{fontSize: 'smaller', marginLeft: '7px'}}>Logout</span>
                                    </span>
                                </nav>
                            </div>
                            <div className={`${style.dash_layout}`}>
                                <div className="row">
                                    <div className={`${style.center_items} col-12 col-md-4`}>
                                        <div className="container">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h3>Create Task</h3>
                                                    <hr/>
                                                    <form className="text-left" onSubmit={this.createNewTask}>
                                                        <div className="mb-3">
                                                            <label htmlFor="descrition">Description</label>
                                                            <textarea name="description" id="description" cols="10" rows="5" onChange={this.handleChange} className="form-control" value={this.state.description}></textarea>
                                                        </div>
                                                        
                                                        {
                                                            this.props.users.length !== 0 ? (
                                                                <div className="form-group">
                                                                <label htmlFor="select_user">Select a user</label>
                                                                <select className={`${style.custom_select} form-control`} id="username" onChange={this.handleSelect}>
                                                                    {
                                                                        this.props.users ? this.props.users.map(user => {
                                                                            return (
                                                                                <option value={user.username} key={user._id}>{user.username}</option>
                                                                            )
                                                                        }) : null
                                                                    }
                                                                </select>
                                                            </div>
                                                            ) : (
                                                                <div className="form-group">
                                                                    <p>There are no users in the system yet....</p>
                                                                </div>
                                                            ) 
                                                        }

                                                        {
                                                            this.props.length !== 0 ? (
                                                                <div className="text-right">
                                                                    <button className="btn btn-success" type="submit">
                                                                        Create
                                                                        {
                                                                            this.props.submit ? (
                                                                                <div className="spinner-border spinner-border-sm ml-4">
                                                                                    <span className="sr-only">Loading...</span>
                                                                                </div>
                                                                            ) : null
                                                                        }
                                                                    </button>
                                                                </div>
                                                            ) : null
                                                        }

                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${style.center_items} col-12 col-md-8`}>
                                        <TaskList tasks={this.props.tasks} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state.task.tasks)
    return {
        admin: state.auth.admin,
        tasks: state.task.tasks,
        users: state.task.users,
        loading: state.task.loading,
        submit: state.task.submit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTasks: () => dispatch(getAllTasks()),
        fetchUsers: () => {
            return new Promise ((resolve, reject) => {
                dispatch(getAllUsers()).then(() => {
                    resolve()
                }).catch(() => {
                    reject()
                })
            })
        },
        create_new_task: (task) => dispatch(create_new_task(task))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard)
