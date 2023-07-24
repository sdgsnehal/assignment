import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import "../components/TraceView.css";
import { List, ListItem } from "@mui/material";
const TraceView = () => {
  const [data, setData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/40059489-6a19-4ca7-a41c-1c5c920e312c"
        );
        setData(response.data.spans);
        console.log(response.data.spans);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(data);

  return (
    <>
      {data.map((span) =>
        span.parent_span_id === null ? (
          <div key={span.span_id}>
            <h3>{span.trace_id}</h3>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ display: "flex", justifyContent: "space-evenly" }}
              >
                {" "}
                
                    <div>
                    <Typography>{span.req_info.req_method} {span.req_info.req_path}{" "}</Typography>
                     
                    </div>

                    <div><Typography>{span.req_info.latency}</Typography></div>
                  
                  
                    <div>
                      {span.source} --&gt; {span.destination}
                    </div>
                  
              </AccordionSummary>
              <AccordionDetails>
                {data.map((item) =>
                  item.parent_span_id === span.span_id ? (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>
                          {item.req_info.req_method} {item.req_info.req_path}{" "}
                          {item.source} --&gt; {item.destination}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {data.map((child) =>
                            child.parent_span_id === item.span_id ? (
                              <Typography>
                                {child.req_info.req_method}
                                {child.req_info.req_path} {child.source} --&gt;{" "}
                                {child.destination}
                              </Typography>
                            ) : null
                          )}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ) : null
                )}
              </AccordionDetails>
            </Accordion>
          </div>
        ) : (
          // Handle error case
          <div key={span.span_id}></div>
        )
      )}
    </>
  );
};

export default TraceView;
