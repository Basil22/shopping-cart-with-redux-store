import {
  Badge,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addToCart, removeItemFromCart } from "../store/reducers/cartSlice";
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

  return (
    <Box>
      <Typography variant="h3" fontWeight={"bold"} display={"inline"}>
        Items
      </Typography>
      <Button
        variant="text"
        sx={{ ml: 3, height: "60px" }}
        onClick={() => navigate("/cart")}
      >
        <Badge
          badgeContent={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          color="primary"
        >
          <ShoppingCartIcon />
        </Badge>
      </Button>
      <List>
        {items.map((item) => {
          const cartItem = cartItems.find(
            (cartItem) => cartItem.name === item.name
          );
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <ListItem key={item.name} style={{ marginBottom: "20px" }}>
              {item.name} - ${item.price}
              {cartItem ? (
                <Box
                  sx={{ display: "inline-flex", alignItems: "center", ml: 5 }}
                >
                  <ListItemButton onClick={() => handleRemoveItem(item)}>
                    -
                  </ListItemButton>
                  <Typography sx={{ mx: 1 }}>{quantity}</Typography>
                  <Button onClick={() => handleClickBuy(item)}>+</Button>
                </Box>
              ) : (
                <Button
                  sx={{ ml: 5 }}
                  variant="contained"
                  onClick={() => handleClickBuy(item)}
                >
                  Add to cart
                </Button>
              )}
            </ListItem>
          );
        })}
      </List>
      <Box>
        {cartItems.length > 0 && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/cart")}
          >
            Go to Cart
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Items;
