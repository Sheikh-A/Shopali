// import React, {useState} from 'react';
// import {axiosWithAuth} from "../utils/axiosWithAuth";
// import { Redirect } from "react-router-dom";

// const AddClient = () => {
//   const [formData, setFormData] = useState({
//     client_name: "",
//     client_segment: "",

//   });

//   const [home, setHome] = useState(false);

//   const changeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     axiosWithAuth()
//       .post("https://aliport.herokuapp.com/api/flex", formData)
//       .catch((err) => console.log(err));
//     setFormData({
//       client_name: "",
//       client_segment: "",
//     });
//     setHome(true);
//   };
//   return (
//     <div className="registerContainer negative-top-margin-adjustment">
//       {home ? <Redirect to="/flexdata" /> : null}
//       <div>
//         <div>
//           <h1> Add Client</h1>
//         </div>
//       <form onSubmit={submitHandler}>
//         <div>
//           <div>
//             <div>
//               <label htmlFor="client_name">Client Name</label>
//               <input
//                 id="firstName"
//                 name="client_name"
//                 type="text"
//                 value={formData.client_name}
//                 onChange={changeHandler}
//               />
//             </div>
//             <div>
//               <label htmlFor="client_segment">Client Segment</label>
//               <input
//                 id="firstName"
//                 name="client_segment"
//                 type="text"
//                 value={formData.client_segment}
//                 onChange={changeHandler}
//               />
//             </div>
//           </div>
//         </div>
//         <button className="blackButton" type="submit">Add</button>
//       </form>
//     </div>
//   </div>
//   );
// };

// export default AddClient;

// .matches(/^\b(?:SMB|Mid-Market|Enterprise|Emerging)\b$/, {
//   message:
//     'Must be SMB, Mid-Market, Enterprise, or Emerging',
// })

/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { Input, Label, Button } from '@theme-ui/components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {axiosWithAuth} from "../utils/axiosWithAuth";
import ReactRouterPropTypes from 'react-router-prop-types';

const signupSchema = Yup.object().shape({
  client_name: Yup.string()
    .min(4, '**Too Short 2 characters min!')
    .max(20, '**Too Long 20 characters max!')
    .required('**Name is required'),
  client_segment: Yup.string()
    .min(3, '**Too Short 4 characters min!')
    .max(10, '**Too Long 20 characters max!')

    .matches(/^\b(?:SMB|Mid-Market|Enterprise|Emerging)\b$/, {
    message:
    'Must be SMB, Mid-Market, Enterprise, or Emerging',
})
    .required('**Password is required'),
});

const SignupForm = (props) => {
  const initialValues = {
    client_name: '',
    client_segment: '',
  };

  const handleSubmit = (values) => {
    return axiosWithAuth()
      .post(`https://aliport.herokuapp.com/api/flex`, values)
      .then((res) => {

        props.history.push('/flexdata');
      })
      .catch((err) => {
        console.log('Error signing up: ', err);
        window.alert("Client Name Exists or Database Error");
        props.history.push('/');
      });
  };

  return (
    <Fragment>

      <h1
        sx={{
          width: `300px`,
          marginLeft: `650px`,
          fontSize: `2.8rem`,
          '@media screen and (min-width: 2000px)': {
            fontSize: '1.8rem',
            marginLeft: `1570px`,
            width: `400px`
          }
        }}
      >
        Add Client
      </h1>
      <Formik
        data-testid="form"
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form
            sx={{
              width: `300px`,
              margin: `0 auto`,
              display: `grid`,
              gridGap: `2px`,
            }}
          >
            <Label htmlFor="client_name" sx={{ fontSize: `1.25rem` }}>
              Client Name
            </Label>
            <Input
              id="client_name"
              name="client_name"
              type="text"
              value={values.client_name}
              onChange={handleChange}
              mb={3}
            />
            {errors.client_name && touched.client_name ? (
              <p>{errors.client_name}</p>
            ) : null}

            <Label htmlFor="client_segment" sx={{ fontSize: `1.25rem` }}>
              Client Segment
            </Label>
            <Input
              id="client_segment"
              name="client_segment"
              type="client_segment"
              value={values.client_segment}
              onChange={handleChange}
              mb={3}
            />
            {errors.client_segment && touched.client_segment ? (
              <p>{errors.client_segment}</p>
            ) : null}

            <Button
              type="submit"
              className="blackButton"
              sx={{
                fontSize: `2rem`,
                fontWeight: `bold`,
                background: `black`,
                color: `white`,
                marginTop: `20px`,
                marginBottom: `20px`,
                borderRadius: `8px`,
                padding: `15px 20px`,
                width: `380px`,
                border: `2px solid black`,
                '@media screen and (min-width: 2000px)': {
                  fontSize: '1rem',
                }
              }}
            >
              Add Client
            </Button>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

// for eslint validation
SignupForm.propTypes = {
  history: ReactRouterPropTypes.history,
  location: ReactRouterPropTypes.location,
  match: ReactRouterPropTypes.match,
  route: ReactRouterPropTypes.route,
};

export default SignupForm;
