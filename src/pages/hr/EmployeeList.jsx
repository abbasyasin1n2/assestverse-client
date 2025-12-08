import { FiUsers } from "react-icons/fi";

const EmployeeList = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FiUsers className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">My Employees</h1>
          <p className="text-base-content/70">View and manage affiliated employees</p>
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

export default EmployeeList;
