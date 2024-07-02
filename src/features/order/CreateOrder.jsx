import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
username,
status: addressStatus,
position,
address,
error: errorAddress,
  } = useSelector((state) => state.user)

  const isLoadingAddress = addressStatus === 'loading'

  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";
  // const username = useSelector((state) => state.user.username);

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = totalCartPrice * 0.2;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="py-6 ps-4">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-200 p-2 text-center text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />{
              addressStatus === 'error' && (
                <p className="mt-2 rounded-md bg-red-200 p-2 text-center text-xs text-red-700">
                {errorAddress}
              </p>
              )
            }
          </div>
          { !position.latitude && !position.longitude &&
            <span className="absolute right-[1px] z-10 sm:right-[1px] md:bottom-0.5 bottom-0 sm:top-[1px] top-[30px]">
            <Button
              type="small"
              disabled={isLoadingAddress}
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
              >
              Live Position
            </Button>
          </span>
            }
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority for an EXTRA 0.2% price ?
          </label>
        </div>

        <div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <input type="hidden" value={position.latitude && position.longitude ? `${position.latitude}, ${position.longitude} ` : ''} name="position" />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting ? (
              "Placing order"
            ) : (
              <span>
                Order Now for{" "}
                <span className="underline">
                  {withPriority
                    ? formatCurrency(totalPrice)
                    : formatCurrency(totalCartPrice)}
                </span>
              </span>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give me ur correct number";

  if (Object.keys(errors).length > 0) return errors;
  //if everything is okay , create new order and redirect
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
