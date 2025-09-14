import { CategoryEnum } from "@/enum/enums.enum";
import Advertisement from "@/models/Advertisement.model";
import Items from "@/module/Items";
import MAP from "@/module/Map/MapMain";
import { ConnectDB } from "@/utils/connectDB";
import React from "react";

const MainPage = async () => {
  await ConnectDB();
  const allAd = await Advertisement.find({ published: true }).select("-userID");

  return (
    <div className="mt-8">
      <div className="items-center justify-between md:flex">
        <h2 className="text-center text-3xl text-blue-500">
          نمایش موقیت ملک ها در نقشه{" "}
        </h2>
        <div className="aspect-square w-full md:w-3/5">
          <MAP items={allAd} />
        </div>
      </div>

      <Items
        title="پربازدیدترین"
        url="/advertisement?mostViewed=true"
        query={JSON.parse(
          JSON.stringify(allAd.sort((a, b) => b.view - a.view)),
        )}
      />
      
      {/* <Items
        title="رهن و اجاره"
        url="/advertisement?type=rent"
        query={JSON.parse(JSON.stringify(allAd?.filter((i) => i.typeOf)))}
      />
      <Items
        title=" خرید و فروش"
        url="/advertisement?type=sell"
        query={JSON.parse(JSON.stringify(allAd?.filter((i) => !i.typeOf)))}
      />
      <Items
        title=" خرید و فروش"
        url="/advertisement?mostViewed=true"
        query={JSON.parse(JSON.stringify(allAd?.filter((i) => !i.typeOf)))}
      /> */}

      {/* <Items
        title=" دسته ویلا "
        url="/advertisement?category=villa"
        query={JSON.parse(
          JSON.stringify(
            allAd?.filter((i) => i.category == CategoryEnum.Villa),
          ),
        )}
      />
      <Items
        title=" دسته آپارتمان "
        url="/advertisement?category=apartment"
        query={JSON.parse(
          JSON.stringify(
            allAd?.filter((i) => i.category == CategoryEnum.Apartment),
          ),
        )}
      />
      <Items
        title=" دسته مغازه "
        url="/advertisement?category=store"
        query={JSON.parse(
          JSON.stringify(
            allAd?.filter((i) => i.category == CategoryEnum.Store),
          ),
        )}
      />
      <Items
        title=" دسته دفتر "
        url="/advertisement?category=office"
        query={JSON.parse(
          JSON.stringify(
            allAd?.filter((i) => i.category == CategoryEnum.Office),
          ),
        )}
      /> */}
    </div>
  );
};

export default MainPage;
