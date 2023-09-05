// import orderBy from "lodash/orderBy";
// import { useState, useCallback } from "react";
// @mui
// import Stack from "@mui/material/Stack";

import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// import { RouterLink } from "src/routes/components";
// // hooks
// import { useBoolean } from "src/hooks/use-boolean";
// // utils
// import { fTimestamp } from "src/utils/format-time";

// components

import Iconify from "../../../components/iconify";
import EmptyContent from "../../../components/empty-content";

import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
//
import ProductList from "../ProductList";

// import ProductSearch from "../ProductSearch";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ProductListView() {
  // const [search, setSearch] = useState({
  //   query: "",
  //   results: [],
  // });

  const dataFiltered = [
    {
      id: 1,
      title: "Adventure Seekers Expedition",
      images: [
        "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg",
        "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg",
        "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg",
      ],
      createdAt: "03-04Sep23",
      description: "Andorra",
    },
    {
      id: 2,
      title: "Adventure Seekers Expedition",
      images: [
        "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg",
        "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg",
        "https://api-prod-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg",
      ],
      createdAt: "03-Sep-23",
      description:
        "Andorra Adventure Seekers Expedition. Adventure Seekers Expedition Adventure Seekers Expedition Adventure Seekers Expedition",
    },
  ];

  const notFound = !dataFiltered.length;

  // const handleSearch = useCallback(
  //   (inputValue) => {
  //     setSearch((prevState) => ({
  //       ...prevState,
  //       query: inputValue,
  //     }));

  //     if (inputValue) {
  //       const results = _tours.filter(
  //         (tour) =>
  //           tour.name.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
  //       );

  //       setSearch((prevState) => ({
  //         ...prevState,
  //         results,
  //       }));
  //     }
  //   },
  //   [search.query]
  // );

  // const renderFilters = (
  //   <Stack
  //     spacing={3}
  //     justifyContent="space-between"
  //     alignItems={{ xs: "flex-end", sm: "center" }}
  //     direction={{ xs: "column", sm: "row" }}
  //   >
  //     <ProductSearch
  //       query={search.query}
  //       results={search.results}
  //       onSearch={handleSearch}
  //       hrefItem={(id) => paths.dashboard.tour.details(id)}
  //     />
  //   </Stack>
  // );

  return (
    <Container maxWidth="lg">
      <CustomBreadcrumbs
        heading="Product List"
        links={[{ name: "Product", href: PATH_DASHBOARD.productlist }]}
        // sx={{ mb: 3.5 }}
        action={
          <Button
            component={RouterLink}
            to={PATH_DASHBOARD.products.create}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Product
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}
      </Stack> */}

      {notFound && <EmptyContent title="No Data" filled sx={{ py: 10 }} />}

      <ProductList tours={dataFiltered} />
    </Container>
  );
}

// ----------------------------------------------------------------------
