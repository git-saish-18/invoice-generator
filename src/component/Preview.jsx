import React from "react";
import "../CSS/Preview.css";
import Tables from "./Tables";

const Preview = (props) => {
  return (
    <>
      <div ref={props.display} className="printable-content main">
        <style>
          {`
            @media print {
              .printable-content {
                margin-top: 2mm;
                margin-bottom: 20mm;
                width:260mm
                
              }
              .main{
                position:relative;
                left:1rem;
              }
              @page {
                margin-left:10mm;
                margin-right:10mm;
              }
              h2.Invoicehead {
                font-family: emoji;
                margin: 1rem;
                text-transform: uppercase;
                font-size: xxx-large;
                padding-top: 0rem;
                padding-bottom: 0rem;
                position: relative;
                top: 1rem;
                left: 3rem;
            }
              .InvoiceDetails {
                position: relative;
                top: 0rem;
                font-size: 22px;
                flex-direction: column;
            }

            .employeeDetails {
              display: flex;
              justify-content: space-around;
              flex-direction: row;
              margin-left: 0rem;
              position:relative;
              left=100rem;
          }
          h3.head.compHead {
                  position: relative;
                  left: 1rem;
                  font-size: 22px;
              }
              h3.EMPLOYEE {
                position: relative;
                left: 1rem;
                font-size: 22px;
            }
            h3.head.Heading {
              position: relative;
              left: 1rem;
              font-size: 22px;
          }
            
            table {
              width: 42rem;
              position:relative;
              left:8rem
          }
          .totalEarn {
            text-align: center;
            border: 2px solid;
            width: 17.5rem;
            float: right;
            position: relative;
            right: 10.3rem;
            border-radius: 6px;
            top: 2px;
          }
          .TotalPay {
            left: 15rem;
            display: flex;
            border: 2px solid;
            position: relative;
            top: 3rem;
            padding-left: 2rem;
            width:30rem;
          }
       
        .cmpdetails {
          font-size: 18px;
        }
 }
}
          `}
        </style>
        <div className="header">
          <h2 className="head Invoicehead " style={{ color: "black" }}>
            Payslip
          </h2>
          <img
            className="previewlogo"
            style={{
              height: "100px",
              width: "100px",
              right: "4rem",
              position: "relative",
            }}
            src="bill.png"
            alt=""
          />
        </div>
        <hr />
        <h3 className="head compHead">COMPANY SUMMARY</h3>
        <div className="CompanyMainDetails">
          <div className="companyDetails">
            <h3 className="cmpdetails">
              <p className="cmpdetailsChild">{props.companyDetails.compName}</p>{" "}
            </h3>
            <h5 className="cmpdetails">
              {" "}
              <p className="cmpdetailsChild">
                {props.companyDetails.compAdd}
              </p>{" "}
            </h5>
            <h5 className="cmpdetails">
              <p className="cmpdetailsChild">
                {" "}
                {props.companyDetails.compCity},{props.companyDetails.compstate}{" "}
                {props.companyDetails.comppost}{" "}
              </p>
            </h5>
            <h5 className="cmpdetails">
              <p className="cmpdetailsChild">
                {" "}
                Ph.No {props.companyDetails.compphno}
              </p>
            </h5>
          </div>

          <div className="InvoiceDetails">
            <h4 className="InvoiceNumPreview">
              <p> Billing Number </p> #{props.billingDetails[0]}{" "}
            </h4>
            <h5>Date :- {props.billingDetails[1]}</h5>
            <h5>Due date :- {props.billingDetails[2]}</h5>
          </div>
        </div>
        <hr />
        <h3 className="head EMPLOYEE">EMPLOYEE SUMMARY</h3>

        <div className="employeeDetails">
          <div className="employeeChild1">
            <p>
              <b>Employee Name : &nbsp;&nbsp;</b>
              <p className="empactualdata1">
                {" "}
                {props.employeeDeatails.employeeName}
              </p>
            </p>
            <p>
              <b>Employee Designation : &nbsp;&nbsp;</b>
              <p className="empactualdata1">
                {props.employeeDeatails.employeeDesignation}
              </p>
            </p>
            <p>
              <b>Employee GrossSalary : &nbsp;&nbsp;</b>

              <p className="empactualdata1">
                {props.employeeDeatails.employeeGrossSalary}
              </p>
            </p>
          </div>
          <div className="employeeChild2">
            <p>
              <b>Employee NetSalary : &nbsp;&nbsp;</b>

              <p className="empactualdata2">
                {props.employeeDeatails.employeeNetSalary}
              </p>
            </p>
            <p>
              <b>Employee WorkDays : &nbsp;&nbsp;</b>

              <p className="empactualdata2">
                {props.employeeDeatails.employeeWorkDays}
              </p>
            </p>
            <p>
              <b>Employee Absence : &nbsp;&nbsp;</b>

              <p className="empactualdata2">
                {props.employeeDeatails.employeeAbsence}
              </p>
            </p>
          </div>
        </div>
        <hr />
        <Tables Earnings={props.Earnings} Deduction={props.Deduction} />
      </div>
      <button
        className="previewbtn2"
        onClick={() => {
          props.preview ? props.setpreview(false) : props.setpreview(true);
        }}
      >
        {"Edit"}
      </button>
    </>
  );
};

export default Preview;
