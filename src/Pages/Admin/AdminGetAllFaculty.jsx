import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { adminGetAllFaculty } from '../../redux/action/adminAction'
import AdminHomeHelper from '../../Components/AdminHomeHelper'
import classnames from 'classnames'

const AdminGetAllFaculty = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [classroom, setDepartment] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()


    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(adminGetAllFaculty({ classroom }))
    }

    useEffect(() => {
        if (store.admin.allFaculty.length !== 0) {
            setIsLoading(false)
        }
        
    }, [store.admin.allFaculty.length])

    
    return (
        <div>
            {store.admin.isAuthenticated ? <>
                <AdminHomeHelper />
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-4">
                            <form form-inline noValidate onSubmit={formHandler}>
                                <div className="form-group">
                                    <label htmlFor="departmentId">classroom</label>
                                    <select onChange={(e) => setDepartment(e.target.value)} className={classnames("form-control",
                                        {
                                            'is-invalid': error.classroom
                                        })} id="departmentId">
                                        <option>Select</option>
                                        

                                        <option value="five">Five</option>
                                        <option value="six">Six</option>
                                        <option value="seven">Seven</option>
                                        <option value="eight">Eight</option>
                                        <option value="nine">Nine</option>
                                        <option value="ten">Ten</option>

                                    </select>
                                    {error.classroom && (<div className="invalid-feedback">{error.classroom}</div>)}
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-md-1">
                                        {
                                            isLoading && <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {!isLoading && <button type="submit" className="btn btn-info btn-block  ">Search</button>}
                            </form>


                        </div>
                        <div className="col-md-8">
                            
                            {store.admin.allFaculty.length !== 0 && <table className="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Registration Number</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Joining Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.admin.allFaculty.map((res, index) =>
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{res.registrationNumber}</td>
                                                <td>{res.name}</td>
                                                <td>{res.email}</td>
                                                <td>{res.joiningYear}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>}
                           
                        </div>
                    </div>
                </div>
            </> : (history.push('/'))}
        </div>
    )
}

export default AdminGetAllFaculty
