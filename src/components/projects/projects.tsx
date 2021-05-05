import moment from 'moment';
import { useEffect, useState } from 'react';
import { Button, Card, Form, Grid, Icon } from 'semantic-ui-react';
import { getAllProjectFromDatabase } from '../../api/project-api';
import { apiCallback } from '../../models/api-callback-function';
import ProjectModel from '../../models/project-model';
import AddProjectModal from './add-project-modal/add-project-modal';
import ProjectSidebar from './project-sidebar/project-sidebar';
import './projects.css'

const ProjectComponent = () => {

    const [projectList, setProjectList] = useState<Array<ProjectModel>>([])
    const [projectModel, setProjectModel] = useState<ProjectModel>();
    const [projectToBeEdited, setProjectToBeEdited] = useState<ProjectModel>();
    const [openAddProjectModal, setOpenModal] = useState(false)
    const [reload,setReload] = useState(false)

    useEffect(() => {
        getAllProjectFromDatabase(callback)
    }, [reload])

    const callback: apiCallback = (success, data) => {
        if (success) {
            setProjectList(data)
        }
    }

    const onProjectSelected = (projectId: string) => {
        projectList.map(project => {
            if (projectId === project._id)
                setProjectModel(project)
        })
    }
    const editProject = () => {
        setProjectToBeEdited(projectModel)
        setOpenModal(true)
        console.log(projectToBeEdited)
    }


    return (
        <div className="top-container">
            <AddProjectModal
                open={openAddProjectModal}
                projectModal={projectToBeEdited}
                onClose={(reload: boolean) => {
                    if(reload){
                        setReload(true)
                    }
                    //if reload, reload the the page
                    setOpenModal(false)
                    setProjectToBeEdited(undefined)
                }} />
            <Grid>
                <Grid.Column width={4}>
                    <ProjectSidebar projectList={projectList} onItemClick={onProjectSelected} onNewProject={() => { setOpenModal(!openAddProjectModal) }} />
                </Grid.Column>
                <Grid.Column width={12} style={{ padding: '16px 32px 16px 0px' }}>
                    <Card style={{ padding: "16px" }} fluid>
                        <Card.Content header={projectModel?.projectName} >
                            <Card.Header>{projectModel?.projectName}<span style={{ float: 'right', fontSize: '12px', fontWeight: 'normal' }}><a onClick={editProject}><Icon name='edit' />Edit</a></span></Card.Header>
        
                        </Card.Content>
                        <Card.Content description={"Description: " + (projectModel?.projectDescription ? projectModel?.projectDescription : '')} />
                        <Card.Content>
                            Category: {projectModel?.category}

                            <div style={{ marginTop: '12px' }}>
                                <span><Icon name="calendar outline" />Start Date: <span style={{ color: "grey" }}> {moment(projectModel?.startDate).format("MMM Do'21")}</span></span>
                                <span style={{ float: 'right' }}><Icon name="calendar outline" />End Date:<span style={{ color: "grey" }}> {moment(projectModel?.endDate).format("MMM Do'21")}</span></span>
                            </div>
                            {/* <div style={{marginTop:'12px'}}>
                            <span><Icon name="calendar outline"/>Actual Start Date?</span>  
                            <span style={{float:'right'}}><Icon name="calendar outline"/>Actual End Date?</span>
                        </div> */}
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name='user' />PM:{projectModel?.projectManagerId}
                            <span style={{ float: 'right' }}>Sprint: {projectModel?.currentSprint}</span>
                        </Card.Content>
                    </Card>

                </Grid.Column>

            </Grid>
        </div>
    );
};

export default ProjectComponent;