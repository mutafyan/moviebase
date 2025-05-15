import { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchlist } from "../../store/slices/userListsSlice";

const WatchListButton = ({ size = "middle", movieId }) => {
  const dispatch = useDispatch();

  const inList = useSelector(
    (state) => state.userLists?.watchlist?.includes(movieId) || false
  );
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    setAnimating(true);
    dispatch(toggleWatchlist({ movieId, inList }));
    setTimeout(() => setAnimating(false), 200);
  };

  return (
    <Button
      size={size}
      onClick={handleClick}
      style={{ display: "flex", alignItems: "center" }}
    >
      <PlusOutlined
        // rotate 45 degrees
        style={{
          transition: "transform 200ms ease",
          transform: inList || animating ? "rotate(45deg)" : "rotate(0deg)",
          marginRight: 8,
        }}
      />
      {inList ? "Remove from watchlist" : "Add to watchlist"}
    </Button>
  );
};

export default WatchListButton;
