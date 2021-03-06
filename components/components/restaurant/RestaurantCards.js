import SingleCard from "./SingleCard";
import RestaurantSideInfo from "./RestaurantSideInfo";
import RestaurantSideMenu from "./RestaurantSideMenu";
import React, {useState, Fragment, useContext} from "react";
import CartContext from "../store/cart-context";
import SearchField from "./SearchField";
import RestaurantSideMenuPC from "./RestaurantSideMenuPC";
import TopPicks from "./TopPicks";

function RestaurantCards({sideMenu, restaurantInfo, favItems}) {
  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };

  const [search, setSearch] = useState("");
  return (
    <div className="flex flex-row xl:space-x-16">
      <div className="hidden xl:block mt-12 w-1/3">
        <RestaurantSideInfo restaurantInfo={restaurantInfo} />
      </div>

      <div className="hidden xl:block order-2 mt-12 w-1/3">
        <RestaurantSideMenuPC sideMenu={sideMenu} />
      </div>
      <div className="mt-32 xl:mt-12 w-full md:w-2/3 xl:w-1/3  m-auto">
        <div className="space-y-4">
          <SearchField setSearch={setSearch} />
          <TopPicks favItems={favItems} />
          <RestaurantSideMenu sideMenu={sideMenu} />

          {Object.keys(sideMenu).map(function (key, index) {
            return (
              <div key={index} className="last:pb-16">
                {sideMenu[key].filter((val) => {
                  if (search === "") return val;
                  else if (
                    val.title.toLowerCase().includes(search.toLowerCase()) ||
                    (val.description &&
                      val.description
                        .toLowerCase()
                        .includes(search.toLowerCase()))
                  )
                    return val;
                }).length > 0 && (
                  <>
                    <div className="text-2xl font-medium text-gray-900 p-2">
                      {sideMenu[key].length && (
                        <div
                          className="border-b-2 border-gray-400 text-center "
                          id={key + "_header"}
                        >
                          {key}
                        </div>
                      )}
                    </div>
                    <div>
                      <Fragment>
                        <div id={key} className="items_list">
                          {sideMenu[key]
                            .filter((val) => {
                              {
                                if (search === "") return val;
                                else if (
                                  val.title
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                  (val.description &&
                                    val.description
                                      .toLowerCase()
                                      .includes(search.toLowerCase()))
                                )
                                  return val;
                              }
                            })
                            .map((item) => (
                              <SingleCard
                                key={item.id}
                                id={item.id}
                                img={item.picture}
                                description={item.description}
                                title={item.title}
                                price={item.price}
                                type={item.type}
                                restaurantRecommends={item.recommendation}
                                onRemove={cartItemRemoveHandler.bind(
                                  null,
                                  item.id
                                )}
                                onAdd={cartItemAddHandler.bind(null, item)}
                                ctxItems={cartCtx.items}
                              />
                            ))}
                        </div>
                      </Fragment>
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {/*   {props.sideMenu.item.map((item) => (
            <div key={index}>
              {item.Items.filter((val) => {
                if (search === "") return val;
                else if (
                  val.itemTitle.toLowerCase().includes(search.toLowerCase()) ||
                  val.itemDescription
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                  return val;
              }).length > 0 && (
                <Fragment>
                  {item.Items.length > 0 && (
                    <div className="text-2xl font-medium text-gray-900 p-2">
                      <div
                        className="border-b-2 border-gray-400 text-center "
                        id={item.Category + "_header"}
                      >
                        {item.Category}
                      </div>
                    </div>
                  )}
                  <div id={item.Category} className="items_list">
                    {item.Items.filter((val) => {
                      if (search === "") return val;
                      else if (
                        val.itemTitle
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        val.itemDescription
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      )
                        return val;
                    }).map((item) => (
                      <SingleCard
                        key={item.idItem}
                        id={item.idItem}
                        img={item.itemPicture}
                        description={item.itemDescription}
                        title={item.itemTitle}
                        price={item.itemPrice}
                        type={item.itemType}
                        foodLikes={item.itemLikes}
                        restaurantRecommends={item.restaurantRec}
                        onRemove={cartItemRemoveHandler.bind(null, item.idItem)}
                        onAdd={cartItemAddHandler.bind(null, item)}
                        cartCtx={cartCtx}
                      />
                    ))}
                  </div>
                </Fragment>
              )}
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
export default RestaurantCards;
