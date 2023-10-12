import { useEffect, useState } from "react";
import { COMMON_DROPDOWN } from "../../components/APIRoutes";
import { fetchData } from "../../components/Helper";
import * as Elements from "../../components/Elements";

const RoleFilter = ({setValue}) => {
    const [roles, setRoles] = useState([])
    const [role, setRole] = useState({value: 'all', label: "All"})

    useEffect(() => {
        fetchData(COMMON_DROPDOWN + '?type=roles', 'GET', '', true, false, (res) => {
            if (res.status) {
                setRoles([{value: 'all', label: "All"}, ...res.data])
            }
        })
    }, [])

    return (

        <>
            <div style={{ width: "200px" }}>
                <Elements.ReactSelect
                    placeholder="Select Role"
                    options={roles}
                    name="role"
                    id="role"
                    value={role}
                    className="react-select required"
                    onChange={(e) => {setRole(e); setValue(e.label === 'All' ? 'all' : e.label)}}
                    required={true}
                />
            </div>
        </>

    )

}
export default RoleFilter;