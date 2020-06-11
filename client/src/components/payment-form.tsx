import React, { useContext } from "react";
import { Form, RadioButtonGroup } from "grommet";

import FormFieldLabel from "./form-field-fabel";

import UserContext from "../contexts/user-context/context";
import CartContext from "../contexts/cart-context/context";
import { PaymentMethod } from "../contexts/cart-context/context-provider";

interface IProps {}

const PaymentForm = (props: IProps) => {
  const { user, updateUser } = useContext(UserContext);
  const { paymentMethod, setPaymentMethod } = useContext(CartContext);

  return (
    <Form validate="submit" style={{ gridArea: "name" }}>
      <RadioButtonGroup
        margin={{ vertical: "medium" }}
        direction="row"
        name="radio"
        options={[
          { label: "Card", value: "card" },
          { label: "Swish", value: "swish" },
          { label: "Invoice", value: "invoice" },
        ]}
        value={paymentMethod}
        onChange={(event) =>
          setPaymentMethod(event.target.value as PaymentMethod)
        }
        {...props}
      />
      {paymentMethod === "invoice" ? (
        <FormFieldLabel
          key={1}
          name="email"
          label="Email"
          required={true}
          type="email"
          value={user.email}
          onChange={(e) => updateUser("email", e.target.value)}
        />
      ) : paymentMethod === "swish" ? (
        <FormFieldLabel
          key={2}
          name="phoneNumber"
          label="Phone number"
          required={true}
          type="number"
          value={user.phoneNumber}
          onChange={(e) => updateUser("phoneNumber", e.target.value)}
        />
      ) : (
        <FormFieldLabel
          key={3}
          name="card"
          label="Card"
          required={true}
          type="number"
          value={user.card}
          onChange={(e) => updateUser("card", e.target.value)}
        />
      )}
    </Form>
  );
};

export default PaymentForm;
