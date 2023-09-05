import PropTypes from "prop-types";
// @mui
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
// routes
import { Link as RouterLink } from "react-router-dom";
// import { paths } from "src/routes/paths";
// import { RouterLink } from "src/routes/components";
// utils
// import { fDateTime } from "src/utils/format-time";
// import { fCurrency } from "src/utils/format-number";
// components
import Image from "../../components/image";
import Iconify from "../../components/iconify";
// import CustomPopover, { usePopover } from "src/components/custom-popover";
// import { shortDateLabel } from 'src/components/custom-date-range-picker';

// ----------------------------------------------------------------------

export default function ProductItem({
  tour,
  // onView, onEdit, onDelete
}) {
  // const popover = usePopover();

  const { id, title, description, images, createdAt } = tour;

  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Stack flexGrow={1} sx={{ position: "relative" }}>
        <Image
          alt={images[0]}
          src={images[0]}
          sx={{ borderRadius: 1, height: 164, width: 1 }}
        />
      </Stack>
      <Stack spacing={0.5}>
        <Image
          alt={images[1]}
          src={images[1]}
          ratio="1/1"
          sx={{ borderRadius: 1, width: 80 }}
        />
        <Image
          alt={images[2]}
          src={images[2]}
          ratio="1/1"
          sx={{ borderRadius: 1, width: 80 }}
        />
      </Stack>
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
      }}
      primary={`Posted date: ${createdAt}`}
      secondary={
        <Link
          component={RouterLink}
          // href={paths.dashboard.tour.details(id)}
          href="#"
          color="inherit"
        >
          {title}
        </Link>
      }
      primaryTypographyProps={{
        typography: "caption",
        color: "text.disabled",
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: "span",
        color: "text.primary",
        typography: "subtitle1",
      }}
    />
  );

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{
        position: "relative",
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      {/* <IconButton
        onClick={popover.onOpen}
        sx={{ position: "absolute", bottom: 20, right: 8 }}
      >
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton> */}

      {[
        {
          label: description,
          icon: (
            <Iconify
              icon="fluent:text-description-rtl-20-regular"
              sx={{ color: "info.main" }}
            />
          ),
        },
      ].map((item) => (
        <Stack
          key={item.label}
          spacing={1}
          direction="row"
          // alignItems="center"
          sx={{ typography: "body2" }}
        >
          <Stack>{item.icon}</Stack>
          <Typography
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2, // Set the number of lines you want to display
              textOverflow: "ellipsis",
              // whiteSpace: "nowrap",
            }}
          >
            {item.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <>
      <Card>
        {renderImages}

        {renderTexts}

        {renderInfo}
      </Card>

      {/* <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onEdit();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover> */}
    </>
  );
}

ProductItem.propTypes = {
  // onDelete: PropTypes.func,
  // onEdit: PropTypes.func,
  // onView: PropTypes.func,
  tour: PropTypes.object,
};
