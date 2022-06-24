/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './shared/DashboardHeader';
import DashboardSidebar from './shared/DashboardSidebar';
import { getLeaderboardDetails } from '../../redux/actions/userActions'
import setGlobalLoader from '../../redux/actions/dashboardLoaderActions';

export default function LeaderBoard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authReducer = useSelector((state) => state.authReducer);
    // const isAdmin = authReducer?.user?.userType === '0';

    const [userList, setUserList] = useState([])

    useEffect(() => {
        setGlobalLoader(true)
        dispatch(getLeaderboardDetails()).then((response) => {
            if (response.status === 200) {
                setUserList(response.data)
                setGlobalLoader(false)
            }
        }).catch((error) => {
            console.log(error)
            toast.error('some error occured while getting leaderboard details')
            setGlobalLoader(false)
        })
    }, [])

    return (
        <>
            <DashboardHeader />
            <div className="page-content">
                <DashboardSidebar />
                {/* <!-- Main content --> */}
                <div className="content-wrapper">
                    {/* <!-- Inner content --> */}
                    <div className="content-inner">
                        {/* <!-- Page header --> */}
                        <div className="page-header page-header-light">
                            <div className="page-header-content header-elements-lg-inline">
                                <div className="page-title d-flex">
                                    <h4>
                                        <span className="font-weight-semibold">
                                            Leader Board
                                        </span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /page header --> */}
                        {/* <!-- Content area --> */}
                        <div className="content">
                            <div className="row justify-content-center">
                                {userList?.slice(0,3).map((user) => (
                                    <div className="col-xl-3 col-lg-3 col-sm-12">
                                        <div className="card text-white leader-board-card" >
                                            <div className="card-body text-center">
                                                <div className="card-img-actions d-inline-block mb-3">
                                                    <img className="img-fluid rounded-circle leaderboardImage" src={user?.user?.profile_image ? user?.user?.profile_image : 'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1652010949/w1brnxd9vrid1d21fbi6.jpg'} alt="" />
                                                </div>
                                                <h2>Rs {user?.totalIncome}</h2>
                                                <h6 className="font-weight-semibold mb-0">{user?.user?.name}</h6>
                                                <span className="d-block opacity-75">@{user?.user?.username}</span>
                                                {/* {isAdmin &&
                                                    <div className="list-icons list-icons-extended mt-3">
                                                        <a href={`/edit-user/${user?.user?.userreference}`} className="list-icons-item text-white" data-popup="tooltip" title="Google Drive" data-container="body"><i className="icon-pencil7" /></a>
                                                    </div>
                                                } */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="row justify-content-center">
                                {userList?.slice(3,5).map((user) => (
                                    <div className="col-xl-3 col-lg-3 col-sm-12">
                                        <div className="card text-white leader-board-card" >
                                            <div className="card-body text-center">
                                                <div className="card-img-actions d-inline-block mb-3">
                                                    <img className="img-fluid rounded-circle leaderboardImage" src={user?.user?.profile_image ? user?.user?.profile_image : 'https://res.cloudinary.com/dtqrvcvp8/image/upload/v1652010949/w1brnxd9vrid1d21fbi6.jpg'} alt="" />
                                                </div>
                                                <h2>Rs {user?.totalIncome}</h2>
                                                <h6 className="font-weight-semibold mb-0">{user?.user?.name}</h6>
                                                <span className="d-block opacity-75">@{user?.user?.username}</span>
                                                {/* {isAdmin &&
                                                    <div className="list-icons list-icons-extended mt-3">
                                                        <a href={`/edit-user/${user?.user?.userreference}`} className="list-icons-item text-white" data-popup="tooltip" title="Google Drive" data-container="body"><i className="icon-pencil7" /></a>
                                                    </div>
                                                } */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
