import "./SubmitButton.css";

const SubmitButton = ({ handlePress, isPressed, isCompilng, isSubmitting }) => {
  return (
    <button
      className={`run-button ${isPressed ? "pressed" : ""}`}
      onClick={handlePress}
      disabled={isCompilng || isSubmitting}
    >
      {isSubmitting ? "Testing..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
