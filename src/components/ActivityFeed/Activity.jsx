import { useEffect, useState } from "react";
import api from "../../../config/axiosConfig";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Activity = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/activity");
        setFeeds(response.data);
        console.log("\n\nfeed response", response.data);
      } catch (err) {
        console.error("Error fetching activities:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 mt-[80px] sm:w-[80%] md:w-[70%] xl:w-[65%] mr-auto ml-auto">
      <h2 className="text-2xl font-bold mb-4">Activity Feed</h2>
      <div className="space-y-4">
        {feeds?.map((feed, idx) => {
          const userName = feed.user?.name || "Someone";
          let message =
            feed.activity_type === "new_recipe"
              ? `${userName} posted a new recipe`
              : `${userName} has a new activity`;

              if(feed.activity_type=== "review_recipe") message =  `${userName} reviewed a recipe`;

          const profilePic = feed.user?.profile_picture || "https://via.placeholder.com/40";

          return (
            <div
              key={idx + "feed"}
              className="flex items-center gap-4 bg-white shadow-md rounded-lg p-4"
            >
              <img
                src={profilePic}
                alt="👤"
                className="w-10 h-10 rounded-full object-cover bg-amber-100 flex items-center justify-center"
              />
              <div>
                <p className="text-gray-800 font-medium">{message}</p>
                <p className="text-sm text-gray-500">
                  {dayjs(feed.created_at).fromNow()}
                </p>
              </div>
            </div>
          );
        })}
        { feeds?.length == 0 && <div> no new activities </div>}
      </div>
    </div>
  );
};

export default Activity;
