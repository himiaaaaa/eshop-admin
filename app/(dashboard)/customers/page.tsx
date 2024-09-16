import { DataTable } from "@/components/datatable";
import { columns } from "@/components/customers/CustomerColumns";

import Customer from "@/lib/models/Customer";
import { connectToDB } from "@/lib/mongoDB";
import PageContainer from "@/components/layout/page-container";
import { Breadcrumbs } from "@/components/breadcrumbs";


const breadcrumbItems = [
  { title: "Dashboard", link: "/" },
  { title: "Customers", link: "/customers" },
];

const Customers = async () => {

  await connectToDB();

  const customers = await Customer.find().sort({ createdAt: "desc" });

  return (
    <PageContainer>
      <div className="space-y-5">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="w-full items-start sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center py-5">

            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Customers
            </h1>
          </div>

          <DataTable columns={columns} data={customers} searchKey="name" />
        </div>
      </div>
    </PageContainer>
  );
};

export const dynamic = "force-dynamic";

export default Customers;
