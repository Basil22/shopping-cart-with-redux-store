import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import ItemType from "../type/ItemType";
import {
  addToCart,
  clearCart,
  removeItemFromCart,
} from "../store/reducers/cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleClickBuy = (item: ItemType) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
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
      <Box>
        <Typography variant="h3" fontWeight={"bold"} display={"inline"}>
          Cart
        </Typography>
      </Box>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.name} style={{ marginBottom: "20px" }}>
            {item.name} - ${item.price}
            <Box sx={{ display: "inline-flex", alignItems: "center", ml: 5 }}>
              <ListItemButton onClick={() => handleRemoveItem(item)}>
                -
              </ListItemButton>
              <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
              <Button onClick={() => handleClickBuy(item)}>+</Button>
            </Box>
          </ListItem>
        ))}
      </List>
      <Box>
        <Typography variant="h6">
          Total: $
          {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        </Typography>
      </Box>
      <Box display={"inline"}>
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => navigate("/items")}
        >
          Back to items..
        </Button>
        {cartItems.length > 0 && (
          <Button
            variant="contained"
            sx={{ mt: 1, ml: 2 }}
            color="error"
            onClick={handleClearCart}
          >
            Clear cart
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Cart;
