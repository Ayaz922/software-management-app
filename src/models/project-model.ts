export default interface ProjectModel{
    projectName:string,
    key:string,
    _id?:string,
    projectDescription?:string,
    projectManagerId?:string,
    currentSprint?:string,
    startDate?:Date,
    endDate?:Date,
    actualStartDate?:Date,
    actualEndDate?:Date,
    category?:string | undefined
}