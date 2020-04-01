import React, { useContext } from "react";
import { Grid, Box, Image, ResponsiveContext, Main } from "grommet";
import picture from "../assets/images/clothesonrack.jpg";
import MyCheckOut from "../components/my-checkout";
import CartItems from "../components/cart-items";

const Checkout = () => {
  const size = useContext(ResponsiveContext) as
    | "small"
    | "medium"
    | "large"
    | "xlarge";
  console.log(size);

  const columns = {
    small: ["auto"],
    medium: ["auto", "auto"],
    large: ["auto", "auto"],
    xlarge: ["auto", "auto"]
  };

  const rows = {
    small: ["auto", "auto"],
    medium: ["1/2", "auto"],
    large: ["1/2", "auto"],
    xlarge: ["auto", "auto"]
  };

  const areas = {
    small: [
      { name: "myCheckOut", start: [0, 0], end: [0, 1] },
      { name: "cart", start: [0, 1], end: [0, 1] }
    ],
    medium: [
      { name: "myCheckOut", start: [0, 0], end: [0, 1] },
      { name: "cart", start: [1, 0], end: [1, 0] },
      { name: "image", start: [1, 1], end: [1, 1] }
    ],
    large: [
      { name: "myCheckOut", start: [0, 0], end: [0, 1] },
      { name: "cart", start: [1, 0], end: [1, 0] },
      { name: "image", start: [1, 1], end: [1, 1] }
    ],
    xlarge: [
      { name: "myCheckOut", start: [0, 0], end: [0, 1] },
      { name: "cart", start: [1, 0], end: [1, 0] },
      { name: "image", start: [1, 1], end: [1, 1] }
    ]
  };

  const myCheckout = <MyCheckOut key="0" />;
  const cart = (
    <Box gridArea="cart" background="light-2" key="1">
      <CartItems />
    </Box>
  );
  const checkOutImage = (
    <Box gridArea="image" key="2">
      <Image
        src={picture}
        alt="shirts"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%"
        }}
      />
    </Box>
  );

  const components = {
    small: [myCheckout, cart],
    medium: [myCheckout, cart, checkOutImage],
    large: [myCheckout, cart, checkOutImage],
    xlarge: [myCheckout, cart, checkOutImage]
  };
  return (
    <Main>
      <Grid
        fill
        rows={rows[size]}
        columns={columns[size]}
        gap="small"
        areas={areas[size]}
      >
        {components[size]}
      </Grid>
    </Main>
  );
};

export default Checkout;
