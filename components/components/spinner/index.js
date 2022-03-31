import SyncLoader from "react-spinners/ClipLoader";

const override = `
  display: block;
  margin: 0 auto;
`;

export default function Spinner() {
  return (
    <div className="pt-12">
      <SyncLoader color="#17AEB6" css={override} size={50} />
    </div>
  );
}
