import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FiCreditCard,
  FiCheck,
  FiUsers,
  FiPackage,
  FiArrowRight,
  FiClock,
  FiDollarSign,
  FiShield,
  FiStar,
  FiRotateCcw,
  FiAlertTriangle,
} from "react-icons/fi";
import Swal from "sweetalert2";
import axiosInstance from "../../api/axiosInstance";
import useAuth from "../../hooks/useAuth";

const UpgradePackage = () => {
  const { user, refreshUser } = useAuth();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [processingPayment, setProcessingPayment] = useState(false);

  // Check for success/cancel from Stripe redirect
  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    const sessionId = searchParams.get("session_id");

    if (success === "true" && sessionId) {
      setProcessingPayment(true);
      verifyPayment(sessionId);
    } else if (canceled === "true") {
      Swal.fire({
        icon: "info",
        title: "Payment Canceled",
        text: "Your upgrade was canceled. You can try again anytime.",
      });
      // Clear URL params
      setSearchParams({});
    }
  }, [searchParams]);

  // Verify payment after Stripe redirect
  const verifyPayment = async (sessionId) => {
    try {
      const response = await axiosInstance.post("/verify-payment", {
        sessionId,
      });

      if (response.data.success) {
        // Refresh user data to get new package limit
        if (refreshUser) {
          await refreshUser();
        }

        // Invalidate relevant queries
        queryClient.invalidateQueries({ queryKey: ["user"] });
        queryClient.invalidateQueries({ queryKey: ["paymentHistory"] });

        const message = response.data.alreadyProcessed
          ? "Your payment was already processed."
          : `Successfully upgraded to ${response.data.data.packageName} package!`;

        Swal.fire({
          icon: "success",
          title: "Upgrade Successful!",
          text: `${message} Your new employee limit is ${response.data.data.newLimit}.`,
          confirmButtonColor: "#6366f1",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: error.response?.data?.message || "Failed to verify payment",
      });
    } finally {
      setProcessingPayment(false);
      // Clear URL params
      setSearchParams({});
    }
  };

  // Fetch payment history
  const { data: paymentHistory, isLoading: historyLoading } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const response = await axiosInstance.get("/payments/history");
      return response.data.data;
    },
  });

  // Create checkout session mutation
  const checkoutMutation = useMutation({
    mutationFn: async (packageType) => {
      const response = await axiosInstance.post("/create-checkout-session", {
        packageType,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to create checkout session",
      });
    },
  });

  // Refund mutation
  const refundMutation = useMutation({
    mutationFn: async (paymentId) => {
      const response = await axiosInstance.post(`/payments/${paymentId}/refund`);
      return response.data;
    },
    onSuccess: async (data) => {
      // Refresh user data
      if (refreshUser) {
        await refreshUser();
      }
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["paymentHistory"] });

      Swal.fire({
        icon: "success",
        title: "Refund Successful!",
        text: `Your package has been reverted to ${data.data.packageName} (${data.data.previousLimit} employees).`,
        confirmButtonColor: "#6366f1",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Refund Failed",
        text: error.response?.data?.message || "Failed to process refund",
      });
    },
  });

  const handleRefund = (payment) => {
    Swal.fire({
      title: "Request Refund?",
      html: `
        <div class="text-left">
          <p class="mb-2">You're about to refund:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li><strong>${payment.packageName} Package</strong></li>
            <li>Amount: <strong>$${payment.amountPaid}</strong></li>
          </ul>
          <p class="mt-3 text-sm text-warning"><FiAlertTriangle className="inline mr-1" /> Your employee limit will revert to the previous package level.</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Refund",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        refundMutation.mutate(payment._id);
      }
    });
  };

  const packages = [
    {
      id: "basic",
      name: "Basic",
      price: 5,
      employeeLimit: 5,
      color: "primary",
      icon: FiPackage,
      features: [
        "Up to 5 team members",
        "Asset management",
        "Request tracking",
        "Basic support",
      ],
    },
    {
      id: "standard",
      name: "Standard",
      price: 8,
      employeeLimit: 10,
      color: "secondary",
      icon: FiStar,
      popular: true,
      features: [
        "Up to 10 team members",
        "Asset management",
        "Request tracking",
        "Priority support",
        "Analytics dashboard",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 15,
      employeeLimit: 20,
      color: "accent",
      icon: FiShield,
      features: [
        "Up to 20 team members",
        "Asset management",
        "Request tracking",
        "24/7 Premium support",
        "Advanced analytics",
        "Custom reports",
      ],
    },
  ];

  const currentPackageLimit = user?.packageLimit || 5;
  const currentEmployees = user?.currentEmployees || 0;

  const handleUpgrade = (packageType) => {
    const pkg = packages.find((p) => p.id === packageType);

    if (pkg.employeeLimit <= currentPackageLimit) {
      Swal.fire({
        icon: "info",
        title: "Already Have This Package",
        text: `You already have a package with ${currentPackageLimit} employees or higher.`,
      });
      return;
    }

    Swal.fire({
      title: `Upgrade to ${pkg.name}?`,
      html: `
        <div class="text-left">
          <p class="mb-2">You're about to upgrade to:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li><strong>${pkg.name} Package</strong></li>
            <li>Employee limit: <strong>${pkg.employeeLimit}</strong></li>
            <li>Price: <strong>$${pkg.price}</strong> (one-time)</li>
          </ul>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        checkoutMutation.mutate(packageType);
      }
    });
  };

  if (processingPayment) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
        <p className="text-lg font-medium">Verifying your payment...</p>
        <p className="text-base-content/70">Please wait, this won't take long.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-xl">
          <FiCreditCard className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Upgrade Package</h1>
          <p className="text-base-content/70">
            Increase your team capacity and unlock more features
          </p>
        </div>
      </div>

      {/* Current Status Card */}
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 shadow-sm">
        <div className="card-body">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Current Plan</h2>
              <p className="text-base-content/70">
                You're on the{" "}
                <span className="font-bold text-primary">
                  {user?.packageName || "Basic"}
                </span>{" "}
                plan
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {currentEmployees}
                </div>
                <div className="text-xs text-base-content/70">Current Team</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">
                  {currentPackageLimit}
                </div>
                <div className="text-xs text-base-content/70">Max Limit</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {currentPackageLimit - currentEmployees}
                </div>
                <div className="text-xs text-base-content/70">Available Slots</div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Team capacity used</span>
              <span>
                {currentEmployees} / {currentPackageLimit}
              </span>
            </div>
            <progress
              className={`progress ${
                currentEmployees >= currentPackageLimit
                  ? "progress-error"
                  : currentEmployees >= currentPackageLimit * 0.8
                  ? "progress-warning"
                  : "progress-primary"
              }`}
              value={currentEmployees}
              max={currentPackageLimit}
            ></progress>
            {currentEmployees >= currentPackageLimit && (
              <p className="text-error text-sm mt-2 flex items-center gap-1">
                <FiUsers className="h-4 w-4" />
                You've reached your team limit. Upgrade to add more members!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Package Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const isCurrentOrLower = pkg.employeeLimit <= currentPackageLimit;
          const isCurrent = pkg.employeeLimit === currentPackageLimit;

          return (
            <div
              key={pkg.id}
              className={`card bg-base-100 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                pkg.popular
                  ? "border-secondary"
                  : isCurrentOrLower
                  ? "border-base-300 opacity-75"
                  : "border-base-200 hover:border-primary"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge badge-secondary badge-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="card-body">
                {/* Package Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 bg-${pkg.color}/10 rounded-xl`}>
                    <pkg.icon className={`h-6 w-6 text-${pkg.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{pkg.name}</h3>
                    {isCurrent && (
                      <span className="badge badge-primary badge-sm">
                        Current Plan
                      </span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-4xl font-bold">${pkg.price}</span>
                  <span className="text-base-content/70 ml-1">one-time</span>
                </div>

                {/* Employee Limit */}
                <div className="flex items-center gap-2 mb-4 p-3 bg-base-200 rounded-lg">
                  <FiUsers className="h-5 w-5 text-primary" />
                  <span className="font-medium">
                    Up to {pkg.employeeLimit} team members
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <FiCheck className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <button
                  className={`btn w-full ${
                    isCurrent
                      ? "btn-disabled"
                      : isCurrentOrLower
                      ? "btn-ghost btn-disabled"
                      : pkg.popular
                      ? "btn-secondary"
                      : "btn-primary btn-outline"
                  }`}
                  disabled={isCurrentOrLower || checkoutMutation.isPending}
                  onClick={() => handleUpgrade(pkg.id)}
                >
                  {checkoutMutation.isPending ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : isCurrent ? (
                    "Current Plan"
                  ) : isCurrentOrLower ? (
                    "Already Included"
                  ) : (
                    <>
                      Upgrade Now
                      <FiArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment History */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex items-center gap-2">
            <FiClock className="h-5 w-5" />
            Payment History
          </h2>

          {historyLoading ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : paymentHistory?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Package</th>
                    <th>Amount</th>
                    <th>Limit</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => {
                    const isLatestCompleted = payment.status === "completed" && 
                      paymentHistory.findIndex(p => p.status === "completed") === index;
                    
                    return (
                      <tr key={payment._id} className={payment.status === "refunded" ? "opacity-60" : ""}>
                        <td>
                          {new Date(payment.paidAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td>
                          <span className="font-medium">{payment.packageName}</span>
                        </td>
                        <td>
                          <span className="flex items-center gap-1">
                            <FiDollarSign className="h-4 w-4" />
                            {payment.amountPaid}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-ghost">
                            {payment.status === "refunded" ? (
                              <span className="line-through">{payment.newLimit}</span>
                            ) : (
                              payment.newLimit
                            )} employees
                          </span>
                          {payment.status === "refunded" && payment.revertedToLimit && (
                            <span className="text-xs text-base-content/50 ml-1">
                              → {payment.revertedToLimit}
                            </span>
                          )}
                        </td>
                        <td>
                          <span className={`badge badge-sm ${
                            payment.status === "completed" ? "badge-success" : 
                            payment.status === "refunded" ? "badge-warning" : "badge-ghost"
                          }`}>
                            {payment.status}
                          </span>
                          {payment.refundedAt && (
                            <div className="text-xs text-base-content/50 mt-1">
                              {new Date(payment.refundedAt).toLocaleDateString()}
                            </div>
                          )}
                        </td>
                        <td>
                          {payment.status === "completed" && isLatestCompleted ? (
                            <button
                              className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                              onClick={() => handleRefund(payment)}
                              disabled={refundMutation.isPending}
                            >
                              {refundMutation.isPending ? (
                                <span className="loading loading-spinner loading-xs"></span>
                              ) : (
                                <>
                                  <FiRotateCcw className="h-3 w-3" />
                                  Refund
                                </>
                              )}
                            </button>
                          ) : payment.status === "refunded" ? (
                            <span className="text-xs text-base-content/50">Refunded</span>
                          ) : (
                            <span className="text-xs text-base-content/50">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-base-content/70">
              <FiCreditCard className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No payment history yet</p>
              <p className="text-sm">Your upgrade payments will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="alert alert-info">
        <FiShield className="h-5 w-5" />
        <div>
          <h3 className="font-bold">Secure Payment</h3>
          <p className="text-sm">
            All payments are processed securely through Stripe. Your payment
            information is never stored on our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradePackage;
