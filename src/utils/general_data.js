const taskStatusOptions = [
  { key: "BACKLOG", text: "Backlog", value: "BACKLOG" },
  { key: "READY", text: "Ready", value: "READY" },
  { key: "IN_PROGRESS", text: "In Progress", value: "IN_PROGRESS" },
  { key: "PEER_REVIEW", text: "Peer Review", value: "PEER_REVIEW" },
  { key: "TESTING", text: "Testing", value: "TESTING" },
  { key: "DONE", text: "Done", value: "DONE" },
  { key: "RESOLVED", text: "Resolved", value: "RESOLVED" },
  { key: "DEPLOYED", text: "Deployed", value: "DEPLOYED" },
  { key: "CANCELLED", text: "Cancelled", value: "CANCELLED" },
];

const priorityItems = [
  {
    key: "Low",
    text: "Low",
    value: "LOW"
  },
  {
    key: "medium",
    text: "Medium",
    value: "Medium"
  },
  {
    key: "high",
    text: "High",
    value: "HIGH"
  },
];


const labels = [
  {
    key: "l0",
    text: "Improvement",
    value: "lmprovement",
  },
  {
    key: "l1",
    text: "UI",
    value: "UI",
  },
  {
    key: "l2",
    text: "Backend",
    value: "Backend",
  },
  {
    key: "l3",
    text: "Cloud",
    value: "Cloud",
  },
  {
    key: "l4",
    text: "Performance",
    value: "Performance",
  },
  {
    key: "l5",
    text: "Urgent",
    value: "Urgent",
  },
];

const getTextForTaskTypeId = (taskType) => {
  if (!taskType) return "NA";
  const text = taskStatusOptions.filter((item) => {
    return item.key === taskType;
  })[0].text;

  return text ? text : "NA";
};

export { taskStatusOptions, getTextForTaskTypeId, labels, priorityItems};
