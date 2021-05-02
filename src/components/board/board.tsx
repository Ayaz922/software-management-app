import React, { useState, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { getAllTask } from "../../api/task-api";
import { apiCallback } from "../../models/api-callback-function";
import TaskModel from "../../models/task-model";
import { TaskType } from "../../models/task-type";
import { TaskStatus } from "../../models/tast-status";
import TaskCard from "../task-list/task-card/task-card";

const Board:React.FC = () => {
  const [originalData, setOriginalData] = useState<Array<TaskModel>>([]);
  const [filteredList, setFilteredList] = useState<Array<TaskModel>>([]);
  const [shouldUpdateData, setShouldUpdateData] = useState<boolean>(false);

  //Use effect hook
  useEffect(() => {
    if (originalData.length === 0 || shouldUpdateData) {
      getAllTask(callback);
      setShouldUpdateData(false);
    }
  }, [filteredList, shouldUpdateData, originalData.length]);

  //Functions

  //Callback after fetching the data from server
  const callback:apiCallback = (success, data) => {
    if (success) {
      setOriginalData(data);
      setFilteredList(data);
    } //Else show a message or alert for error
  };

  const dataUpdateCallback = () => {
    setShouldUpdateData(true);
  };

  let backLogCards = [];
  let inProgressCards = [];
  let completeCards = [];
  
  if (filteredList.length > 0) {
    for (const [index, value] of filteredList.entries()) {
      if (value.status === TaskStatus.BACKLOG)
        backLogCards.push(
          <TaskCard key={index} task={value} updateData={dataUpdateCallback} />
        );
      else if (value.status === TaskStatus.IN_PROGRESS)
        inProgressCards.push(
          <TaskCard key={index} task={value} updateData={dataUpdateCallback} />
        );
      else if (value.status === TaskStatus.DONE)
        completeCards.push(
          <TaskCard key={index} task={value} updateData={dataUpdateCallback} />
        );
    }
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
