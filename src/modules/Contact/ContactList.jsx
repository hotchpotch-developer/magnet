import Breadcrumbs from "../../components/Breadcrumbs"
import { useEffect, useState } from "react";
import { CONTACT_EXPORT, CONTACT_LIST } from "../../components/APIRoutes";
import { downloadFile, fetchData } from "../../components/Helper";
import ContactItem from "./Partials/ContactItem";
import Filter from "../../components/Filter";
import NoRecord from "../../components/NoRecord";

const ContactList = () => {
    const [contacts, setContacts] = useState(false)
    const [query, setQuery] = useState("")

    useEffect(() => {
        fetchData(`${CONTACT_LIST}?${query}`, 'GET', '', true, false, (res) => {
            setContacts(res)
        })
    }, [query])

    const exportContact = () => {
        fetchData(CONTACT_EXPORT, "GET", "", true, false, (file) => {
            downloadFile(file, `Contact-Details`)
        }, false, 'blob')
    }

    return (
        <>
            <Breadcrumbs title="Contact List" parentPage="Business Contact" />
            <div className="row mb-2">
                <div className="text-end">
                    <button type="button" className="btn btn-sm btn-primary me-2" onClick={exportContact} title="Contact Export">
                        Contact Export
                    </button>
                </div>
            </div>
            <div className="row">
                <Filter setQuery={setQuery}
                    filterItem={['state', 'location', 'industry', 'company', 'sales_non_sales', 'department', 'channel']}
                    selectFilter={[
                        { key: "state", value: "State" },
                        { key: "location", value: "Location" },
                        { key: "industry", value: "Industry" },
                        { key: "company", value: "Company" },
                        { key: "sales_non_sales", value: "Sales/Non Sales" },
                        { key: "department", value: "Department" },
                        { key: "channel", value: "Channel" },
                    ]}
                />
                <div className="col-xl-9 col-lg-8">
                    {contacts && contacts.data && contacts.data.length > 0 ? contacts.data.map((item, key) => {
                        return <ContactItem item={item} key={key} />
                    })
                    :
                        <NoRecord />
                    }
                </div>
            </div>
        </>
    )

}

export default ContactList;