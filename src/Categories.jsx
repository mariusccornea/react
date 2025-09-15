import { useEffect, useState } from "react";

function Categories(props) {
  return (
    <div>
      
      <table className="tx-table">
        <thead>
          <tr>
            <th>Rent</th>
            <th>Additional Expenses</th>
            <th>Food</th>
          </tr>
          </thead>
          <tbody>
            <tr>
                <td>{props.totalRent}</td>
                <td>{props.totalAdditional}</td>
                <td>{props.totalFood}</td>
            </tr>
          </tbody>
     
      </table>
    </div>
  );
}

export default Categories;
