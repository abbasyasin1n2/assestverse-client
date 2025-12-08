import { FiUser } from "react-icons/fi";

const EmployeeProfile = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FiUser className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-base-content/70">Manage your personal information</p>
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

export default EmployeeProfile;
