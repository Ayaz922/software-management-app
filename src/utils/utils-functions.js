const getTaskTypeText = (taskType) => {
  if (taskType === "BUG") return "Issue/Bug";
  if (taskType === "EPIC") return "Epic";
  return "User story";
};

const getColorForPriority = (priority) => {
  if (priority === "HIGH") return "red";
  if (priority === "LOW") return "green";
  return "blue";
};

export { getTaskTypeText, getColorForPriority };
