import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  CardGroup,
  Grid,
  GridColumn,
  Message,
} from "semantic-ui-react";
import { getAllTask } from "../../../api/task-api";
import { apiCallback } from "../../../models/api-callback-function";
import TaskModel from "../../../models/task-model";
import { getCurrentUser } from "../../../user/user-profile";
import useLocalStorage, { CURRENT_PROJECT } from "../../../utils/localstorage/localStorage";
import CustomFilter from "../../filter/filter";
import TaskCard from "../task-card/task-card";

const TaskList = ({ projectReducer }: any) => {
  const [originalData, setOriginalData] = useState<Array<TaskModel>>([]);
  const [filteredList, setFilteredList] = useState<Array<TaskModel>>([]);
  const [shouldUpdateData, setShouldUpdateData] = useState(false);
  const [filterArray, setFilterArray] = useState<any>({});


  useEffect(() => {
    if (projectReducer.projectId != null && projectReducer.projectId !== '') {
      getAllTask("60a893ca6694da3ec86f6429", callback);
      console.log('Loading data for project Id : ' + "60a893ca6694da3ec86f6429")
    }
    else
      alert('No project selected');
  }, [projectReducer.projectId])


  //Use effect hook
  useEffect(() => {
    if (originalData.length === 0 || shouldUpdateData) {
      console.log("Console: Updating the data: " + shouldUpdateData);
      setShouldUpdateData(false);
    }
  }, [filteredList, shouldUpdateData, filterArray, originalData.length, projectReducer.projectId]);

  //Functions

  //Callback after fetching the data from server
  const callback: apiCallback = (success, data) => {
    if (success) {
      console.log(data)
      setOriginalData(data);
      setFilteredList(data);
    } else {
      console.log("ERROR WHILE FETCHING THE DATA: " + data);
    }
  };


  type FilterItem = {
    type: string,
    value: undefined | string | boolean
  }
  //Callback for item clicked in dropdown
  const onDropdownItemClicked = (item: FilterItem) => {
    let tempArray = filterArray;
    tempArray[item.type] = item.value;
    setFilterArray(tempArray);
    console.log(filterArray);
    let keys = Object.keys(filterArray);
    var listAfterFilter = originalData;

    keys.forEach((item) => {
      listAfterFilter = getFilteredArray(item, listAfterFilter);
    });

    setFilteredList(listAfterFilter);
  };

  const getFilteredArray = (key: string, currentTaskList: Array<TaskModel>) => {
    let newArray = [];
    console.log(key);
    if (filterArray[key] === "" || !filterArray[key]) return currentTaskList;
    switch (key) {
      case "type":
        newArray = currentTaskList.filter((task) => {
          return task.taskType === filterArray[key];
        });
        break;
      case "status":
        newArray = currentTaskList.filter((task) => {
          return task.status === filterArray[key];
        });
        break;
      case "priority":
        newArray = currentTaskList.filter((task) => {
          return task.priority === filterArray[key];
        });
        break;
      case "mytask":
        if (filterArray[key]) {
          newArray = currentTaskList.filter((task) => {
            return task.assignedUser === getCurrentUser().username;
          });
          break;
        } else {
          return currentTaskList;
        }

      default:
        return currentTaskList;
      // case "assignee":
      //   break;
      // case "sprint":
      //   break;
      // case "dueDate":
      //   break;
    }
    return newArray;
  };

  const dataUpdateCallback = () => {
    setShouldUpdateData(true);
  };

  let cards = [];
  for (const [index, value] of filteredList.entries()) {
    cards.push(
      <TaskCard key={index} task={value} updateData={dataUpdateCallback} />
    );
  }

  if (cards.length === 0) {
    cards.push(
      <Message
        warning
        style={{ position: "absolute", top: "50%", left: "35%" }}
        fluid
        header="No Data Available"
        loading
        list={[
          "Change filter setting that have been applied",
          "Reload page",
          "Check internet connectivity",
        ]}
      />
    );
  }

  console.log(cards);
  return (
    <div className="componentContainer">
      {projectReducer.projectId == 'NA' ?
        (
          <Message
            warning
            style={{ position: "relative", top: "30%", left: "25%", width:'50%' }}
            header="No Project Selected"
            loading
            list={[
              "Please select a project from dropdown in the above menu",
              "If not assigned to any project, ask your PM to assign you a project",
              "Check internet connectivity",
            ]}
          />)
        :
        (
          <Grid>
            <GridColumn width={13}>
              <CardGroup>{cards}</CardGroup>
            </GridColumn>
            <GridColumn width={3}>
              <CustomFilter onItemClicked={onDropdownItemClicked} />
            </GridColumn>
          </Grid>
        )
      }
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return { projectReducer: state.projectReducer }
}

export default connect(mapStateToProps)(TaskList);
