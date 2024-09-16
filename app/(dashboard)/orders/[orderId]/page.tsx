

import { Breadcrumbs } from "@/components/breadcrumbs";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { OrderItemType } from "@/lib/types";
import { format } from "date-fns";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  //const router = useRouter()
  
  const res = await fetch(
    `${process.env.ADMIN_DASHBOARD_URL}/api/orders/${params.orderId}`
  );

  const { orderDetails, customer } = await res.json();

  console.log("orderDetails", orderDetails);

  const { street, city, postalCode, country } = orderDetails.shippingAddress;

  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Orders", link: "/orders" },
    { title: "OrderDetails", link: `/orders/${params.orderId}`},
  ];

  return (
    <PageContainer>
      <div className="space-y-5">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-center py-5">

            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Order Details
            </h1>

          </div>

        <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
          <dl className="flex">
            <dt className="text-gray-500">Order ID&nbsp;</dt>
            <dd className="font-medium text-gray-900">{orderDetails._id}</dd>
            <dt>
              <span className="sr-only">Date</span>
              <span className="text-gray-400 mx-2" aria-hidden="true">
                &middot;
              </span>
            </dt>
            <dd className="font-medium text-gray-900">
              <time dateTime={orderDetails.createdAt}>
                {format(new Date(orderDetails.createdAt), "dd MMMM yyyy")}
              </time>
            </dd>
          </dl>
        </div>

        <div className="mt-2">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-2 md:py-4">
            <div>
              <dt className="font-medium text-gray-900">Customer name</dt>
              <dd className="mt-3 text-gray-500 space-y-3">
                <p>{customer.name}</p>
              </dd>
            </div>

            <div>
              <dt className="font-medium text-gray-900">Total Paid</dt>
              <dd className="mt-3 text-gray-500">
                <span className="block">${orderDetails.totalAmount}</span>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">shipping address</dt>
              <dd className="mt-3 text-gray-500">
                <span className="block">
                  {street}, {city}
                </span>
                <span className="block">
                  {postalCode}, {country}
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Shipping Rate ID</dt>
              <dd className="mt-3 text-gray-500 space-y-3">
                <p>{orderDetails.shippingRate}</p>
              </dd>
            </div>
          </div>
          <h2 className="sr-only">Products purchased</h2>

          <div className="space-y-24">
            {orderDetails.products.map((orderItem: OrderItemType) => (
              <div
                key={orderItem._id}
                className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8 border-b border-gray-200 py-8"
              >
                <div className="sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2">
                  <div className="aspect-square bg-white rounded-lg overflow-hidden">
                    <img
                      src={orderItem.product.media[0]}
                      alt="product"
                      className="object-center object-cover"
                    />
                  </div>
                </div>
                <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    <a>{orderItem.product.title}</a>
                  </h3>
                </div>

                <div className="sm:col-span-12 md:col-span-7 mt-5">
                  <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                    <div className="flex">
                      <dt className="font-medium text-gray-900">Quantity</dt>
                      <dd className="ml-2 text-gray-700">
                        {orderItem.quantity}
                      </dd>
                    </div>
                    {orderItem.size !== "N/A" && (
                      <div className="pl-4 flex sm:pl-6">
                        <dt className="font-medium text-gray-900">Size</dt>
                        <dd className="ml-2 text-gray-700">{orderItem.size}</dd>
                      </div>
                    )}
                    {orderItem.flavor !== "N/A" && (
                      <div className="pl-4 flex sm:pl-6">
                        <dt className="font-medium text-gray-900">Flavor</dt>
                        <dd className="ml-2 text-gray-700">
                          {orderItem.flavor}
                        </dd>
                      </div>
                    )}
                    {orderItem.color !== "N/A" && (
                      <div className="pl-4 flex sm:pl-6">
                        <dt className="font-medium text-gray-900">Color</dt>
                        <dd className="ml-2 text-gray-700">
                          {orderItem.color}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default OrderDetails;
