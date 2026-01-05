
import ContainerCard from "@/components/ContainerCard";
import AddProductForm from "@/components/dashboard/AddProductForm";

export default function Dashboard() {
  return (
    <ContainerCard>   
      <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Add a New Service</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Fill out the details below to list a new service on ServyDash.</p>
      <AddProductForm />
    </ContainerCard>
  );
}