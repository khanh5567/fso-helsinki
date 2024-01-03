const Notification = ({ message }) => {
  const error = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const success = { ...error, color: "green" };

  if (message !== null) {
    const style = message.type === 1 ? success : error;
    return <div style={style}>{message.content}</div>;
  } else return null;
};

export default Notification;
