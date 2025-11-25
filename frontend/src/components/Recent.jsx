import { CheckCircle, XCircle } from "lucide-react"

function Recent({ records }) {
  return (
    <div className="flex flex-col bg-w gap-2">
      {records
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        .map((record, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white bg-gray-100 p-3 rounded shadow-sm"
          >
            <div className="mr-3">
              {record.entry ? (
                <CheckCircle size={20} className="text-green-500" />
              ) : (
                <XCircle size={20} className="text-red-500" />
              )}
            </div>

            <div className="flex-1 flex justify-between items-center">
              <span className="font-medium">{record.name}</span>
              <span className="text-gray-500 text-sm">{record.time}</span>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Recent
