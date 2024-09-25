export const TableRowSkeleton = () => {
  return (
    <tr className="w-full border-b border-stroke-2 py-3 text-sm last-of-type:border-none">
      <td className={`whitespace-nowrap py-3 pl-6 pr-3`}>
        <div className="h-5 w-10 animate-pulse rounded-lg bg-stroke-2"></div>
      </td>

      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-5 w-20 animate-pulse rounded-lg bg-stroke-2"></div>
      </td>

      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-5 w-20 animate-pulse rounded-lg bg-stroke-2"></div>
      </td>

      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-5 w-20 animate-pulse rounded-lg bg-stroke-2"></div>
      </td>

      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-5 w-20 animate-pulse rounded-lg bg-stroke-2"></div>
      </td>

      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-5 w-10 animate-pulse rounded-lg bg-stroke-2"></div>
      </td>
    </tr>
  )
}
