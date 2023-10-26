import Breadcrumbs from "../../components/Breadcrumbs"
import { useEffect, useState } from "react";
import { CONTACT_LIST } from "../../components/APIRoutes";
import { fetchData } from "../../components/Helper";
import ContactFilter from "./Partials/ContactFilter";
import ContactItem from "./Partials/ContactItem";

const ContactList = () => {
    const [contacts, setContacts] = useState(false)
    const [query, setQuery] = useState("")

    useEffect(() => {
        fetchData(`${CONTACT_LIST}?${query}`, 'GET', '', true, false, (res) => {
            setContacts(res)
        })
    }, [query])

    return (
        <>
            <Breadcrumbs title="Candidate List" parentPage="Candidate List" />
            <div className="row">
                <ContactFilter setQuery={setQuery} />
                <div className="col-xl-9 col-lg-8">
                    {contacts && contacts.data && contacts.data.length > 0 && contacts.data.map((item, key) => {
                        return <ContactItem item={item} key={key} />
                    })}
                </div>
            </div>
        </>
    )

}

export default ContactList;