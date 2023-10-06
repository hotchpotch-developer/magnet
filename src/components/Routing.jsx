import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Context } from "./Context";
import Layout from "./Layout";
import Login from "../modules/Auth/Login";
import ForgotPassword from "../modules/Auth/ForgotPassword";
import Dashboard from "../modules/Dashboard/Dashboard";
import { fetchData } from "./Helper";
import { GET_AUTH_INFO } from "./APIRoutes";
import ErrorPage from "./ErrorPage";
import ManageRoles from "../modules/Permission/ManageRoles";
import ManagePermission from "../modules/Permission/ManagePermission";
import SettingMaster from "../modules/CommonSettings/ManagesStates/SettingMaster";
import TeamList from "../modules/Teams/TeamList";
import CreateTeam from "../modules/Teams/CreateTeam";
import TeamProfile from "../modules/Teams/TeamProfile";
import AccountSetting from "../modules/AccountSetting/AccountSetting";
import JobList from "../modules/Jobs/JobList";
import CreateJob from "../modules/Jobs/CreateJob"
import EmployeeCalendar from "../modules/Attendance/EmployeeCalendar";


const Routing = () => {

    const [context, setContext] = useState('')
    const [superAdmin, setSuperAdmin] = useState(false)
    const token = localStorage.getItem('accessToken')
    const navigate = useNavigate()

    useEffect(() => {

        if (token) {
            fetchData(GET_AUTH_INFO, 'GET', '', true, false, (res) => {
                if (res.status === 200 && res.data) {
                    setContext(prev => ({ ...prev, auth: res.data }));
                    if (res.data.role_id === "1") {
                        setSuperAdmin(true);
                    }
                }
            })
        } else {
            navigate('/')
        }

    }, [token, navigate])

    return (
        <Context.Provider value={[context, setContext]}>
            <Routes>
                {token &&
                    <Route caseSensitive={false} path="/" element={<Layout />}>
                        <Route caseSensitive={false} path="/" element={<Dashboard />} />
                        {context && context.auth && (superAdmin || context.auth.permissions) && <>

                            {/* Attendance Sheet */}
                            <Route caseSensitive={false} path="/attendance" element={<EmployeeCalendar />} />

                            {/* Permission Routes */}
                            {(superAdmin || context.auth.permissions.includes('Permission')) && <>
                                <Route caseSensitive={false} path="/manage-roles" element={<ManageRoles />} />
                                <Route caseSensitive={false} path="/manage-permission" element={<ManagePermission />} />
                            </>}

                            {/* Teams Routes */}
                            {(superAdmin || context.auth.permissions.includes('Teams')) && <>
                                <Route caseSensitive={false} path="/team-list" element={<TeamList />} />
                                <Route caseSensitive={false} path="/add-team" element={<CreateTeam />} />
                                <Route caseSensitive={false} path="/edit-team" element={<CreateTeam />} />
                                <Route caseSensitive={false} path="/team-profile" element={<TeamProfile />} />
                            </>}

                            {/* Common Settings Routes */}
                            {(superAdmin || context.auth.permissions.includes('Common Settings')) && <>
                                <Route caseSensitive={false} path="/common-setting" element={<SettingMaster />} />
                            </>}
                            
                            {/* Post Jobs */}
                            {(superAdmin || context.auth.permissions.includes('	Post Job')) && <>
                                <Route caseSensitive={false} path="/manage-jobs" element={<JobList />} />
                                <Route caseSensitive={false} path="/create-job" element={<CreateJob />} />
                            </>}

                            {/* Settings */}
                            <Route caseSensitive={false} path="/account-settings" element={<AccountSetting />} />

                            <Route path="*" element={<ErrorPage />} />
                        </>}
                    </Route>
                }

                <Route caseSensitive={false} path="/" element={<Login />} />
                <Route caseSensitive={false} path="/forgot-password" element={<ForgotPassword />} />
                {!token && <Route path="*" element={<ErrorPage />} />}
            </Routes>
        </Context.Provider>
    )

}

export default Routing