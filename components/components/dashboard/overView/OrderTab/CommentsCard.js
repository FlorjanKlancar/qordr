import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import ForumIcon from "@mui/icons-material/Forum";
export default function CommentsCard(props) {
  return (
    <div className=" overflow-y-auto h-96">
      <List sx={{width: "100%", bgcolor: "background.paper"}}>
        {props.comments.map((item) => (
          <div key={item.idOrder}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-200">
                  <ForumIcon className="text-blue-400" />
                </div>
              </ListItemAvatar>
              <ListItemText
                primary={item.day + "." + item.month + "." + item.year}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{display: "inline"}}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Table {item.restaurantTableNr}:
                    </Typography>
                    {" — " + item.customerComment}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </div>
  );
}
