import { useState } from "react";
import { App, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchlist } from "../../store/slices/userListsSlice";

const WatchListButton = ({ size = "middle", movieId, ...rest }) => {
  const dispatch = useDispatch();
  const inList = useSelector((s) =>
    Array.isArray(s.userLists?.watchlist)
      ? s.userLists.watchlist.includes(movieId)
      : false
  );
  const [animating, setAnimating] = useState(false);
  const { message } = App.useApp();
  const handleClick = async (e) => {
    e.stopPropagation();
    setAnimating(true);
    try {
      await dispatch(toggleWatchlist({ movieId })).unwrap();
      if (!inList) message.success("Added to watchlist!");
      else message.warning("Removed from watchlist");
    } catch (err) {
      message.error(`Could not update watchlist: ${err.message}`);
    } finally {
      setAnimating(false);
    }
  };

  return (
    <Button
      size={size}
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4px 6px",
        fontSize: '12px'
      }}
      {...rest}
    >
      <PlusOutlined
        style={{
          transition: "transform 200ms ease",
          transform: animating || inList ? "rotate(45deg)" : "rotate(0deg)",
          marginRight: 4,
        }}
      />
      {inList ? "Remove from watchlist" : "Add to watchlist"}
    </Button>
  );
};

export default WatchListButton;
