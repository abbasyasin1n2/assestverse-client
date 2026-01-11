import { motion } from "motion/react";
import {
  FiX,
  FiPackage,
  FiBriefcase,
  FiCalendar,
  FiTag,
  FiUser,
  FiCheck,
  FiClock,
  FiRotateCcw,
  FiInfo,
} from "react-icons/fi";
import { format } from "date-fns";

const AssetDetailsModal = ({ asset, isOpen, onClose, showActions = false, onAction }) => {
  if (!isOpen || !asset) return null;

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { class: "badge-success", text: "Available" },
      assigned: { class: "badge-info", text: "Assigned" },
      pending: { class: "badge-warning", text: "Pending" },
      approved: { class: "badge-success", text: "In Use" },
      rejected: { class: "badge-error", text: "Rejected" },
      returned: { class: "badge-ghost", text: "Returned" },
      "out-of-stock": { class: "badge-error", text: "Out of Stock" },
    };
    const config = statusConfig[status] || { class: "badge-ghost", text: status || "Unknown" };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  // Determine if this is an asset from HR view or a request from employee view
  const isRequest = asset.requestDate || asset.requestStatus || asset.assetName;
  const assetName = isRequest ? asset.assetName : asset.name;
  const assetImage = isRequest ? asset.assetImage : asset.image;
  const assetType = isRequest ? asset.assetType : asset.type;
  const assetCategory = isRequest ? asset.assetCategory : asset.category;
  const assetDescription = isRequest ? asset.assetDescription : asset.description;

  return (
    <div className="modal modal-open">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.2 }}
        className="modal-box max-w-2xl"
      >
        {/* Close Button */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
          onClick={onClose}
        >
          <FiX className="h-5 w-5" />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Asset Image */}
          <div className="w-full md:w-2/5 shrink-0">
            <figure className="rounded-xl overflow-hidden bg-base-200 aspect-square">
              {assetImage ? (
                <img
                  src={assetImage}
                  alt={assetName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FiPackage className="h-20 w-20 text-base-content/20" />
                </div>
              )}
            </figure>
          </div>

          {/* Asset Details */}
          <div className="flex-1">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {assetType && (
                <span className={`badge ${assetType === "returnable" ? "badge-primary" : "badge-secondary"}`}>
                  {assetType === "returnable" ? "Returnable" : "Non-returnable"}
                </span>
              )}
              {assetCategory && (
                <span className="badge badge-outline">{assetCategory}</span>
              )}
              {asset.status && getStatusBadge(asset.status)}
              {asset.requestStatus && getStatusBadge(asset.requestStatus)}
            </div>

            {/* Name */}
            <h2 className="text-2xl font-bold mb-4">{assetName}</h2>

            {/* Info Grid */}
            <div className="space-y-3">
              {/* Company Info */}
              {asset.companyName && (
                <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-lg bg-base-300">
                      {asset.companyLogo ? (
                        <img src={asset.companyLogo} alt={asset.companyName} />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <FiBriefcase className="h-5 w-5 text-base-content/50" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Company</p>
                    <p className="font-medium">{asset.companyName}</p>
                  </div>
                </div>
              )}

              {/* Quantity Info */}
              {(asset.quantity !== undefined || asset.availableQuantity !== undefined) && (
                <div className="flex gap-4">
                  {asset.quantity !== undefined && (
                    <div className="flex-1 p-3 bg-base-200/50 rounded-lg">
                      <p className="text-xs text-base-content/60">Total Quantity</p>
                      <p className="text-lg font-bold">{asset.quantity}</p>
                    </div>
                  )}
                  {asset.availableQuantity !== undefined && (
                    <div className="flex-1 p-3 bg-success/10 rounded-lg">
                      <p className="text-xs text-base-content/60">Available</p>
                      <p className="text-lg font-bold text-success">{asset.availableQuantity}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Request-specific info */}
              {isRequest && (
                <>
                  {asset.requesterName && (
                    <div className="flex items-center gap-2 text-sm">
                      <FiUser className="h-4 w-4 text-base-content/50" />
                      <span className="text-base-content/60">Requested by:</span>
                      <span className="font-medium">{asset.requesterName}</span>
                    </div>
                  )}
                  {asset.requestDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <FiClock className="h-4 w-4 text-base-content/50" />
                      <span className="text-base-content/60">Request Date:</span>
                      <span>{format(new Date(asset.requestDate), "MMM d, yyyy")}</span>
                    </div>
                  )}
                  {asset.approvalDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <FiCheck className="h-4 w-4 text-success" />
                      <span className="text-base-content/60">Approved:</span>
                      <span>{format(new Date(asset.approvalDate), "MMM d, yyyy")}</span>
                    </div>
                  )}
                  {asset.note && (
                    <div className="p-3 bg-base-200/50 rounded-lg">
                      <p className="text-xs text-base-content/60 mb-1">Note</p>
                      <p className="text-sm">{asset.note}</p>
                    </div>
                  )}
                </>
              )}

              {/* Date Added */}
              {asset.createdAt && !isRequest && (
                <div className="flex items-center gap-2 text-sm">
                  <FiCalendar className="h-4 w-4 text-base-content/50" />
                  <span className="text-base-content/60">Added:</span>
                  <span>{format(new Date(asset.createdAt), "MMM d, yyyy")}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {assetDescription && (
              <div className="mt-4 pt-4 border-t border-base-200">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FiInfo className="h-4 w-4" />
                  Description
                </h4>
                <p className="text-base-content/70 text-sm">{assetDescription}</p>
              </div>
            )}

            {/* Actions */}
            {showActions && onAction && (
              <div className="mt-6 pt-4 border-t border-base-200 flex gap-2">
                {onAction}
              </div>
            )}
          </div>
        </div>
      </motion.div>
      <div className="modal-backdrop bg-black/50" onClick={onClose}></div>
    </div>
  );
};

export default AssetDetailsModal;
