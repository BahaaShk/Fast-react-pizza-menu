// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(() => {
    if(!fetcher.data && fetcher.state === 'idle')
    fetcher.load('/menu')
  },[fetcher])

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8" >
      <div className=" flex items-center justify-between flex-wrap gap-2"> 
        <h2 className="text-xl font-semibold px-2 mb-2"> Order #{id} status : </h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 rounded-full px-3 py-2 tracking-wide text-red-50 text-sm font-semibold uppercase">Priority</span>}
          <span className="bg-green-500 rounded-full px-3 py-2 tracking-wide text-green-50 text-sm font-semibold uppercase">{status} order</span>
        </div>
      </div>

      <div className=" flex items-center justify-between flex-wrap gap-2 bg-stone-300 py-5 px-6">
        <p className="font-medium ">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-300 border-b border-t border-stone-300">
        {cart.map((item) => (
          <OrderItem item={item} key={item.id} ingredients={fetcher?.data?.find((el) => el.id === item.pizzaId)?.ingredients ?? []} isLoadingIngredients={fetcher.state === 'loading'} />
        ))}
      </ul>

      <div className="bg-stone-300 px-6 py-5 space-y-2">
        <p className="font-medium text-sm text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="font-medium text-sm text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({params}){
  
  const order = await getOrder(params.orderId);
return order
}

export default Order;
