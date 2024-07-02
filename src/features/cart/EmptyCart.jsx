import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">
        &larr; Back to menu
      </LinkButton>

      <p className="mt-[30vh] font-semibold text-center text-red-600">Oops ! Your cart is still empty. Start by adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
