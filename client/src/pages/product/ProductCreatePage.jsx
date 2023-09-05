import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useState, Fragment, useEffect } from "react";
import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
// routes
import { PATH_AUTH, PATH_DASHBOARD } from "../../routes/paths";
// components
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
// sections
import ProductNewEditForm from "../../sections/product/ProductNewEditForm";

// action
// import {
//   createUserRequest,
//   clearMessage,
//   clearError,
// } from "../../actions/users";
import { createProductRequest } from "../../actions/products";

// ----------------------------------------------------------------------

function ProductCreatePage({
  // Users: { message, error },
  Auth: { isAuthenticated },
  createProduct,
  // eslint-disable-next-line
  // clearMessage,
  // eslint-disable-next-line
  // clearError,
}) {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  // const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATH_AUTH.login, { replace: true });
    }

    // if (message) {
    // enqueueSnackbar(message);

    // setUserData(null);

    // clearMessage
    // clearMessage();
    // }
    // if (error) {
    // enqueueSnackbar(error, { variant: "error" });
    // clearError
    // clearError();
    // }

    // eslint-disable-next-line
  }, [
    isAuthenticated,
    // message, error
  ]);

  // const handleNext = (user) => {
  //   setUserData(user);

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };
  const handleSubmit = (productData) => {
    console.log(productData);
    createProduct(productData);
  };

  // const handleReset = (permission) => {
  //   setPermissionSettings(permission);
  //   createUserRequest(userData, permission);
  // };

  return (
    <>
      <Helmet>
        <title> Products: Create a new product</title>
      </Helmet>

      <Container maxWidth="lg">
        <CustomBreadcrumbs
          heading="Create a product"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
          links={[
            { name: "Products", href: PATH_DASHBOARD.products.root },
            { name: "New Product" },
          ]}
        />

        <ProductNewEditForm
          handleSubmited={handleSubmit}
          currentUser={userData}
        />
      </Container>
    </>
  );
}

ProductCreatePage.propTypes = {
  // Users: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  createProduct: PropTypes.func.isRequired,
  // clearMessage: PropTypes.func.isRequired,
  // clearError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // Users: state.Users,
  Auth: state.Auth,
});

export default connect(mapStateToProps, {
  createProduct: createProductRequest,
  // clearMessage,
  // clearError,
})(ProductCreatePage);
