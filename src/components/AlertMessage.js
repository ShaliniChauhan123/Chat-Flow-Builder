// error or success message received as props from parent component
const AlertMessage = ({ errorMessage, messageColor }) => {
  if (errorMessage) {
    return <div className={`${messageColor} p-3`}>{errorMessage}</div>;
  }
  return <div className="savingChanges" style={{ padding: 19 }}></div>;
};

export default AlertMessage;
