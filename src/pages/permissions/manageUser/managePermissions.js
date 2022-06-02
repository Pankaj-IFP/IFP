import React, {useState ,useEffect} from "react";
import { Paper, Grid, withStyles } from '@material-ui/core';
import PageTitle from "../../../components/PageTitle/PageTitle";
import '../style.css';
import * as actions from "../../../actions/user";
import { Button ,Form} from 'react-bootstrap';
import { connect } from "react-redux";



const styles = theme => ({
    paper: {
        padding: theme.spacing(0),
    },
    paperTable: {
        padding: theme.spacing(0),
    }
})


const User = ({ classes, ...props }) => {
   const [inputValue , setValue] = useState([]);
   const[selectedValue , setSelectedValue] = useState(null);
   


   useEffect(() => {
    props.fetchPagination()
}, [])

var data =  [];

 props.users.map((item) =>{
    return(data.push({name:item.name}))
    
})
// setUserdata(data)
console.log("DATA",data);
   
   //handle input change event
const handleInputChange = value => {
    setValue(value);
}

 //handle selection
 const handleChange = value => {
    setSelectedValue(value);
}



    return (
        
        <React.Fragment>
            <PageTitle title=  "Manage Permissions" />
            <Grid container spacing={4}>
                <Grid item xs={12} >
                    <Paper className={classes.paper}>
                       
                       <Form>
  <fieldset enable>
    <Form.Group className="mb-3">
      <Form.Label >Manage User Permission      </Form.Label> 
      <Form.Select id="disabledSelect">
        <option>    Select User</option>
        {
        data.map((item) => (
        <option value="data">{item.name}</option>
        )
        )}
      </Form.Select>
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Check
        type="checkbox"
        id="disabledFieldsetCheck"
        label="ADD USER"
        
      />
      <Form.Check
        type="checkbox"
        id="disabledFieldsetCheck"
        label="VIEW USER"
        
      />
       <Form.Check
        type="checkbox"
        id="disabledFieldsetCheck"
        label="UPDATE USER"
        
      />
       <Form.Check
        type="checkbox"
        id="disabledFieldsetCheck"
        label="DELETE USER"
        
      />
      
    </Form.Group>
    

    <Form.Group className="mb-3">
      <Form.Label htmlFor="disabledSelect">Manage Module Permission      </Form.Label>
    </Form.Group>
    <Form.Group className="mb-3">
    <label> Site Members :- <br/>
      <input type="checkbox" id="disabledFieldsetCheck" label="ADD" />Add&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="View" />View&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="Update" />Update&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="Delete" />Delete&emsp;
    </label>
    <br/>
    <label> Industry :-<br/>
      <input type="checkbox" id="disabledFieldsetCheck" label="ADD" />Add&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="View" />View&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="Update" />Update&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="Delete" />Delete&emsp;
    </label>
    <br/>
    <label> Technology :-<br/>
      <input type="checkbox" id="disabledFieldsetCheck" label="ADD" />Add&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="View" />View&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="Update" />Update&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="Delete" />Delete&emsp;
    </label>
    <br/>
    <label> Features :-<br/>
      <input type="checkbox" id="disabledFieldsetCheck" label="ADD" />Add&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="View" />View&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="Update" />Update&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="Delete" />Delete&emsp;
    </label>
    <br/>
    <label> Portfolio :-<br/>
      <input type="checkbox" id="disabledFieldsetCheck" label="ADD" />Add&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="View" />View&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="Update" />Update&emsp;
      <input type="checkbox" id="disabledFieldsetCheck" label="Delete" />Delete&emsp;
    </label>
    </Form.Group>
    <Button type="submit">Save Module Permission</Button>
  </fieldset>
</Form>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
const mapStateToProps = state => ({
    users: state.user.users,
    meta: state.user.metaUser
})

const mapActionToProps = {
    fetchPagination: actions.Pagination,
    create: actions.create,
    update: actions.update,
    delete: actions.Delete,
    add_permission: actions.add_permission,
    

}
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(User));