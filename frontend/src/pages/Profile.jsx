//alternative in using useContext. This works by passing a context prop in the <outlet> from the parent component(DashbaordLayout) then using useOutletContext to obtain the data
import { useOutletContext } from "react-router-dom";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios";

//imports MUI
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

//import components
import RegFormComponent from "../components/RegFormComponent";

function Profile() {
  const userData = useOutletContext();
  //instantiate useNavigation to a var to use in creating isSubmitting.
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  //   exact path of the userData
  const user = userData.data.currentUser;
  console.log(user);

  return (
    <div className='registerContainer'>
      {/* adding enctype property to send a file */}
      <Form className='regForm' method='post' encType='multipart/form-data'>
        {/* used Stack to have the inputs in one column */}
        <Stack spacing={2}>
          <h1 className='regLabel'>Your Profile</h1>
          <RegFormComponent
            type='text'
            label='name'
            name='name'
            defaultValues={user.name}
          />
          <RegFormComponent
            type='email'
            label='email'
            name='email'
            defaultValues={user.email}
          />
          <RegFormComponent
            type='text'
            label='last name'
            name='lastName'
            defaultValues={user.lastName}
          />
          <RegFormComponent
            type='text'
            label='location'
            name='location'
            defaultValues={user.location}
          />
          <Button
            variant='contained'
            color='success'
            type='submit'
            disabled={isSubmitting} //isSubmitting returns a boolean
          >
            {isSubmitting ? "Updating user" : "Update"}
          </Button>
        </Stack>
      </Form>
    </div>
  );
}
export default Profile;
