import AssignProducts from '@/components/dashboard/assign-products';

export default async function AssignProductsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const numericId = parseInt(id, 10);
    return (
        <div>
            <div className="mb-4">
                <h2 className="text-xl">Employees</h2>
            </div>
            <AssignProducts id={numericId} />
        </div>
    );
}
