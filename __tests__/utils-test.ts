import { getAvgConsumptionPrice } from "@/utils/car-store-utils";
import { cars } from "@/utils/sample-data";

test('calculating average price per 100km from given array of refuels', () => {
  expect(getAvgConsumptionPrice(cars[1].refuels)).toBeCloseTo(83.31);
});
