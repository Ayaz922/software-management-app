import moment from 'moment';
import { useEffect, useState } from 'react'
import { Button, Form, Header, Input, Modal, Select, TextArea } from 'semantic-ui-react'
import { addProjectToDatabase,updateProjectToDatabase } from '../../../api/project-api';
import { apiCallback } from '../../../models/api-callback-function';
import ProjectModel from '../../../models/project-model';
import { getAllProjectManagers } from '../../../user/user-profile';

function AddProjectModal({open, onClose, projectModal}:any) {

    const categoryOptions =[
        {key:'1',text:'Basic Software',value:'Basic Software'},
        {key:'2',text:'User Interface',value:'User Interface'},
        {key:'3',text:'User Experience',value:'User Experience'},
        {key:'4',text:'Backend',value:'Backend'},
        {key:'5',text:'Cloud',value:'Cloud'},
    ]

    let projectDetailModel:ProjectModel={
        projectName:'',
        projectDescription:'',
        key:'',
        category:'',
        startDate:undefined,
        endDate:undefined,
    }
    console.log('Project Modal, Modal',projectModal)

    const [editMode,setEditMode] = useState(false)
    const [projectDetails,setProjectDetails] = useState<ProjectModel>(projectDetailModel);
    const [isLoading,setLoading] = useState(false)

    useEffect(()=>{
        setProjectDetails(projectModal?projectModal:projectDetailModel)
        setEditMode(projectModal?true:false)
    },[projectModal])


    const getAcronym = (projectName: any) => {
        if(!projectName) return ''
        var matches = projectName.match(/\b(\w)/g); // ['J','S','O','N']
        //@ts-ignore
        var acronym = matches.join(''); // JSON
        return acronym.toUpperCase();
    }
    const callback:apiCallback=(success,data)=>{
        if(success){
            setLoading(false)
            onClose(true)
        }else{
            alert('Error'+data)
        }
    }

    const saveProject = ()=>{
        console.log('Saved Project',projectDetails)
        addProjectToDatabase(projectDetails,callback)
    }
    const updateProject = () =>{
        updateProjectToDatabase(projectDetails,callback)
    }

  return (
    <Modal
      onClose={()=>{
          console.log('On close')
          onClose(false)
        }}
      onOpen={
          ()=>{console.log('On open')
        }}
      open={open}
    >
      <Modal.Header>Add new project</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Enter project details</Header>
          <Form>
                        <Form.Input
                            label="Project Name"
                            placeholder='Enter project name'
                            value={projectDetails?.projectName}
                            onChange={(e)=>{
                                setProjectDetails({
                                    ...projectDetails,
                                    projectName:e.target.value,
                                    key:getAcronym(e.target.value)
                                })

                            }}
                        />
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Input}
                                label='Key'
                                value={projectDetails.key}
                                placeholder='Key'
                            />
                            <Form.Dropdown
                                control={Select}
                                label='Category'
                                options={categoryOptions}
                                value={projectDetails?.category}
                                placeholder='Category'
                                onChange={(e,{value}:any)=>{
                                    setProjectDetails({
                                        ...projectDetails,
                                        category:value
                                    })
                                }}
                            />
                            <Form.Dropdown
                                control={Select}
                                options={getAllProjectManagers()}
                                label={{ children: 'Project manager', htmlFor: 'form-select-control-gender' }}
                                placeholder='Project Manager'
                                search
                                clearable
                                value={projectDetails?.projectManagerId}
                                searchInput={{ id: 'form-select-control-gender' }}
                                onChange={(e,{value}:any)=>{
                                    setProjectDetails({
                                        ...projectDetails,
                                        projectManagerId:value
                                    })
                                }}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Input}
                                label='Start Date'
                                type='Date'
                                placeholder='Start Date'
                                value={projectModal?.startDate?moment(projectModal.startDate).format('yyyy-MM-DD'):null}
                                onChange={(e:any)=>{
                                    setProjectDetails({
                                        ...projectDetails,
                                        startDate:e.target.value
                                    })
    
                                }}
                            />
                            <Form.Field
                                control={Input}
                                type='Date'
                                label='End Date'
                                placeholder='End Date'
                                value={projectModal?.endDate?moment(projectModal.endDate).format('yyyy-MM-DD'):null}
                                onChange={(e:any)=>{
                                    setProjectDetails({
                                        ...projectDetails,
                                        endDate:e.target.value
                                    })
    
                                }}
                            />
                        </Form.Group>
                       
                        <Form.Field
                            control={TextArea}
                            label='Description'
                            placeholder='Description'
                            value={projectDetails.projectDescription}
                                onChange={(e:any)=>{
                                    setProjectDetails({
                                        ...projectDetails,
                                        projectDescription:e.target.value
                                    })
    
                                }}
                        />
                    </Form>
                
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={onClose}>
          Cancel
        </Button>
        <Button
          content={editMode?'Update Project':"Save Project"}
          labelPosition='right'
          icon='checkmark'
          loading={isLoading}
          onClick={()=>{
              editMode?updateProject():saveProject();
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default AddProjectModal