import {Fragment, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import {PlusIcon} from "@heroicons/react/solid";
import {ChatAlt2Icon} from "@heroicons/react/solid";

function OrderComment(props) {
  const {t} = useTranslation();

  const router = useRouter();
  const restaurantName = router.query.restaurantName;
  const tableNr = router.query.tableNr;

  const [showComment, setShowComment] = useState(false);
  function commentHandler() {
    setShowComment(!showComment);
  }

  return (
    <Fragment>
      <div className="m-8 flex">
        <PlusIcon className="w-6 h-6 text-default" />
        <Link
          href={{
            pathname: "/[restaurantName]/[tableNr]",
            query: {restaurantName: restaurantName, tableNr: tableNr},
          }}
        >
          <button className="ml-2">{t("add_more_button")}</button>
        </Link>
      </div>
      <div className="ml-8 mb-8 flex">
        <ChatAlt2Icon className="w-6 h-6 text-default" />
        <button onClick={commentHandler} className="pl-2">
          {t("add_comment_button")}
        </button>
      </div>
      {showComment && (
        <div className="pb-4">
          <textarea
            className="w-11/12 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none block m-auto"
            rows="1"
            placeholder="Write your special requests optionaly..."
            onChange={(e) => props.onAddComment(e.target.value)}
          ></textarea>
        </div>
      )}
    </Fragment>
  );
}
export default OrderComment;
