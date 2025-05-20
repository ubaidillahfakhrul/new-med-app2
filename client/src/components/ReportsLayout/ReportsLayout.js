import React from "react";
import "./ReportsLayout.css";

const reportsData = [
  {
    id: 1,
    doctorName: "Dr. John Doe",
    speciality: "Cardiology",
    reportUrl: "/patient_report.pdf",
    downloadUrl: "/patient_report.pdf",
  },
  {
    id: 2,
    doctorName: "Dr. Jane Smith",
    speciality: "Dermatology",
    reportUrl: "/Ppatient_report.pdf",
    downloadUrl: "/patient_report.pdf",
  },
];

const ReportLayout = () => {
  return (
    <div className="report-container">
      <h2 className="report-title">Reports</h2>

      <table className="report-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reportsData.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.doctorName}</td>
              <td>{report.speciality}</td>
              <td>
                <a href={report.reportUrl} className="report-button">
                  View Report
                </a>
              </td>
              <td>
                <a href={report.downloadUrl} className="report-button">
                  Download Report
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportLayout;
