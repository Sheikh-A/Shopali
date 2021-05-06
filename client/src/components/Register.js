/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { Input, Label, Button } from '@theme-ui/components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ReactRouterPropTypes from 'react-router-prop-types';

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, '**Too Short 2 characters min!')
    .max(20, '**Too Long 20 characters max!')
    .required('**Name is required'),
  password: Yup.string()
    .min(4, '**Too Short 4 characters min!')
    .max(20, '**Too Long 20 characters max!')

    .matches(/^.{4,}$/, {
      message:
        'Password must be at least 4 characters long',
    })
    .required('**Password is required'),
});

const SignupForm = (props) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values) => {
    return axios
      .post(`https://aliport.herokuapp.com/api/auth/register`, values)
      .then((res) => {
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('id', res.data.id);
        props.history.push('/login');
      })
      .catch((err) => {
        console.log('Error signing up: ', err);
        window.alert("Username Exists or Database Error");
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
          }
        }}
      >
        Welcome
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
            <Label htmlFor="username" sx={{ fontSize: `1.25rem` }}>
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={values.username}
              onChange={handleChange}
              mb={3}
            />
            {errors.username && touched.username ? (
              <p>{errors.username}</p>
            ) : null}

            <Label htmlFor="password" sx={{ fontSize: `1.25rem` }}>
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              mb={3}
            />
            {errors.password && touched.password ? (
              <p>{errors.password}</p>
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
              Register
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

// import React, {useState} from 'react';
// import axios from 'axios';


// function Register(props) {



//     const [user, setUser] = useState({
//       username: "",
//       password: "",
//     })

//     const handleChange = e => {
//         setUser({
//             ...user,
//             [e.target.name]: e.target.value,
//         })
//     }

//     const handleSubmit = e => {
//         e.preventDefault();
//         axios.post('https://aliport.herokuapp.com/api/auth/register', user)
//         .then(res => {
//             props.history.push('/login');
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     }

//   return (
//     <div className="registerContainer negative-top-margin-adjustment">
//         <div>
//           <div>
//             <h1>Register</h1>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div>
//               <div>
//                 <div>
//                     <input
//                         id="firstName"
//                         onChange={handleChange}
//                         placeholder="username"
//                         value={user.username}
//                         name="username"
//                     />
//                 </div>
//                 <div>
//                         <input
//                             id="firstName"
//                             onChange={handleChange}
//                             placeholder="password"
//                             value={user.password}
//                             name="password"
//                             type="password"
//                         />
//                 </div>
//             </div>
//         </div>
//             <button className="blackButton" type="submit">Sign Up</button>
//         </form>
//     </div>
//     </div>
//     );
// }

// export default Register;
