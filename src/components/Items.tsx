import { Badge, Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addToCart } from "../store/reducers/cartSlice";
import ItemType from "../type/ItemType";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const items: ItemType[] = [
  { name: "Water", price: 20 },
  { name: "Bread", price: 50 },
  { name: "Milk", price: 45 },
  { name: "Egg", price: 200 },
];

function Items() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  let toCartClicked: Boolean = false;

  const handleClickBuy = (item: ItemType) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    toCartClicked = !toCartClicked;
  };

  return (
    <Box>
      <Typography variant="h4" display={"inline"}>
        Items
      </Typography>
      <Button
        variant="text"
        sx={{ ml: 3, height: "60px" }}
        onClick={() => navigate("/cart")}
      >
        <Badge badgeContent={cartItems.length} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </Button>
      <ul>
        {items.map((item) => (
          <li key={item.name} style={{ marginBottom: "20px" }}>
            {item.name} - ${item.price}
            {!toCartClicked && (
              <Button
                sx={{ ml: 1 }}
                variant="outlined"
                onClick={() => handleClickBuy(item)}
              >
                Add to cart
              </Button>
            )}
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default Items;
