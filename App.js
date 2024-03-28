import StackNavigator from "./navigation/StackNavigator";
import { OrderProvider } from "./contexts/orderContext";

export default function App() {
  return (
    <>
      <OrderProvider>
        <StackNavigator />
      </OrderProvider>
    </>
  );
}
