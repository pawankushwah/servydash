import Link from "next/link";
import { CheckCircle2, Download, ArrowRight } from "lucide-react";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { payment_id?: string };
}) {
  const paymentId = searchParams.payment_id;

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for choosing <span className="font-bold text-blue-600">ServyDash</span>. 
          Your digital asset is ready for instant access.
        </p>

        {paymentId && (
          <div className="bg-gray-50 rounded-lg p-3 mb-8 text-xs text-gray-400 font-mono">
            Transaction ID: {paymentId}
          </div>
        )}

        <div className="space-y-4">
          {/* In a real app, you'd fetch the specific product's fileUrl from MongoDB using the payment session */}
          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            <Download className="w-5 h-5" />
            Download Your Asset
          </button>

          <Link href="/marketplace" className="flex items-center justify-center gap-2 text-gray-500 font-medium hover:text-blue-600 transition pt-2">
            Back to Marketplace <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}