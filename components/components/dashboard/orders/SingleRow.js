import Image from "next/image";
import CheckIcon from "@material-ui/icons/Check";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

function SingleRow(props) {
  const datum1 = props.createdAt;
  const ura = props.createdAt.slice(-8);

  function formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0],
      month = datePart[1],
      day = datePart[2];

    return day + ". " + month + ". " + year;
  }
  const datum = formatDate(datum1) + " " + ura;

  async function submitHandler(id) {
    const response = await axios.put("/api/dashboard/orders", {id: id});

    if (response.status === 200) props.alertMessageSuccess();
    else props.alertMessageFail();
    props.fetchNewData();
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={props.idOrder}>
      <TableCell>
        <div>
          <div className="text-lg font-semibold">
            Table - {props.restaurantTableNr}
          </div>
          <div>{datum}</div>
        </div>
      </TableCell>

      <TableCell>
        {props.itemsOnOrder.map(
          (item, index) =>
            item.idOrder == props.idOrder && (
              <div className="flex flex-wrap p-2" key={index}>
                <div className="w-3/12 float-left">
                  <div className="w-28 h-16  relative top-2 right-2 ">
                    {/*  <Image
                      alt="Picture"
                      src={item.itemPicture}
                      layout="fill"
                      objectFit="fill"
                      className="rounded-lg"
                    /> */}
                  </div>
                </div>
                <div className="w-8/12 text-left  font-semibold ">
                  <span className="text-blue-500 text-lg">
                    {item.itemAmount}x
                  </span>{" "}
                  {item.itemTitle}
                  <br />
                  <span className="">
                    {(item.itemPrice * item.itemAmount).toFixed(2)}€
                  </span>
                </div>
              </div>
            )
        )}
      </TableCell>

      <TableCell>
        <div className="">
          <div className="text-lg text-gray-900 font-semibold p-2">
            {props.totalAmount.toFixed(2)}€
          </div>

          <div className="text-sm font-semibold p-2">
            Payment type:{" "}
            <span className="text-gray-500">{props.paymentType}</span>
          </div>

          {props.customerComment && (
            <div className="text-sm font-semibold p-2">
              Customer comment:{" "}
              <span className="text-gray-500">{props.customerComment}</span>
            </div>
          )}
          {props.customerTip > 0 && (
            <div className="text-sm font-semibold p-2">
              Customer tip:{" "}
              <span className="text-gray-500">
                {props.customerTip.toFixed(2)}€
              </span>
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <button
          className="ml-2 bg-transparent hover:bg-green-500 text-green-400 font-semibold hover:text-white py-2 px-4 border border-green-400 hover:border-transparent rounded"
          onClick={() => submitHandler(props.idOrder)}
        >
          <CheckIcon />
        </button>
      </TableCell>
    </TableRow>
  );
}
export default SingleRow;
