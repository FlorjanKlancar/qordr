import Image from "next/image";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Badge from "@mui/material/Badge";
import { createTheme } from "@mui/material/styles";

import { purple, red } from "@mui/material/colors";

const primary = red[500]; // #f44336
const accent = purple["A200"]; // #e040fb

export default function BestSellers(props) {
  console.log(props);
  return (
    <div className="overflow-y-auto h-96">
      {props.bestSell.map((item, index) => (
        <div key={item.idItem} className="flex justify-start">
          <div className="w-1/3 p-4">
            {
              <Badge badgeContent={index + 1} color="secondary">
                <EmojiEventsIcon className="text-yellow-400	" />
              </Badge>
            }
            <br /> Items sold: {item.count}
          </div>
          <div className="w-1/3 p-2  xl:w-40 xl:h-24">
            <div className="relative h-16 w-32 ">
              <Image
                alt="Picture"
                src={item.itemPicture}
                layout="fill"
                objectFit="fill"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="w-1/3 text-right p-1">{item.itemTitle}</div>
        </div>
      ))}
    </div>
  );
}
