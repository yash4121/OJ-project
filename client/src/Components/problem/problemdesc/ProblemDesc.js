import "./ProblemDesc.css";

function ProblemDesc(props) {
  const { name, statement, tags, sampleInput, sampleOutput } = props.data;

  return (
    <>
      <p className="problem-title">{name}</p>
      <p className="problem-statement">{statement}</p>
      <br />
      <table className="sampleio-table">
        <thead>
          <tr>
            <th>SAMPLE INPUT</th>
          </tr>
        </thead>
        <tr>
          <td id="sample-input" style={{ whiteSpace: "pre-line" }}>
            {sampleInput}
          </td>
        </tr>
      </table>
      <br />
      <table className="sampleio-table">
        <thead>
          <tr>
            <th>SAMPLE OUTPUT</th>
          </tr>
        </thead>
        <tr>
          <td id="sample-output" style={{ whiteSpace: "pre-line" }}>
            {sampleOutput}
          </td>
        </tr>
      </table>
      <br />
      <table className="sampleio-table">
        <th>Tags</th>
        <tr>
          <td>{tags.join(", ")}</td>
        </tr>
      </table>
    </>
  );
}

export default ProblemDesc;
