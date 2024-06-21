const LoadingIndicator = () => {
  return (
    <div className="text-center min-vh-100 ">
      <div
        className="spinner-border text-light"
        role="status"
        style={{ width: 60, height: 60 }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
