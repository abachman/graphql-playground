import { useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { CreateOrderMutation } from "../mutations/CreateOrderMutation";
import { CreateOrder } from "../mutations/__generated__/CreateOrder";
import { Performance } from "../queries/GetProduction";
import { shortDate } from "../utils/dates";
import { Paths } from "../utils/paths";
import { ProductionParams } from "./ProductionContainer";

export const PerformancesTableRow = ({
  performance,
}: {
  performance: Performance;
}) => {
  const { organizationId, productionId } = useParams<ProductionParams>();
  const history = useHistory();

  const [startOrder] = useMutation<CreateOrder>(CreateOrderMutation, {
    onCompleted: (resp) => {
      console.log("success, got receipt", resp.createOrder?.receipt);
      history.push(
        Paths.performance({
          organizationId,
          productionId,
          performanceId: performance.id.toString(),
        })
      );
    },
  });

  return (
    <div className="grid gap-4 grid-cols-2 w-1/3 mb-4" key={performance.id}>
      <span>{shortDate(performance.showtimeAt)}</span>
      <button className="btn" onClick={() => startOrder()}>
        Start Order
      </button>
    </div>
  );
};
