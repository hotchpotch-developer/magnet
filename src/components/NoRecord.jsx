const NoRecord = () => {
    return (
        <>
            <div className="col-sm-12" >
                <div className="card" style={{height: "500px"}}>
                    <div className="card-body h-100">
                        <div className="col-sm-12 d-flex justify-content-center align-items-center h-100">
                            <i className="lab la-dropbox" style={{fontSize: "116px"}}></i>
                            <h2>No Record found</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoRecord;