import MessageTable from "../features/messages/MessageTable";
import MessageTableOperations from "../features/messages/MessageTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Messages() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Messages</Heading>
        <MessageTableOperations />
      </Row>
      <MessageTable />
    </>
  );
}

export default Messages;
