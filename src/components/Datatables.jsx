import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.colVis.min';
import 'datatables.net-buttons/js/buttons.flash.min';
import 'datatables.net-buttons/js/buttons.print.min';
import 'datatables.net-buttons/js/buttons.html5.min';
import moment from 'moment';
export const ENDPOINT = process.env.REACT_APP_API_URL


export const initDataTable = (dt) => {
    
    if (typeof $ !== "undefined" && $.fn.dataTable) {
        var all_settings = $($.fn.dataTable.tables()).DataTable().settings();
        for (var i = 0, settings; (settings = all_settings[i]); ++i) {
            if (settings.jqXHR)
                settings.jqXHR.abort();
        }
    }

    const exportButons = [{
        extend: "collection",
        className: 'btn btn-sm me-0 float-end export-btn border rounded',
        text: "Table Controls &nbsp;",
        buttons: [
            {
                extend: "excelHtml5",
                className: 'export-btn',
                filename: 'export - ' + moment().format("DD-MMM-YYYY"),
                exportOptions: {
                    columns: "thead th:not(.noExport)",
                    modifier: {
                        order: 'current',
                        page: 'all',
                        search: 'none',
                        selected: null
                    }
                }
            },
            {
                extend: "csvHtml5",
                className: 'export-btn',
                filename: 'export - ' + moment().format("DD-MMM-YYYY"),
                exportOptions: {
                    columns: "thead th:not(.noExport)",
                    modifier: {
                        order: 'current',
                        page: 'all',
                        search: 'none',
                        selected: null
                    }
                }
            },
            {
                extend: 'pdfHtml5',
                filename: 'export - ' + moment().format("DD-MMM-YYYY"),
                orientation: 'landscape',
                pageSize: 'LEGAL',
                className: 'export-btn',
                customize: function (doc) {
                    doc.defaultStyle.fontSize = 13;
                    doc.styles.tableHeader.fontSize = 13;
                    var count = table.columns(':visible').count();
                    if (count < 9) {
                        doc.pageSize = 'LEGAL';
                    } else if (count >= 9 && count <= 10) {
                        doc.pageSize = 'A4';
                    } else if (count >= 11 && count <= 15) {
                        doc.pageSize = 'A3';
                    } else if (count >= 16 && count <= 20) {
                        doc.pageSize = 'A2';
                    } else if (count >= 21 && count <= 30) {
                        doc.pageSize = 'A1';
                    } else {
                        doc.pageSize = 'A0';
                    }
                },
                exportOptions: {
                    columns: "thead th:not(.noExport)",
                    modifier: {
                        order: 'current',
                        page: 'all',
                        search: 'none',
                        selected: null
                    }
                }
            },
            {
                extend: 'print',
                text: 'Print',
                className: 'export-btn',
                key: {
                    key: 'p',
                    altKey: true
                },
                exportOptions: {
                    columns: "thead th:not(.noExport)",
                    modifier: {
                        order: 'current',
                        page: 'all',
                        search: 'none',
                        selected: null
                    }
                }
            },
            {
                extend: 'copy',
                text: 'Copy',
                className: 'export-btn',
                key: {
                    key: 'c',
                    altKey: true
                },
                exportOptions: {
                    columns: "thead th:not(.noExport)",
                    modifier: {
                        order: 'current',
                        page: 'all',
                        search: 'none',
                        selected: null
                    }
                }
            },
            {
                extend: "colvis",
                text: 'Column Visibility &nbsp;',
                collectionLayout: "fixed two-column",
                collectionTitle: "Select Columns to Display",
                postfixButtons: ["colvisRestore"],
                columnText: function (dt, idx, title) {
                    return idx + 1 + ": " + title;
                }
            }
        ],
        select: true
    }
    ];
    
    const table = $('#wt_datatable_' + dt.dt_name).DataTable({
        
        dom: "B<'row clearfix mx-0'<'col-6 col-lg-2 px-0 text-center text-sm-start float-start my-2'l><'dt-custom-filter col-md-6 my-2 col-lg-8 px-0 text-center text-sm-end exportbuttons'><'col-md-12 col-lg-2 px-0 ps-2 ps-ms-0 text-center text-lg-end my-2'f>>" +
            "<'row clearfix mx-0'<'col-sm-12 px-0'<'table-responsive position-relative my-1' tr>>>" +
            "<'row clearfix mx-0'<'col-md-12 col-lg-5 px-0 text-center text-lg-start'i><'col-md-12 col-lg-7 px-0 text-center text-lg-end'p>>",
        // dom: 'Bfrtip',
        language: {
            searchPlaceholder: "Search...",
            processing: "Loading...",
            'loadingRecords': '&nbsp;',
        },
        lengthMenu: [[15, 25, 50, 100, 250, 500, -1], [15, 25, 50, 100, 250, 500, "All"]],
        processing: true,
        serverSide: true,
        orderable: true,
        paging: dt.dt_paging,
        searching: dt.dt_searching ?? true,

        ajax: {
            url: ENDPOINT + dt.dt_url,
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('accessToken')
            },
        },
        columns: dt.dt_column,
        columnDefs: dt.dt_column_defs,
        order: dt.dt_order ? dt.dt_order : [[0, 'desc']],
        initComplete: dt.dt_filter,
        createdRow: dt.dt_createdRow,
        buttons: dt.dt_export ? exportButons : [],
    });
    table.buttons().container().appendTo($('.exportbuttons'));

    var headers = table.columns().header().toArray();
    $(headers).on('click', function (e) {
        table.search('').draw();
    });
}

export const reloadDataTable = (dt) => {
    if ($.fn.DataTable.isDataTable('#wt_datatable_' + dt.dt_name)) {
        $('#wt_datatable_' + dt.dt_name).DataTable().clear().draw(null, false)
    } else {
        initDataTable(dt)
    }
}

export const redrawDataTable = (dt) => {
    if ($.fn.DataTable.isDataTable('#wt_datatable_' + dt.dt_name)) {
        $('#wt_datatable_' + dt.dt_name).DataTable().clear().draw(null, false);
        $('.dataTables_paginate').addClass('pagination-custom');
    } else {
        initDataTable(dt);
    }
}

export const reloadUrlDataTable = (dt, url) => {
    if ($.fn.DataTable.isDataTable('#wt_datatable_' + dt.dt_name) && url) {
        $('#wt_datatable_' + dt.dt_name).DataTable().clear().ajax.url(ENDPOINT + url).load()
    } else {
        initDataTable(dt)
    }
}

const Datatables = (props) => {

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">

                            <table id={`wt_datatable_${props.dt_name}`} data-page-length={props.dataPageLength} className="table table-bordered nowrap table-striped align-middle w-100">
                                <thead className=''></thead>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Datatables;