import React from "react";

const Job = ({ data, setShow }) => {
  return (

      <div class="card" style={{width: "18rem", padding: "1rem"}}>
        <div class="card-body">
          <h5 class="card-title">{data.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{data.company}</h6>
          <p class="card-text">
            {data.location}
          </p>
          <p class="card-text">
            <strong>${data.salary}</strong>
          </p>
        </div>
        <div className="flex gap-10">
        <button className="btn btn-success flex-grow-1" onClick={() => setShow(data.id)}>Apply</button>

        </div>
      </div>




      
  );
};

export default Job;
