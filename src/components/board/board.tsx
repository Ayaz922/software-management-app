import React, { useState, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { getAllTask } from "../../api/task-api";
import { apiCallback } from "../../models/api-callback-function";
import TaskModel from "../../models/task-model";
import { TaskStatus } from "../../models/tast-status";
import useLocalStorage, { CURRENT_PROJECT } from "../../utils/localstorage/localStorage";
import TaskCard from "../task-list/task-card/task-card";

const Board:React.FC = () => {
  const [originalData, setOriginalData] = useState<Array<TaskModel>>([]);
  const [filteredList, setFilteredList] = useState<Array<TaskModel>>([]);
  const [shouldUpdateData, setShouldUpdateData] = useState<boolean>(false);
  const [projectId] = useLocalStorage(CURRENT_PROJECT);

  //Use effect hook
  useEffect(() => {
    if (originalData.length === 0 || shouldUpdateData) {
      getAllTask(projectId,callback);
      setShouldUpdateData(false);
    }
  }, [filteredList, shouldUpdateData, originalData.length,projectId]);

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
