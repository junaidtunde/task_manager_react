import React, { Component } from 'react'
import style from './TaskList.module.scss'
import { connect } from 'react-redux';
import { archiveTask } from '../../../store/actions/user/taskAction';

export class TaskList extends Component {

    deleteComment = (comment_id) => {
        console.log(comment_id)
    }

    renderSwitch = (key) => {
        switch (key) {
            case 'new':
                return (
                    <span className="badge badge-primary">new</span>
                )

            case 'in-progress':
                return (
                    <span className="badge badge-secondary">in-progress</span>
                )

            case 'completed':
                return (
                    <span className="badge badge-success">completed</span>
                )

            case 'archived':
                return (
                    <span className="badge badge-info">archived</span>
                )

            default: 
                return null
        }
    }

    render() {
        const { tasks } = this.props
        return (
            <div>
                <div className="container">
                    <div className="card" style={{height: '90vh', overflow: 'scroll'}}>
                        <h3 className="mt-3">List of all tasks</h3>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Assigned</th>
                                            <th>Comments</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tasks.length !== 0 ? tasks.map(task => {
                                                return (
                                                    <tr key={task._id}>
                                                        <td>{task.description}</td>
                                                        <td>{task.user.username}</td>
                                                        <td>
                                                            {
                                                                task.comments.length !== 0 ? task.comments.map(comment => {
                                                                    return (
                                                                        <ul className="pl-0" style={{listStyleType: 'none'}}>
                                                                            {
                                                                                comment.message ? (
                                                                                    <li>
                                                                                        <small>
                                                                                            {comment.message}
                                                                                            <i className="fas fa-trash" style={{color: 'red', cursor: 'pointer'}} onClick={() => this.delecomment(comment._id)}></i>
                                                                                        </small>
                                                                                    </li>
                                                                                ) : (
                                                                                    <li><small>There are no comments at the moment</small></li>
                                                                                )
                                                                            }
                                                                        </ul>
                                                                    )
                                                                }) : (
                                                                    <small>There are no comments at the moment</small>
                                                                )
                                                            }
                                                        </td>
                                                        <td>
                                                            { this.renderSwitch(task.status) }
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <span className={`${style.moreOptionsRight} bg-danger`} onClick={() => this.props.archiveTask(task._id)}>
                                                                    <i className="fas fa-file-archive" style={{color: 'white'}}></i>
                                                                    <span className="ml-2 text-white">Archive</span>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }) : null
                                        }
                                    </tbody>
                                </table>
                                
                                {
                                    tasks.length === 0 ? (
                                        <h3 className="text-center" style={{fontWeight: 'lighter'}}>There are no tasks at the moment</h3>
                                    ) : null
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        archiveTask: (task_id) => dispatch(archiveTask(task_id))
    }
}

export default connect(null, mapDispatchToProps) (TaskList)
