import React, { useState } from "react";
import "./styles.css";
import orderBy from "lodash/orderBy";
import forEach from "lodash/forEach";
const dop = [
  {
    id: "MFP-PO-1",
    rejected: 0,
    supplier: "Benjamin",
    doctype: "Purchase Orders",
    items: [
      {
        name: "Hats",
        qty: 3,
        price: 29,
        rejected: 0
      }
    ],
    created: "2020-08-21 23:13:40 UTC",
    due_date: "2020-08-27 23:13:40 UTC",
    last_modified: "2020-09-09 23:13:40 UTC",
    status: 2
  },
  {
    id: "MFP-PO-2",
    rejected: 3,
    supplier: "Benjamin",
    doctype: "Purchase Orders",
    items: [
      {
        name: "Hats",
        qty: 4,
        price: 9,
        rejected: 3
      }
    ],
    created: "2020-09-20 22:08:22 UTC",
    due_date: "2020-09-27 22:08:22 UTC",
    last_modified: "2020-09-30 22:08:22 UTC",
    status: 0
  },
  {
    id: "MFP-PO-3",
    rejected: 0,
    supplier: "Alison",
    doctype: "Purchase Orders",
    items: [
      {
        name: "Pillow",
        qty: 5,
        price: 21,
        rejected: 0
      }
    ],
    created: "2020-02-24 20:17:41 UTC",
    due_date: "2020-03-10 20:17:41 UTC",
    last_modified: "2020-03-21 20:17:41 UTC",
    status: 1
  },
  {
    id: "MFP-PO-4",
    rejected: 0,
    supplier: "Grace",
    doctype: "Purchase Orders",
    items: [
      {
        name: "bricks",
        qty: 10,
        price: 13,
        rejected: 0
      }
    ],
    created: "2020-09-17 17:28:47 UTC",
    due_date: "2020-09-23 17:28:47 UTC",
    last_modified: "2020-10-17 17:28:47 UTC",
    status: 0
  },
  {
    id: "MFP-PO-5",
    rejected: 0,
    supplier: "Issa",
    doctype: "Purchase Orders",
    items: [
      {
        name: "bricks",
        qty: 5,
        price: 11,
        rejected: 0
      }
    ],
    created: "2020-02-20 04:15:34 UTC",
    due_date: "2020-03-09 04:15:34 UTC",
    last_modified: "2020-03-10 04:15:34 UTC",
    status: 0
  },
  {
    id: "MFP-PO-6",
    rejected: 0,
    supplier: "Rahul",
    doctype: "Purchase Orders",
    items: [
      {
        name: "Hats",
        qty: 10,
        price: 30,
        rejected: 0
      }
    ],
    created: "2020-04-07 19:42:10 UTC",
    due_date: "2020-04-13 19:42:10 UTC",
    last_modified: "2020-04-21 19:42:10 UTC",
    status: 2
  },
  {
    id: "MFP-PO-7",
    rejected: 0,
    supplier: "Aiden",
    doctype: "Purchase Orders",
    items: [
      {
        name: "rope",
        qty: 3,
        price: 26,
        rejected: 0
      }
    ],
    created: "2020-10-11 07:08:14 UTC",
    due_date: "2020-10-16 07:08:14 UTC",
    last_modified: "2020-10-23 07:08:14 UTC",
    status: 0
  },
  {
    id: "MFP-PO-8",
    rejected: 0,
    supplier: "Oliver",
    doctype: "Purchase Orders",
    items: [
      {
        name: "Yarns",
        qty: 4,
        price: 24,
        rejected: 0
      }
    ],
    created: "2020-10-14 20:32:23 UTC",
    due_date: "2020-10-21 20:32:23 UTC",
    last_modified: "2020-11-01 20:32:23 UTC",
    status: 3
  },
  {
    id: "MFP-PO-9",
    rejected: 0,
    supplier: "Daniel",
    doctype: "Purchase Orders",
    items: [
      {
        name: "rope",
        qty: 10,
        price: 7,
        rejected: 0
      }
    ],
    created: "2020-01-03 07:29:23 UTC",
    due_date: "2020-01-31 07:29:23 UTC",
    last_modified: "2020-01-27 07:29:23 UTC",
    status: 2
  },
  {
    id: "MFP-PO-10",
    rejected: 0,
    supplier: "Michael",
    doctype: "Purchase Orders",
    items: [
      {
        name: "bricks",
        qty: 3,
        price: 7,
        rejected: 0
      }
    ],
    created: "2020-08-17 01:23:19 UTC",
    due_date: "2020-08-30 01:23:19 UTC",
    last_modified: "2020-08-30 01:23:19 UTC",
    status: 0
  }
];

const dataset = dop.reduce((obj, x) => {
  // creat array of all data
  let created = new Date(x.created);
  let modified = new Date(x.last_modified);
  let avg_time = [];
  const price = x.items[0].price;
  const rejected = x.items[0].rejected;
  const qty = x.items[0].qty;
  const diff = (modified - created) / (1000 * 60 * 60 * 24);
  const item = x.items[0].name;
  const supplier = x.supplier;
  if (obj[item] && obj[item][supplier]) {
    avg_time = [...obj[item][supplier].time, diff];
    obj[item][supplier].time = avg_time;
    obj[item][supplier].price.push(price);
    obj[item][supplier].rejected.push(rejected);
    obj[item][supplier].qty.push(qty);
  } else {
    const new_supplier = {
      [supplier]: {
        time: [diff],
        price: [price],
        rejected: [rejected],
        qty: [qty]
      }
    };
    obj[item] = { ...obj[item], ...new_supplier };
  }
  return { ...obj };
}, {});

const item_avg = (key = "Hats") => {
  // get avg & totals ata
  const item = dataset[key] || "Hats";
  console.log({ item });

  return Object.keys(item).reduce((acc, x) => {
    const time_total = item[x].time.reduce((acc, i) => acc + i, 0);
    const price_avg =
      item[x].price.reduce((acc, i) => acc + i, 0) / item[x].price.length;
    const rejected_total = item[x].rejected.reduce((acc, i) => acc + i, 0);
    const qty_total = item[x].qty.reduce((acc, i) => acc + i, 0);
    const avg_day_production = (qty_total - rejected_total) / time_total;

    acc[x] = {
      time_total,
      price_avg,
      rejected_total,
      qty_total,
      avg_day_production,
      index:
        10 / (1 + Math.exp(-1 * (avg_day_production / 100))).toPrecision(4) - 5
    };
    return acc;
  }, {});
};

const getallsums = (dataset, item = null) => {
  const keys = item ? [item] : Object.keys(dataset);
  return keys.reduce((data, x) => {
    data[x] = item_avg(x);
    return data;
  }, {});
};

const getSupplierRanking = (item = null) => {
  const items = getallsums(dataset, item);
  const supplierArray = Object.keys(items).reduce((acc, i) => {
    const suppliers = Object.keys(items[i]).map((s) => ({
      ...items[i][s],
      supplier: s
    }));
    acc[i] = suppliers;
    return acc;
  }, {});
  // sort the
  const sorted = forEach(supplierArray, (v, k) => {
    supplierArray[k] = orderBy(
      v,
      ["index", "avg_day_production", "price_avg"],
      ["desc", "desc", "asc"]
    );
  });
  return sorted;
};

export default function App() {
  const [item, setItem] = useState();
  const handleChange = (e) => {
    const { value } = e.target;
    setItem(value);
  };
  const ranking = getSupplierRanking(item);
  const result = Object.keys(ranking).map((v, k) => {
    return (
      <table class="table_main" width="100%">
        <caption>item : {v}</caption>
        <tr>
          <th>supplier</th>
          <th>price average </th>
          <th>daily average </th>
          <th>index </th>
        </tr>
        {ranking[v].map((r) => (
          <tr>
            <td>{r.supplier}</td>
            <td>{r.price_avg}</td>
            <td> {parseFloat(r.avg_day_production).toFixed(2)}</td>
            <td> {parseFloat(r.index).toFixed(5) * 100}</td>
          </tr>
        ))}
      </table>
    );
  });

  return (
    <div className="App">
      <div class="box">
        <select name="items"  onChange={handleChange}>
          {Object.keys(dataset).map((k) => (
            <option value={k}>{k}</option>
          ))}
        </select>
      </div>
      {result}
    </div>
  );
}
