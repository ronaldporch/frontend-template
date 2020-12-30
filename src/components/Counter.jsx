import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import counterSlice from "../state/counter";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const increment = () => {
    dispatch(counterSlice.actions.increment());
  };
  return (
    <div>
      <Button onClick={increment}>Click Me</Button>
      {counter}
    </div>
  );
};

export default Counter;
