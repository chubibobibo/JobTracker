//alternative in using useContext. This works by passing a context prop in the <outlet> from the parent component(DashbaordLayout) then using useOutletContext to obtain the data
import { useOutletContext } from "react-router-dom";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//imports MUI
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

//import components
import RegFormComponent from "../components/RegFormComponent";

//action function to call API to update user
//we will not be converting the data we recieve from API to a usebale object because this form is sendin a file as well.
export const action = async ({ request }) => {
  const formData = await request.formData();
  //obtain the file from formData recieved
  const file = formData.get("avatar"); //avatar is the name of the file sent
  //checking for image size
  if (file && file.size > 500000) {
    toast.error("image cannot be more than 5mb");
  }
  try {
    //sending the raw formData (not converted to an object )
    const updateUser = await axios.patch("/api/admin/update-user", formData);
    toast.success("User updated");
    return null;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
  return null;
};

function Profile() {
  const userData = useOutletContext();
  //instantiate useNavigation to a var to use in creating isSubmitting.
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  //   exact path of the userData
  const user = userData.data.currentUser;
  //   console.log(user);

  return (
    <div className='registerContainer'>
      {/* adding enctype property to send a file */}
      <Form className='regForm' method='post' encType='multipart/form-data'>
        {/* used Stack to have the inputs in one column */}
        <Stack spacing={2}>
          <h1 className='regLabel'>Your Profile</h1>
          <p>Image should not exceed 5mb</p>
          <RegFormComponent type='file' label='avatar' name='avatar' />
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
