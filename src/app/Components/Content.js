import React, { useState, useEffect } from 'react'

const Content = () => {

    const [title, setTitle] = useState('')    
    const [description, setDescription] = useState('')
    const [id, setId] = useState('')    
    const [tasks, setTasks] = useState([])    
    
    const obj = {
        title: title,
        description: description
    }

    const addTask = (ev) => {
        if (id) {
            fetch(`/task/api/${id}`, {
                method: 'PUT',
                body: JSON.stringify(obj),
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                M.toast({html: 'Task updated'})
                setTitle('')
                setDescription('')
                setId('')
                fetchTask()  
            })
        } else {
            fetch('/task/api', {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Task saved'})
                setTitle('')
                setDescription('')
                fetchTask()          
            })
            .catch(err => console.error(err))
        }
        ev.preventDefault()    
    }

    const fetchTask = () => {
        fetch('/task/api')
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        setTimeout(() => {
            fetchTask()
        }, 1000)
    }, [])

    const deleteTask = (id) => {
        if(confirm('Are you secure of delete it?')) {
            fetch(`/task/api/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: 'Task Deleted'})
                    fetchTask()
                })
                .catch(err => console.error(err))
        }
    }

    const editTask = id => {
        fetch(`/task/api/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title)
                setDescription(data.description)
                setId(data._id)
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col s5">
                    <div className="card">
                        <div className="card-content">
                            <div className='row'>
                                <form className="col s12" onSubmit={addTask}>
                                    <div className='input-field col s12'>
                                        <div className='row'>
                                            <input type={'text'}
                                                placeholder='Task description'
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='input-field col s12'>
                                        <div className='row'>
                                            <textarea type={'text'} 
                                                placeholder='Task description' 
                                                className='materialize-textarea' 
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button type='submit' className='btn light-blue darken-4'>SEND</button>
                                </form>
                            </div>
                        </div> 
                    </div>
                </div>
                        <div className="col s5 m4">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className='btn light-blue darken-4' onClick={() => deleteTask(task._id)} >
                                                            <i className='material-icons'>delete</i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button className='btn light-blue darken-4' onClick={() => editTask(task._id)}>
                                                            <i className='material-icons'>edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
            </div>
        </div>
    )
}

export default Content
