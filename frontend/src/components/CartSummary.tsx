import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cartSubtotal, cartCount } = useCart();

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "20px",
        background: "#f8f9fa",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        fontSize: "16px",
        zIndex: 1000,
      }}
      onClick={() => navigate("/cart")}
    >
      🛒 <strong className="ms-1">{cartCount}</strong>
      <span className="ms-2">${cartSubtotal.toFixed(2)}</span>
    </div>
  );
};

export default CartSummary;
