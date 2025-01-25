import ChipTitle from './ChipTitle';
import FeatureCard from './FeatureCard';
import Image from 'next/image';

const features = [
    'Low Stock Alerts',
    'Multi-Location Management',
    'Barcode Scanning Integration',
    'Analytics and Reporting',
    'Supplier Management',
    'Order Fulfillment Tracking',
    'Automated Restocking Suggestions',
    'Customizable Product Categories',
    'User Role Management',
];

export default function Features() {
    return (
        <section className="py-24" id="features">
            <div className="container max-w-5xl mx-auto">
                <div className="flex justify-center">
                    <ChipTitle title="Features" />
                </div>
                <h2 className="text-5xl font-medium text-center mt-6">
                    Inventory management made
                    <span className="text-accent block">simple</span>
                </h2>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        title="User Role Management"
                        description="Manage different access levels for team members to ensure secure
                and efficient operations."
                        className="col-span-2 lg:col-span-1"
                    >
                        <div className="flex justify-center items-center">
                            <Image
                                alt="User Role Management"
                                src="https://img.freepik.com/free-vector/recruit-agent-analyzing-candidates_74855-4565.jpg?t=st=1737803458~exp=1737807058~hmac=70029aa3581c087969fe806373674fb134991cba12a34b84655c4902fdd55b58&w=2000"
                                width={300}
                                height={300}
                            />
                        </div>
                    </FeatureCard>
                    <FeatureCard
                        title="Real-Time Inventory Tracking"
                        description="Keep track of your inventory in real time, ensuring accurate
                stock levels across all locations."
                        className="col-span-2 lg:col-span-1"
                    >
                        <div className="flex justify-center items-center">
                            <Image
                                alt="Real-Time Inventory Tracking"
                                src="https://img.freepik.com/premium-vector/warehouse-employee-checking-stock-levels-inventory-management-stock-control-warehouse-operations-supply-chain-efficiency-illustration_327176-1824.jpg?w=1800"
                                width={300}
                                height={300}
                            />
                        </div>
                    </FeatureCard>
                    <FeatureCard
                        title="Multi-Location Management"
                        description="Seamlessly manage inventory across multiple warehouses, stores,
                or regions."
                        className="col-span-2 md:col-start-2  lg:col-span-1 lg:col-start-auto"
                    >
                        <div className="flex justify-center items-center">
                            <Image
                                alt="Multi-Location Management"
                                src="https://img.freepik.com/premium-vector/businessman-is-coordinating-logistics-venues-catering_249611-36437.jpg?w=2000"
                                width={300}
                                height={300}
                            />
                        </div>
                    </FeatureCard>
                </div>
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-neutral-900 border border-white/15 inline-flex px-3 md:px-5 py-1.5 md:py-2 rounded-2xl gap-3 items-center">
                            <span className="bg-pink-600 text-neutral-950 size-5 rounded-full inline-flex justify-center items-center text-xl">&#10038;</span>
                            <span className="font-medium md:text-large">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
