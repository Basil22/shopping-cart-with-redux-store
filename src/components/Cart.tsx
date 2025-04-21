import { Box, Button, Typography } from "@mui/material";
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
      <Box sx={{ mt: 2 }}>
        <Box>
          <Typography variant="h6" display={"inline"}>
            Cart
          </Typography>
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
      <Button
        variant="contained"
        sx={{ mt: 5 }}
        onClick={() => navigate("/items")}
      >
        Back to items..
      </Button>
    </Box>
  );
}

export default Cart;
