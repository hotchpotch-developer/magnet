import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from  "react-router-dom";
import { Context } from "./Context";
import Layout from "./Layout";
import Login from "../modules/Auth/Login";
import ForgotPassword from "../modules/Auth/ForgotPassword";
import Dashboard from "../modules/Dashboard/Dashboard";
import CreateManager from "../modules/Manager/CreateManager";
import { fetchData } from "./Helper";
import { GET_AUTH_INFO } from "./APIRoutes";
import ErrorPage from "./ErrorPage";
import ManageRoles from "../modules/Permission/ManageRoles";
import ManagePermission from "../modules/Permission/ManagePermission";
import SettingMaster from "../modules/CommonSettings/ManagesStates/SettingMaster";
import TeamList from "../modules/Teams/TeamList";
import CreateTeam from "../modules/Teams/CreateTeam";


const Routing = () => {

    const [context, setContext] = useState('')
    const token = localStorage.getItem('accessToken')
    const navigate = useNavigate()

    useEffect(() => {

        if(token) {
            fetchData(GET_AUTH_INFO, 'GET', '', true, false, (res) => {
                if(res.status === 200 && res.data) {
                    setContext(prev => ({...prev, auth: res.data}));
                }
            })
        }else{
            navigate('/')
        }

        document.querySelector("html").setAttribute("data-bs-theme", "dark");
    }, [token, navigate])

    return (
        <Context.Provider value={[context, setContext]}>
            <Routes>
                {context && context.auth &&
                    <Route caseSensitive={false} path="/" element={<Layout />}>
                        <Route caseSensitive={false} path="/" element={ <Dashboard />} />

                        {/* Permission Routes */}
                        <Route caseSensitive={false} path="/manage-roles" element={ <ManageRoles /> } />
                        <Route caseSensitive={false} path="/manage-permission" element={ <ManagePermission /> } />

                        {/* Manager Routes */}
                        <Route caseSensitive={false} path="/add-manager" element={ <CreateManager />} />

                        {/* eams Routes */}
                        <Route caseSensitive={false} path="/team-list" element={ <TeamList /> } />
                        <Route caseSensitive={false} path="/add-team" element={ <CreateTeam /> } />
                        <Route caseSensitive={false} path="/edit-team" element={ <CreateTeam /> } />

                        {/* Common Settings Routes */}
                        <Route caseSensitive={false} path="/common-setting" element={ <SettingMaster /> } />

                    </Route>
                }
                
                <Route caseSensitive={false} path="/" element={ <Login /> } />
                <Route caseSensitive={false} path="/forgot-password" element={ <ForgotPassword /> } />
                {!token ? <Route path="*" element={<ErrorPage />} /> : ''}
            </Routes>
        </Context.Provider>
    )

}

export default Routing