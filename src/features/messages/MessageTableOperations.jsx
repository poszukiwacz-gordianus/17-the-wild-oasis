import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function MessageTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="action"
        options={[
          { value: "all", label: "All" },
          { value: "New booking", label: "New booking" },
          { value: "Reservation Canceled", label: "Reservation Canceled" },
          { value: "New Registration", label: "New Registration" },
        ]}
      />

      <SortBy
        options={[
          { value: "created_at-desc", label: "Sort by date (recent first)" },
          { value: "created_at-asc", label: "Sort by date (earlier first)" },
        ]}
      />
    </TableOperations>
  );
}

export default MessageTableOperations;
