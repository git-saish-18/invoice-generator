const Tables = (props) => {
    let totalEarn = 0;
    let totalDeduce = 0;
  return <>
      <div className="billing">
          <div>
            <h3 className="head Heading">EARNING</h3>
            <div className="mytable">
              <table border={1}>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
                {props.Earnings.map((item1, index) => {
                  if (item1.description != "" && item1.unitPrice) {
                    totalEarn += parseInt(item1.unitPrice);

                    return (
                      <tr>
                        <td className="Desc">{item1.description}</td>
                        <td className="Amount">{item1.unitPrice}</td>
                      </tr>
                    );
                  }
                })}
              </table>
            </div> 
            <div className="totalEarn">
              <span>TOTAL</span>{" "}
              <span>₹{isNaN(totalEarn) ? 0 : totalEarn}</span>
            </div>
          </div>
          <div>
            <h3 className="head Heading">DEDUCTION</h3>
            <div className="mytable">
              <table border={1}>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
                {props.Deduction.map((item1, index) => {
                  if (item1.description != "" && item1.unitPrice) {
                    totalDeduce += parseInt(item1.unitPrice);

                    return (
                      <tr>
                        <td className="Desc" >{item1.description}</td>
                        <td className="Amount">{item1.unitPrice}</td>
                      </tr>
                    );
                  }
                })}
              </table>
            </div>
            <div className="totalEarn">
              <span>Total</span>{" "}
              <span>₹{isNaN(totalDeduce) ? 0 : totalDeduce}</span>
            </div>
          </div>
        </div>

        <div className=" TotalPay">
          <div className=" finalhead firstchild">
            <h3>Total Net Payable</h3>
            <p>(Total Earnings- Total Deduction)</p>
          </div>
          <div className="secondchild">
            <p>₹{Math.abs(totalEarn) - Math.abs(totalDeduce)}</p>
          </div>
        </div>
  </>;
};

export default Tables;
