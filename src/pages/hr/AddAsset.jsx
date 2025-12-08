import { FiPlusSquare } from "react-icons/fi";

const AddAsset = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FiPlusSquare className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Add Asset</h1>
          <p className="text-base-content/70">Add new assets to your inventory</p>
        </div>
      </div>
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <p className="text-center text-base-content/70">
            This page will be implemented in later steps
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
