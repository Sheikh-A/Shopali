/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Fragment } from 'react';
import { Input, Label, Button } from '@theme-ui/components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {axiosWithAuth} from "../utils/axiosWithAuth";
import ReactRouterPropTypes from 'react-router-prop-types';

const signupSchema = Yup.object().shape({
  image_url: Yup.string().url()
    .required('**Image URL is required'),
  price: Yup.number()
    .required('**Price is required')
    .positive(),
  description: Yup.string().required('**Description is required'),
});

const SignupForm = (props) => {
  const initialValues = {
    image_url: '',
    description: '',
    price: '',
  };

  const handleSubmit = (values) => {
    return axiosWithAuth()
      .post(`http://localhost:3300/api/images`, values)
      .then((res) => {

        props.history.push('/flexdata');
      })
      .catch((err) => {
        console.log('Error adding image: ', err);
        window.alert("Database Error");
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
        Add Image
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
              Image URL
            </Label>
            <Input
              id="image_url"
              name="image_url"
              type="text"
              value={values.image_url}
              onChange={handleChange}
              mb={3}
            />
            {errors.image_url && touched.image_url ? (
              <p>{errors.image_url}</p>
            ) : null}

            <Label htmlFor="description" sx={{ fontSize: `1.25rem` }}>
              Description
            </Label>
            <Input
              id="description"
              name="description"
              type="text"
              value={values.description}
              onChange={handleChange}
              mb={3}
            />
            {errors.description && touched.description ? (
              <p>{errors.description}</p>
            ) : null}

            <Label htmlFor="price" sx={{ fontSize: `1.25rem` }}>
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              mb={3}
            />
            {errors.price && touched.price ? (
              <p>{errors.price}</p>
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
              Add Image
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
