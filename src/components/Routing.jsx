import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
import Calender from "../modules/Calender/Calender";
import JobDetails from "../modules/Jobs/JobDetails";
import CandidateList from "../modules/Candidate/CandidateList";
import AddCandidate from "../modules/Candidate/AddCandidate";
import CandidateDetails from "../modules/Candidate/CandidateDetails";
import AddContact from "../modules/Contact/AddContact";
import ContactList from "../modules/Contact/ContactList";
import ContactDetails from "../modules/Contact/ContactDetails";
import ResetPassword from "../modules/Auth/ResetPassword";
import AttendanceList from "../modules/Calender/AttendanceList";
import EmployeeCalendar from "../modules/Attendance/EmployeeCalendar";


const Routing = () => {

    const [context, setContext] = useState('')
    const [superAdmin, setSuperAdmin] = useState(false)
    const token = localStorage.getItem('accessToken')

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
        }

    }, [token])

    return (
        <Context.Provider value={[context, setContext]}>
            <Routes>
                {token &&
                    <Route caseSensitive={false} path="/" element={<Layout />}>
                        <Route caseSensitive={false} path="/" element={<Dashboard />} />
                        {context && context.auth && (superAdmin || context.auth.permissions) && <>

                            {/* Attendance Sheet */}
                            <Route caseSensitive={false} path="/calender" element={<EmployeeCalendar />} />

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
                                <Route caseSensitive={false} path="/view-calender" element={<EmployeeCalendar />} />
                            </>}

                            {/* Common Settings Routes */}
                            {(superAdmin || context.auth.permissions.includes('Common Settings')) && <>
                                <Route caseSensitive={false} path="/common-setting" element={<SettingMaster />} />
                            </>}

                            {/* Post Jobs */}
                            {(superAdmin || context.auth.permissions.includes('Post Job')) && <>
                                <Route caseSensitive={false} path="/manage-jobs" element={<JobList />} />
                                <Route caseSensitive={false} path="/jobs-details" element={<JobDetails />} />
                                <Route caseSensitive={false} path="/create-job" element={<CreateJob />} />
                                <Route caseSensitive={false} path="/edit-job" element={<CreateJob />} />
                            </>}

                            {/* Candidate Route */}
                            {(superAdmin || context.auth.permissions.includes('Candidate')) && <>
                                <Route caseSensitive={false} path="/candidates-list" element={<CandidateList />} />
                                <Route caseSensitive={false} path="/candidate-details" element={<CandidateDetails />} />
                                <Route caseSensitive={false} path="/add-candidates" element={<AddCandidate />} />
                                <Route caseSensitive={false} path="/edit-candidate" element={<AddCandidate />} />
                            </>}

                            {/* Contact Route */}
                            {(superAdmin || context.auth.permissions.includes('Contact')) && <>
                                <Route caseSensitive={false} path="/contacts-list" element={<ContactList />} />
                                <Route caseSensitive={false} path="/contact-details" element={<ContactDetails />} />
                                <Route caseSensitive={false} path="/add-contact" element={<AddContact />} />
                                <Route caseSensitive={false} path="/edit-contact" element={<AddContact />} />
                            </>}

                            {superAdmin && <>
                                <Route caseSensitive={false} path="/attendance-list" element={<AttendanceList />} />
                            </>}

                            {/* Settings */}
                            <Route caseSensitive={false} path="/account-settings" element={<AccountSetting />} />

                            <Route path="*" element={<ErrorPage />} />
                        </>}
                    </Route>
                }else{<>
                    <Route caseSensitive={false} path="/" element={<Login />} />
                    <Route caseSensitive={false} path="/login" element={<Login />} />
                    <Route caseSensitive={false} path="/forgot-password" element={<ForgotPassword />} />
                    <Route caseSensitive={false} path="/reset-password" element={<ResetPassword />} />
                </>
                }
                {!token && <Route path="*" element={<ErrorPage />} />}
            </Routes>
        </Context.Provider>
    )

}

export default Routing