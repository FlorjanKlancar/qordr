import Image from "next/image";
import CheckIcon from "@material-ui/icons/Check";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import moment from "moment";

function SingleRow(props) {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={props.id}>
      <TableCell>
        <div>
          <div className="text-lg font-semibold dark:text-white">
            Table - {props.restaurantTableNr}
          </div>
          <div className="dark:text-white">
            {moment(props.orderDate.toDate()).format("DD.MM.YYYY - H:HH")}
          </div>
        </div>
      </TableCell>

      <TableCell>
        {props.itemsOnOrder.map((item, index) => (
          <div className="flex flex-wrap p-2" key={index}>
            <div className="w-3/12 float-left">
              <div className="w-28 h-16  relative top-2 right-2 ">
                <Image
                  alt="Picture"
                  src={item.picture}
                  layout="fill"
                  objectFit="fill"
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="w-8/12 text-left  font-semibold dark:text-white">
              <span className="text-blue-500 text-lg">{item.amount}x</span>{" "}
              {item.title}
              <br />
              <span className="">{(item.price * item.amount).toFixed(2)}€</span>
            </div>
          </div>
        ))}
      </TableCell>

      <TableCell>
        <div className="">
          <div className="text-lg text-gray-900 font-semibold p-2 dark:text-white">
            {props.totalAmount.toFixed(2)}€
          </div>

          <div className="text-sm font-semibold p-2 dark:text-white">
            Payment type:{" "}
            <span className="text-gray-500">{props.paymentType}</span>
          </div>

          {props.customerComment && (
            <div className="text-sm font-semibold p-2 dark:text-white">
              Customer comment:{" "}
              <span className="text-gray-500">{props.customerComment}</span>
            </div>
          )}
          {props.customerTip > 0 && (
            <div className="text-sm font-semibold p-2 dark:text-white">
              Customer tip:{" "}
              <span className="text-gray-500 ">
                {props.customerTip.toFixed(2)}€
              </span>
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <button
          className="ml-2 bg-transparent hover:bg-green-500 dark:bg-green-800 text-green-400 dark:text-white font-semibold hover:text-white dark:hover:text-gray-300 py-2 px-4 border border-green-400 dark:border-green-900 hover:border-transparent dark:hover:border-gray-300 rounded "
          onClick={() => props.submitHandler(props.id)}
        >
          <CheckIcon />
        </button>
      </TableCell>
    </TableRow>
  );
}
export default SingleRow;
