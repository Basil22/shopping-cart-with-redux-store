import { Badge, Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  addToCart,
  clearCart,
  removeItemFromCart,
} from "../store/reducers/cartSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

type ItemType = {
  name: string;
  price: number;
};

const items: ItemType[] = [
  { name: "Water", price: 20 },
  { name: "Bread", price: 50 },
  { name: "Milk", price: 45 },
  { name: "Egg", price: 200 },
];

function Items() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  let toCartClicked: Boolean = false;

  const handleClickBuy = (item: ItemType) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    toCartClicked = !toCartClicked;
  };

  const handleRemoveItem = (item: ItemType) => {
    dispatch(
      removeItemFromCart({
        ...item,
        quantity: 1,
      })
    );
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    console.log(cartItems);
  };

  return (
    <Box>
      <Typography variant="h4">Items</Typography>
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
      <Box sx={{ mt: 2 }}>
        <Box>
          <Typography variant="h6" display={"inline"}>
            Cart
          </Typography>
          <Badge badgeContent={cartItems.length} color="primary">
            <ShoppingCartIcon sx={{ ml: 1 }} />
          </Badge>
        </Box>
        <ul>
          {cartItems.map((item) => (
            <li key={item.name} style={{ marginBottom: "20px" }}>
              {item.name} - ${item.price} - {item.quantity}
              <Button
                variant="contained"
                sx={{ ml: 1 }}
                onClick={() => handleRemoveItem(item)}
              >
                -
              </Button>
              <Button
                variant="contained"
                sx={{ ml: 1 }}
                onClick={() => handleClickBuy(item)}
              >
                +
              </Button>
            </li>
          ))}
        </ul>
      </Box>
      <Box>
        <Typography variant="h6" display={"inline"}>
          Total: $
          {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        </Typography>
        {cartItems.length > 0 && (
          <Button sx={{ ml: 2 }} variant="contained" onClick={handleClearCart}>
            Clear cart
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Items;
