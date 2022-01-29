import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";

export default function TableList(props) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  console.log(props.data);
  return (
    <div className=" overflow-y-auto" id="tablePerformers">
      <List sx={{width: "100%", bgcolor: "background.paper"}}>
        {props.data.map(
          (item, index) =>
            item.length > 0 && (
              <div key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-200">
                      <TableRestaurantIcon className="text-blue-400" />
                    </div>
                  </ListItemAvatar>
                  <ListItemText
                    primary={months[item[0].month - 1]}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{display: "inline"}}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {"Table " + item[0].restaurantTableNr} :
                        </Typography>
                        {" — " + item[0].count + " orders"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            )
        )}
      </List>
    </div>
  );
}
