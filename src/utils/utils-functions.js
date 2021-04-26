const getTaskTypeText = (taskType) => {
  if (taskType === "ISSUE" || taskType === "BUG") return "Issue/Bug";
  if (taskType === "EPIC") return "Epic";
  return "User story";
};

const getColorForPriority = (priority) => {
  if (priority === "HIGH") return "red";
  if (priority === "LOW") return "green";
  return "blue";
};

const getRandomColor = () => {
  const colors = [
    "orange",
    "yellow",
    "olive",
    "green",
    "teal",
    "blue",
    "violet",
    "purple",
    "pink",
    "grey",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

export { getTaskTypeText, getColorForPriority, getRandomColor };
