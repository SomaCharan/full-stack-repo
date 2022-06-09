import React from 'react'
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import { CSVLink } from "react-csv";
// import ExcelReport from './ExcelReport';

export default function ExportConfiguration({ exportOnClick, exportFilename, exportHeader, exportColumns }) {

    const expData = [];
    Object.keys(exportColumns).forEach((key) => {
        const val = [];
        const varValue = exportColumns[key];
        Object.keys(varValue).forEach((k) => {
            val.push(varValue[k]);
        });
        expData.push(val);
    });
    const exportData = [
        exportHeader,
        ...expData
    ];

    return (
        <div style={{ marginBottom: "20px", display: "flex" }} >
            <CSVLink data={exportData} filename={`${exportFilename}.csv`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary" startIcon={<GetAppIcon />} style={{ backgroundColor: "#00bcd4" }} ref={exportOnClick} > CSV </Button>
            </CSVLink>
            {/* <ExcelReport ExcelColumnHeader={props.exportHeader} data={expData} filename={props.exportFilename} /> */}
        </div>
    );
}