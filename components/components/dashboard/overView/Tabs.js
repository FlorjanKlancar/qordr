import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import OrderTab from "./OrderTab/OrderTab";
import TableTab from "./TableTab/TableTab";
import ItemsTab from "./ItemsTab/ItemsTab";

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="p-2">
      <Box sx={{width: "100%"}}>
        <Box sx={{borderBottom: 1, borderColor: "divider"}}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Orders" {...a11yProps(0)} />
            <Tab label="Tables" {...a11yProps(1)} />
            <Tab label="Items" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <OrderTab orders={props.orders[0]} />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <TableTab tables={props.tables} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ItemsTab items={props.items} />
        </TabPanel>
      </Box>
    </div>
  );
}
