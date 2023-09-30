import react, { useState, useRef, useEffect } from "react";
import "../CSS/ComponentToPrint.css";
import Preview from "./Preview";

import { useReactToPrint } from "react-to-print";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, InputAdornment } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Textarea } from "@mui/joy";

const ComponentToPrint = () => {
  const [billNumber, setbillNumber] = useState("");
  const [selectedCurrDate, setSelectedCurrDate] = useState();
  const [selectedDeuDate, setselectedDeuDate] = useState();
  const [preview, setpreview] = useState(false);
  const [Earnings, setEarnings] = useState([]);
  const [Deduction, setDeduction] = useState([]);

  const billingDetails = [billNumber, selectedCurrDate, selectedDeuDate];

  const addItem = () => {
    setEarnings([...Earnings, { description: "", Amount: 0 }]);
  };

  const removeItem = (index) => {
    Earnings.splice(index, 1);
    const updatedEarnings = [...Earnings];
    setEarnings(updatedEarnings);
  };

  const addDeduction = () => {
    setDeduction([...Deduction, { description: "", Amount: 0 }]);
  };

  const removeDeduction = (index) => {
    Deduction.splice(index, 1);
    const updatedDeduction = [...Deduction];
    setDeduction(updatedDeduction);
  };

  const handleItemChange = (index, field, value) => {
    if (field === "unitPrice" && value < 0) {
      const updatedEarnings = [...Earnings];
      updatedEarnings[index][field] = 0;
      setEarnings(updatedEarnings);
    } else {
      const updatedEarnings = [...Earnings];
      updatedEarnings[index][field] = value;
      setEarnings(updatedEarnings);
    }
  };

  const handleIDeduction = (index, field, value) => {
    if (field === "unitPrice" && value < 0) {
      const updatedDeduction = [...Deduction];
      updatedDeduction[index][field] = 0;
      setDeduction(updatedDeduction);
    } else {
      const updatedDeduction = [...Deduction];
      updatedDeduction[index][field] = value;
      setDeduction(updatedDeduction);
    }
  };

  const [employeeDeatails, setemployeeDeatails] = useState({
    employeeName: "",
    employeeDesignation: "",
    employeeGrossSalary: "",
    employeeNetSalary: "",
    employeeWorkDays: "",
    employeeAbsence: "",
  });

  const handleChangeEmp = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    if (
      (name === "employeeGrossSalary" && value < 0) ||
      (name === "employeeNetSalary" && value < 0) ||
      (name === "employeeWorkDays" && value < 0) ||
      (name === "employeeAbsence" && value < 0)
    ) {
      setemployeeDeatails((prev) => {
        return { ...prev, [name]: [0] };
      });
    } else {
      setemployeeDeatails((prev) => {
        return { ...prev, [name]: [value] };
      });
    }
  };

  const [companyDetails, setcompanyDetails] = useState({
    compName: "",
    compAdd: "",
    compCity: "",
    compstate: "",
    comppost: "",
    compphno: "",
  });

  const [isValidPostalCode, setIsValidPostalCode] = useState(true);

  const [isValidPhNo, setIsValidPhNo] = useState(true);

  const [isdisabled, setisdisabled] = useState(false);

  const validatation = (name, value) => {
    switch (name) {
      case "comppost":
        const postalCodePattern = /^[0-9]{6}$/;
        return postalCodePattern.test(value);
      case "compphno":
        const phnoPattern = /^[0-9]{10}$/;
        return phnoPattern.test(value);
      default:
        break;
    }
  };
  const handleChangeCmp = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "comppost") {
      setIsValidPostalCode(validatation(name, value));
    } else if (name === "compphno") {
      setIsValidPhNo(validatation(name, value));
    }

    if (
      (name === "comppost" && value < 0) ||
      (name === "compphno" && value < 0) ||
      (name === "country" && value < 0)
    ) {
      setcompanyDetails((prev) => {
        return { ...prev, [name]: 0 };
      });
    } else {
      setcompanyDetails((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };
  useEffect(() => {
    if (isValidPhNo && isValidPostalCode && companyDetails.compphno) {
      setisdisabled(false);
    } else {
      setisdisabled(true);
    }
    console.log(isdisabled);
  }, [isValidPhNo]);
  useEffect(() => {
    if (isValidPhNo && isValidPostalCode) {
      setisdisabled(false);
    } else {
      setisdisabled(true);
    }
    console.log(isdisabled);
  }, [isValidPostalCode]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "payslip",
  });

  return (
    <>
      {preview ? (
        <>
          <Preview
            display={componentRef}
            Earnings={Earnings}
            Deduction={Deduction}
            billingDetails={billingDetails}
            companyDetails={companyDetails}
            employeeDeatails={employeeDeatails}
            setpreview={setpreview}
            preview={preview}
            bill={billNumber}
          />

          <button className="printbtn" onClick={handlePrint}>
            Print
          </button>
        </>
      ) : (
        <>
          <img className="myimg" src="headimg.jpg" alt="" />
          <div className="MainHead1">
            <h1 className="headline">My Invoice</h1>
            <hr />
            <br />
          </div>
          <div className="preview-final">
            <Container maxWidth="sm">
              <Box
                sx={{
                  bgcolor: "#cfe8fc",
                  width: "50vw",
                  position: "relative",
                  right: "6rem",
                }}
                className="BoxComp"
              >
                <div className="MyInvoiceMain">
                  <div className="invoiceChild">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        helperText="Please enter your name"
                        label="Date"
                        id="demo-helper-text-misaligned"
                        name="currDate"
                        onChange={(date) => {
                          setSelectedCurrDate((date.$d + "").substring(4, 15));
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className="invoiceChild">
                    <TextField
                      className="MyInvoiceNumber"
                      id="outlined-basic"
                      label="Bill Number"
                      type="number"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">#</InputAdornment>
                        ),
                      }}
                      required
                      value={billNumber}
                      onChange={(e) => {
                        setbillNumber(e.target.value < 0 ? 0 : e.target.value);
                      }}
                    />
                  </div>
                  <div className="invoiceChild">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        helperText="Please enter your name"
                        label="Due Date"
                        id="demo-helper-text-misaligned"
                        name="DueDate"
                        onChange={(date) => {
                          setselectedDeuDate((date.$d + "").substring(4, 15));
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="Maindetails">
                  <div>
                    <div>
                      <h3 className="CompHeadline">
                        <p className="HeadName"> COMPANY DETAILS </p>
                      </h3>
                    </div>
                    <div className="CompanyInfo">
                      <div className="billingchild1">
                        <div>
                          <TextField
                            className="BillingInfochild"
                            sx={{ marginTop: "1rem" }}
                            id="filled-basic"
                            label="Company Name "
                            variant="filled"
                            name="compName"
                            value={companyDetails.compName}
                            onChange={handleChangeCmp}
                          />
                        </div>
                        <div>
                          <TextField
                            className="BillingInfochild"
                            sx={{ marginTop: "1rem" }}
                            id="filled-basic"
                            label="Address "
                            variant="filled"
                            placeholder="Address"
                            name="compAdd"
                            value={companyDetails.compAdd}
                            onChange={handleChangeCmp}
                          />
                        </div>
                        <div>
                          <TextField
                            className="BillingInfochild"
                            sx={{ marginTop: "1rem" }}
                            id="filled-basic"
                            label="City"
                            variant="filled"
                            name="compCity"
                            value={companyDetails.compCity}
                            onChange={handleChangeCmp}
                          />
                        </div>
                      </div>
                      <div
                        className="billingchild2"
                        style={{ marginBottom: "2rem" }}
                      >
                        <div>
                          <TextField
                            className="BillingInfochild"
                            sx={{ marginTop: "1rem" }}
                            id="filled-basic"
                            label="State"
                            variant="filled"
                            name="compstate"
                            value={companyDetails.compstate}
                            onChange={handleChangeCmp}
                          />
                        </div>
                        <div>
                          <TextField
                            className="BillingInfochild"
                            sx={{ marginTop: "1rem" }}
                            id="filled-basic"
                            label="Phone Number"
                            variant="filled"
                            type="number"
                            name="compphno"
                            value={companyDetails.compphno}
                            onChange={handleChangeCmp}
                          />
                          {!isValidPhNo && companyDetails.compphno !== 0 && (
                            <p className="error-message">
                              Please enter a valid Phone Number.
                            </p>
                          )}
                        </div>
                        <div>
                          <TextField
                            className="BillingInfochild"
                            sx={{ marginTop: "1rem" }}
                            id="filled-basic"
                            label="Postal Code/Zip"
                            variant="filled"
                            type="number"
                            name="comppost"
                            value={companyDetails.comppost}
                            onChange={handleChangeCmp}
                          />
                          {!isValidPostalCode &&
                            companyDetails.comppost !== 0 && (
                              <p className="error-message">
                                Please enter a valid postal code.
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="EmployeeHeadline">
                      {" "}
                      <p className="HeadName">EMPLOYEE DETAILS</p>{" "}
                    </h3>
                    <div className="EmployeeDetails">
                      <div className="child1">
                        <div>
                          <TextField
                            sx={{ marginTop: "1rem" }}
                            id="filled-basic"
                            label="EmployeeName"
                            variant="filled"
                            type="text"
                            name="employeeName"
                            value={employeeDeatails.employeeName}
                            onChange={handleChangeEmp}
                          />
                        </div>
                        <div>
                          <TextField
                            sx={{ marginTop: "1rem" }}
                            id="filled-basic"
                            label="Gross Salary"
                            variant="filled"
                            type="number"
                            name="employeeGrossSalary"
                            value={employeeDeatails.employeeGrossSalary}
                            onChange={handleChangeEmp}
                          />
                        </div>
                        <div>
                          <TextField
                            sx={{ marginTop: "1rem" }}
                            id="filled-basic"
                            label="Works Days"
                            variant="filled"
                            type="number"
                            name="employeeWorkDays"
                            value={employeeDeatails.employeeWorkDays}
                            onChange={handleChangeEmp}
                          />
                        </div>
                      </div>
                      <div className="child2" style={{ marginBottom: "2rem" }}>
                        <div>
                          <TextField
                            sx={{ marginTop: "1rem" }}
                            id="filled-basic"
                            label="Designation"
                            variant="filled"
                            type="text"
                            name="employeeDesignation"
                            value={employeeDeatails.employeeDesignation}
                            onChange={handleChangeEmp}
                          />
                        </div>
                        <div>
                          <TextField
                            sx={{ marginTop: "1rem" }}
                            id="filled-basic"
                            label="Net Salary"
                            variant="filled"
                            type="number"
                            name="employeeNetSalary"
                            value={employeeDeatails.employeeNetSalary}
                            onChange={handleChangeEmp}
                          />
                        </div>
                        <div>
                          <TextField
                            sx={{ marginTop: "1rem" }}
                            id="filled-basic"
                            label="Absence"
                            variant="filled"
                            type="number"
                            name="employeeAbsence"
                            value={employeeDeatails.employeeAbsence}
                            onChange={handleChangeEmp}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="mainEarnDeduce">
                  <div className="EarnDeduce">
                    <div className="main1">
                      <div className="head1">
                        <h3>EARNING</h3>
                      </div>
                    </div>

                    <div className="Item">
                      {Earnings.map((item1, index) => (
                        <div key={index}>
                          <div className="SingleItemList">
                            <div className="SingleItemListchild">
                              <Textarea
                                minRows={2}
                                placeholder="Description…"
                                variant="soft"
                                sx={{
                                  marginTop: "1.25rem",
                                  borderBottom: "2px solid",
                                  borderColor: "neutral.outlinedBorder",
                                  borderRadius: 0,
                                  "&:hover": {
                                    borderColor: "neutral.outlinedHoverBorder",
                                  },
                                  "&::before": {
                                    border:
                                      "1px solid var(--Textarea-focusedHighlight)",
                                    transform: "scaleX(0)",
                                    left: 0,
                                    right: 0,
                                    bottom: "-2px",
                                    top: "unset",
                                    transition:
                                      "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                                    borderRadius: 0,
                                  },
                                  "&:focus-within::before": {
                                    transform: "scaleX(1)",
                                  },
                                }}
                                className="EarnDeduce1"
                                value={item1.description}
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="SingleItemListchild">
                              <div>
                                <TextField
                                  sx={{ marginTop: "1rem" }}
                                  id="filled-basic"
                                  label="Amount"
                                  variant="filled"
                                  type="number"
                                  value={item1.unitPrice}
                                  className="EarnDeduce2"
                                  onChange={(e) => {
                                    handleItemChange(
                                      index,
                                      "unitPrice",
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>
                            </div>
                            <div>
                              <IconButton className="rmbtn" aria-label="delete">
                                <DeleteIcon
                                  onClick={() => {
                                    removeItem(index);
                                  }}
                                />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="itemaddbtn" onClick={addItem}>
                      +
                    </button>
                  </div>

                  <br />
                  <div className="EarnDeduce">
                    <div className="main1">
                      <div className="head1">
                        <h3>DEDUCTION</h3>
                      </div>
                    </div>

                    <div className="Item">
                      {Deduction.map((item, index) => (
                        <div key={index}>
                          <div className="SingleItemList">
                            <div className="SingleItemListchild">
                              <Textarea
                                minRows={2}
                                placeholder="Description…"
                                variant="soft"
                                sx={{
                                  marginTop: "1.25rem",
                                  borderBottom: "2px solid",
                                  borderColor: "neutral.outlinedBorder",
                                  borderRadius: 0,
                                  "&:hover": {
                                    borderColor: "neutral.outlinedHoverBorder",
                                  },
                                  "&::before": {
                                    border:
                                      "1px solid var(--Textarea-focusedHighlight)",
                                    transform: "scaleX(0)",
                                    left: 0,
                                    right: 0,
                                    bottom: "-2px",
                                    top: "unset",
                                    transition:
                                      "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                                    borderRadius: 0,
                                  },
                                  "&:focus-within::before": {
                                    transform: "scaleX(1)",
                                  },
                                }}
                                className="EarnDeduce1"
                                value={item.description}
                                onChange={(e) =>
                                  handleIDeduction(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="SingleItemListchild">
                              <div>
                                <TextField
                                  sx={{ marginTop: "1rem" }}
                                  id="filled-basic"
                                  label="Amount"
                                  variant="filled"
                                  type="number"
                                  value={item.unitPrice}
                                  className="EarnDeduce2"
                                  onChange={(e) => {
                                    handleIDeduction(
                                      index,
                                      "unitPrice",
                                      e.target.value
                                    );
                                  }}
                                />
                              </div>
                            </div>
                            <div>
                              <IconButton className="rmbtn" aria-label="delete">
                                <DeleteIcon
                                  onClick={() => {
                                    removeDeduction(index);
                                  }}
                                />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="itemaddbtn" onClick={addDeduction}>
                      +
                    </button>
                  </div>
                </div>
                <hr />
                <div>
                  {" "}
                  <center>
                    <button
                      className="DisplayPreviewbtn"
                      onClick={() => {
                        preview ? setpreview(false) : setpreview(true);
                      }}
                      disabled={isdisabled}
                    >
                      {"Preview"}
                    </button>
                  </center>
                </div>
              </Box>
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default ComponentToPrint;
