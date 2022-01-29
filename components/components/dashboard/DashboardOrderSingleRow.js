import TableRowsIcon from "@mui/icons-material/TableRows";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -4,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function DashboarOrdersSingleRow(props) {
  const datum1 = props.dateTime;
  const ura = props.dateTime.slice(-8);

  function formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0],
      month = datePart[1],
      day = datePart[2];

    return day + ". " + month + ". " + year;
  }

  return (
    <div className="flex flex-row gap-4 w-full text-center h-12 ">
      <div className="w-1/4 ">
        <IconButton aria-label="cart">
          {
            <StyledBadge badgeContent={props.table} color="secondary">
              <TableRestaurantIcon />
            </StyledBadge>
          }
        </IconButton>
      </div>
      <div className="w-1/4 pt-1">{props.amount.toFixed(2)}€</div>
      <div className="w-1/2 pt-1">
        <span className="font-medium font-xs">
          {formatDate(datum1) + " " + ura}
        </span>
      </div>
    </div>
  );
}
