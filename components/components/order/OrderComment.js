import {Fragment, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";

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
      <div className="p-8">
        <i className="text-default fas fa-plus"></i>
        <Link
          href={{
            pathname: "/[restaurantName]/[tableNr]",
            query: {restaurantName: restaurantName, tableNr: tableNr},
          }}
        >
          <button className="pl-2">{t("add_more_button")}</button>
        </Link>
      </div>
      <div className="pl-8 pb-8">
        <i className="text-default fas fa-comment"></i>
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
