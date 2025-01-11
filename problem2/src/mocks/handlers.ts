import { HttpResponse, delay, http } from "msw";
import currencyRates from "./mockData/mockCurrency.json";

export const handlers = [
  http.get("/convert", async (info) => {
    const res = info.request;
    const url = new URL(res.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");
    const amount = url.searchParams.get("amount");
    if (!from || !to || !amount) {
      return new HttpResponse(null,{
        statusText: "Missing 'from', 'to', or 'amount' parameters",
        status: 400,
      });
    }

    const fromRate = currencyRates.find((rate) => rate.currency === from);
    const toRate = currencyRates.find((rate) => rate.currency === to);

    if (!fromRate) {
      return new HttpResponse(null,{
        statusText: `Currency rate for 'from' (${from}) not found.`,
        status: 404,
      });
    }

    if (!toRate) {
      return new HttpResponse(null,{
        statusText: `Currency rate for 'to' (${to}) not found.`,
        status: 404,
      });
    }

    if (!fromRate || !toRate) {
      return new HttpResponse(null,{
        statusText: "Invalid currency codes provided",
        status: 400,
      });
    }
    await delay(1000);
    const result = (parseFloat(amount) * toRate.price) / fromRate.price;

    return HttpResponse.json({ result });
  }),
];
