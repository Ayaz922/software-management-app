import React, { useState, useEffect } from "react";
import {Grid, GridColumn } from "semantic-ui-react";
import { getAllTask } from "../../api/task-api";
import TaskCard from "../task-list/task-card/task-card";

const Board = () => {
    
  const [originalData, setOriginalData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [shouldUpdateData, setShouldUpdateData] = useState(false);

  //Use effect hook
  useEffect(() => {
    if (originalData.length === 0 || shouldUpdateData) {
      console.log("Console: Updating the data: " + shouldUpdateData);
      getAllTask(callback);
      setShouldUpdateData(false);
    }
  }, [filteredList, shouldUpdateData]);

  //Functions

  //Callback after fetching the data from server
  const callback = (success, message, data) => {
    if (success) {
      setOriginalData(data);
      setFilteredList(data);
    } else {
      console.log("ERROR WHILE FETCHING THE DATA: " + message);
    }
  };

  const dataUpdateCallback = () => {
    setShouldUpdateData(true);
  };

  let cards = [];
  let backLogCards = [];
  let inProgressCards = [];
  let completeCards = [];

  for (const [index, value] of filteredList.entries()) {
    if (value.status === "BACKLOG")
      backLogCards.push(
        <TaskCard key={index} task={value} updateData={dataUpdateCallback} />
      );
    else if (value.status === "IN_PROGRESS")
      inProgressCards.push(
        <TaskCard key={index} task={value} updateData={dataUpdateCallback} />
      );
    else if (value.status === "DONE")
      completeCards.push(
        <TaskCard key={index} task={value} updateData={dataUpdateCallback} />
      );
  }

  return (
    <div>
      <Grid>
        <GridColumn width={4}>
          <h4>Backlog</h4>
          {backLogCards}
        </GridColumn>
        <GridColumn width={4}>
          <h4>In Progress</h4>
          {inProgressCards}
        </GridColumn>
        <GridColumn width={4}>
          <h4>QA</h4>
        </GridColumn>
        <GridColumn width={4}>
          <h4>Done</h4>
          {completeCards}
        </GridColumn>
      </Grid>
    </div>
  );
};

export default Board;
