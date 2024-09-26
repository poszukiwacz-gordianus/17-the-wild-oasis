import PropTypes from "prop-types";
import Table from "../../ui/Table";
import { formatTimeAndDate } from "../../utils/helpers";

MessageRow.propTypes = {
  log: PropTypes.object,
};

function MessageRow({ log }) {
  const { created_at: createdAt, action, description } = log;

  return (
    <Table.Row>
      <div>{formatTimeAndDate(createdAt)}</div>
      <div>{action}</div>
      <div>{description}</div>
    </Table.Row>
  );
}

export default MessageRow;
